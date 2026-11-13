/* A tiny simulated Linux shell with a virtual filesystem, users and permissions.
   It is a teaching toy: safe to break, reset any time. */
window.Sandbox = (function () {
  const USERS = {
    root:    { uid: 0,    groups: ['root'], home: '/root' },
    alice:   { uid: 1001, groups: ['alice', 'developers', 'sudo'], home: '/home/alice' },
    bob:     { uid: 1002, groups: ['bob', 'developers'], home: '/home/bob' },
    charlie: { uid: 1003, groups: ['charlie'], home: '/home/charlie' }
  };
  const D = (owner, group, mode, children) => ({ t: 'd', owner, group, mode, ch: children || {} });
  const F = (owner, group, mode, content) => ({ t: 'f', owner, group, mode, c: content || '' });

  function freshFS() {
    return D('root', 'root', 'rwxr-xr-x', {
      bin: D('root', 'root', 'rwxr-xr-x', { bash: F('root','root','rwxr-xr-x','#ELF binary'), ls: F('root','root','rwxr-xr-x','#ELF binary') }),
      etc: D('root', 'root', 'rwxr-xr-x', {
        passwd: F('root', 'root', 'rw-r--r--', 'root:x:0:0:root:/root:/bin/bash\nalice:x:1001:1001:Alice:/home/alice:/bin/bash\nbob:x:1002:1002:Bob:/home/bob:/bin/bash\ncharlie:x:1003:1003:Charlie:/home/charlie:/bin/bash\nwww-data:x:33:33:www-data:/var/www:/usr/sbin/nologin'),
        shadow: F('root', 'shadow', 'rw-r-----', 'root:$6$Xk...:19700:0:99999:7:::\nalice:$6$9a...:19700:0:99999:7:::'),
        group: F('root', 'root', 'rw-r--r--', 'root:x:0:\nsudo:x:27:alice\ndevelopers:x:2000:alice,bob\nalice:x:1001:\nbob:x:1002:\ncharlie:x:1003:'),
        hostname: F('root', 'root', 'rw-r--r--', 'linux-lab'),
        hosts: F('root', 'root', 'rw-r--r--', '127.0.0.1 localhost\n10.0.1.20 db.internal'),
        'os-release': F('root', 'root', 'rw-r--r--', 'NAME="Ubuntu"\nVERSION="24.04 LTS (Noble Numbat)"\nID=ubuntu'),
        ssh: D('root', 'root', 'rwxr-xr-x', { sshd_config: F('root', 'root', 'rw-r--r--', 'Port 22\nPermitRootLogin yes\nPasswordAuthentication yes\nPubkeyAuthentication yes') })
      }),
      home: D('root', 'root', 'rwxr-xr-x', {
        alice: D('alice', 'alice', 'rwxr-x---', {
          'notes.txt': F('alice', 'alice', 'rw-r--r--', 'Linux is a kernel.\nEverything is a file.\nlinux is fun\nRemember: chmod 755 for scripts'),
          '.bashrc': F('alice', 'alice', 'rw-r--r--', "alias ll='ls -la'\nexport EDITOR=nano"),
          project: D('alice', 'developers', 'rwxrwxr-x', {
            'README.md': F('alice', 'developers', 'rw-rw-r--', '# Team project'),
            'script.sh': F('alice', 'developers', 'rw-r--r--', '#!/bin/bash\necho "Hello from script.sh"')
          })
        }),
        bob: D('bob', 'bob', 'rwxr-x---', { 'todo.txt': F('bob', 'bob', 'rw-------', 'bob private stuff') }),
        charlie: D('charlie', 'charlie', 'rwxr-x---', {})
      }),
      root: D('root', 'root', 'rwx------', { 'secret.txt': F('root', 'root', 'rw-------', 'root-only flag{you_used_sudo}') }),
      tmp: D('root', 'root', 'rwxrwxrwt', {}),
      var: D('root', 'root', 'rwxr-xr-x', {
        log: D('root', 'root', 'rwxr-xr-x', {
          syslog: F('root', 'adm', 'rw-r-----', 'Nov 13 09:00:01 linux-lab systemd[1]: Started ssh.service\nNov 13 09:02:11 linux-lab cron[812]: (alice) CMD (backup.sh)\nNov 13 09:05:42 linux-lab kernel: eth0: link up'),
          'auth.log': F('root', 'adm', 'rw-r-----', 'Nov 13 08:59:10 sshd[901]: Failed password for root from 203.0.113.9 port 51122\nNov 13 08:59:14 sshd[901]: Failed password for root from 203.0.113.9 port 51130\nNov 13 09:01:03 sshd[944]: Accepted publickey for alice from 192.168.1.10')
        }),
        www: D('www-data', 'www-data', 'rwxr-xr-x', { 'index.html': F('www-data', 'www-data', 'rw-r--r--', '<h1>It works!</h1>') })
      }),
      usr: D('root', 'root', 'rwxr-xr-x', { bin: D('root', 'root', 'rwxr-xr-x', { python3: F('root','root','rwxr-xr-x','#ELF'), grep: F('root','root','rwxr-xr-x','#ELF') }) }),
      dev: D('root', 'root', 'rwxr-xr-x', { null: F('root', 'root', 'rw-rw-rw-', '') }),
      proc: D('root', 'root', 'r-xr-xr-x', { cpuinfo: F('root', 'root', 'r--r--r--', 'model name : Virtual CPU @ 2.40GHz\ncpu cores : 2'), uptime: F('root','root','r--r--r--','5432.10 9876.54') })
    });
  }

  const S = { fs: null, user: 'alice', cwd: '/home/alice', hist: [], last: '', prev: [] };
  function reset() { S.fs = freshFS(); S.user = 'alice'; S.cwd = '/home/alice'; S.hist = []; S.last = ''; S.prev = []; }
  reset();

  /* ---------- paths ---------- */
  function norm(p) {
    if (!p) return S.cwd;
    if (p === '~' || p.startsWith('~/')) p = USERS[S.user].home + p.slice(1);
    const parts = (p.startsWith('/') ? [] : S.cwd.split('/')).concat(p.split('/'));
    const out = [];
    parts.forEach(x => { if (!x || x === '.') return; if (x === '..') out.pop(); else out.push(x); });
    return '/' + out.join('/');
  }
  function get(path) {
    const parts = norm(path).split('/').filter(Boolean); let n = S.fs;
    for (const p of parts) { if (!n || n.t !== 'd' || !n.ch[p]) return null; n = n.ch[p]; }
    return n;
  }
  function parentOf(path) { const a = norm(path); const i = a.lastIndexOf('/'); return { dir: get(a.slice(0, i) || '/'), name: a.slice(i + 1), dpath: a.slice(0, i) || '/' }; }
  const inGroup = (u, g) => USERS[u] && USERS[u].groups.indexOf(g) >= 0;
  function can(n, bit) { // bit 0=r 1=w 2=x
    if (S.user === 'root') return bit !== 2 || n.t === 'd' || /x/.test(n.mode);
    const tri = n.owner === S.user ? 0 : inGroup(S.user, n.group) ? 1 : 2;
    const ch = n.mode[tri * 3 + bit];
    return bit === 2 ? /[xst]/.test(ch) : ch !== '-';
  }
  const denied = (cmd, p) => ({ out: `${cmd}: ${p}: Permission denied`, code: 1 });
  const nf = (cmd, p) => ({ out: `${cmd}: ${p}: No such file or directory`, code: 1 });

  /* ---------- commands ---------- */
  const C = {};
  C.help = () => ({ out: 'Commands: pwd ls cd mkdir touch cat echo rm rmdir cp mv chmod chown chgrp whoami id groups sudo su exit\n          head tail wc grep sort uniq tree history clear uname hostname date ps df free uptime ip ping systemctl man reset\nPipes (|) and redirection (> >>) work. Try: cat notes.txt | grep -i linux | wc -l', code: 0 });
  C.pwd = () => ({ out: S.cwd, code: 0 });
  C.whoami = () => ({ out: S.user, code: 0 });
  C.id = (a) => { const u = a[0] || S.user; const U = USERS[u]; if (!U) return { out: `id: '${u}': no such user`, code: 1 };
    return { out: `uid=${U.uid}(${u}) gid=${U.uid}(${U.groups[0]}) groups=` + U.groups.map(g => `${g === u ? U.uid : g === 'sudo' ? 27 : g === 'developers' ? 2000 : 0}(${g})`).join(','), code: 0 }; };
  C.groups = (a) => { const u = a[0] || S.user; return USERS[u] ? { out: USERS[u].groups.join(' '), code: 0 } : { out: 'groups: no such user', code: 1 }; };
  C.hostname = () => ({ out: 'linux-lab', code: 0 });
  C.uname = (a) => ({ out: a.indexOf('-a') >= 0 ? 'Linux linux-lab 6.8.0-45-generic #45-Ubuntu SMP x86_64 GNU/Linux' : a.indexOf('-r') >= 0 ? '6.8.0-45-generic' : 'Linux', code: 0 });
  C.date = () => ({ out: new Date().toString(), code: 0 });
  C.uptime = () => ({ out: ' 09:12:44 up 1:30,  1 user,  load average: 0.08, 0.03, 0.01', code: 0 });
  C.df = () => ({ out: 'Filesystem      Size  Used Avail Use% Mounted on\n/dev/xvda1       20G  6.1G   14G  31% /\ntmpfs           480M     0  480M   0% /dev/shm', code: 0 });
  C.free = () => ({ out: '               total        used        free      shared  buff/cache   available\nMem:           957Mi       412Mi        98Mi       1.0Mi       446Mi       378Mi\nSwap:             0B          0B          0B', code: 0 });
  C.ps = () => ({ out: '    PID TTY          TIME CMD\n      1 ?        00:00:02 systemd\n    812 ?        00:00:00 cron\n    901 ?        00:00:00 sshd\n   1337 pts/0    00:00:00 bash\n   1402 pts/0    00:00:00 ps', code: 0 });
  C.ip = () => ({ out: '1: lo: <LOOPBACK,UP> mtu 65536\n    inet 127.0.0.1/8 scope host lo\n2: eth0: <BROADCAST,MULTICAST,UP> mtu 9001\n    inet 172.31.20.15/20 brd 172.31.31.255 scope global eth0', code: 0 });
  C.ping = (a) => ({ out: `PING ${a[a.length-1] || 'localhost'}: 56 data bytes\n64 bytes: icmp_seq=1 ttl=117 time=12.4 ms\n64 bytes: icmp_seq=2 ttl=117 time=11.9 ms\n--- 2 packets transmitted, 2 received, 0% packet loss`, code: 0 });
  C.systemctl = (a) => ({ out: `● ${a[1] || 'ssh'}.service - ${a[1] || 'ssh'} daemon\n     Loaded: loaded (/lib/systemd/system/${a[1]||'ssh'}.service; enabled)\n     Active: active (running) since Fri 09:00:01`, code: 0 });
  C.man = (a) => ({ out: a[0] ? `${a[0].toUpperCase()}(1)  — the real manual lives on a real Linux box. Here: try '${a[0]} --help' on your EC2 instance.` : 'What manual page do you want?', code: 0 });
  C.clear = () => ({ out: '\u0000CLEAR', code: 0 });
  C.reset = () => { reset(); return { out: '\u0000CLEAR', code: 0 }; };
  C.history = () => ({ out: S.hist.map((h, i) => `  ${String(i + 1).padStart(3)}  ${h}`).join('\n'), code: 0 });
  C.echo = (a) => ({ out: a.join(' ').replace(/\$USER/g, S.user).replace(/\$HOME/g, USERS[S.user].home).replace(/\$PWD/g, S.cwd), code: 0 });

  C.cd = (a) => { const p = norm(a[0] || '~'); const n = get(p);
    if (!n) return nf('cd', a[0]); if (n.t !== 'd') return { out: `cd: ${a[0]}: Not a directory`, code: 1 };
    if (!can(n, 2)) return denied('cd', a[0]); S.cwd = p; return { out: '', code: 0 }; };

  function lsLine(name, n) { return `${n.t === 'd' ? 'd' : '-'}${n.mode} 1 ${n.owner.padEnd(8)} ${n.group.padEnd(10)} ${String(n.t === 'd' ? 4096 : n.c.length).padStart(5)} Nov 13 09:00 ${name}`; }
  C.ls = (a) => {
    const flags = a.filter(x => x.startsWith('-')).join(''); const tg = a.filter(x => !x.startsWith('-'))[0];
    const n = get(tg || '.'); if (!n) return { out: `ls: cannot access '${tg}': No such file or directory`, code: 2 };
    if (n.t === 'f') return { out: /l/.test(flags) ? lsLine(tg, n) : tg, code: 0 };
    if (!can(n, 0)) return { out: `ls: cannot open directory '${tg || '.'}': Permission denied`, code: 2 };
    let names = Object.keys(n.ch).sort(); if (!/a/.test(flags)) names = names.filter(x => !x.startsWith('.'));
    if (/l/.test(flags)) return { out: `total ${names.length * 4}\n` + (/a/.test(flags) ? [lsLine('.', n)] : []).concat(names.map(x => lsLine(x, n.ch[x]))).join('\n'), code: 0 };
    return { out: names.map(x => n.ch[x].t === 'd' ? x + '/' : x).join('  '), code: 0 };
  };
  C.tree = (a) => { const root = get(a[0] || '.'); if (!root || root.t !== 'd') return nf('tree', a[0] || '.');
    const lines = [a[0] || '.']; const walk = (n, pre) => { const ks = Object.keys(n.ch).filter(k => !k.startsWith('.')).sort();
      ks.forEach((k, i) => { const last = i === ks.length - 1; lines.push(pre + (last ? '└── ' : '├── ') + k); if (n.ch[k].t === 'd' && can(n.ch[k], 0)) walk(n.ch[k], pre + (last ? '    ' : '│   ')); }); };
    walk(root, ''); return { out: lines.join('\n'), code: 0 }; };
  C.mkdir = (a) => { const p = a.indexOf('-p') >= 0; const targets = a.filter(x => x !== '-p'); if (!targets.length) return { out: 'mkdir: missing operand', code: 1 };
    for (const t of targets) {
      if (p) { const parts = norm(t).split('/').filter(Boolean); let n = S.fs;
        for (const x of parts) { if (!n.ch[x]) { if (!can(n, 1)) return denied('mkdir', t); n.ch[x] = D(S.user, USERS[S.user].groups[0], 'rwxr-xr-x'); } n = n.ch[x]; } }
      else { const { dir, name } = parentOf(t); if (!dir) return { out: `mkdir: cannot create directory '${t}': No such file or directory`, code: 1 };
        if (dir.ch[name]) return { out: `mkdir: cannot create directory '${t}': File exists`, code: 1 };
        if (!can(dir, 1)) return { out: `mkdir: cannot create directory '${t}': Permission denied`, code: 1 };
        dir.ch[name] = D(S.user, USERS[S.user].groups[0], 'rwxr-xr-x'); } }
    return { out: '', code: 0 }; };
  C.touch = (a) => { for (const t of a) { const { dir, name } = parentOf(t); if (!dir) return nf('touch', t); if (dir.ch[name]) continue;
      if (!can(dir, 1)) return { out: `touch: cannot touch '${t}': Permission denied`, code: 1 }; dir.ch[name] = F(S.user, USERS[S.user].groups[0], 'rw-r--r--', ''); } return { out: '', code: 0 }; };
  function readFile(cmd, t) { const n = get(t); if (!n) return { err: nf(cmd, t) }; if (n.t === 'd') return { err: { out: `${cmd}: ${t}: Is a directory`, code: 1 } }; if (!can(n, 0)) return { err: denied(cmd, t) }; return { txt: n.c }; }
  C.cat = (a, stdin) => { if (!a.length) return { out: stdin || '', code: 0 }; const out = []; for (const t of a) { const r = readFile('cat', t); if (r.err) return r.err; out.push(r.txt); } return { out: out.join('\n'), code: 0 }; };
  function nArg(a, def) { const i = a.indexOf('-n'); if (i >= 0) { const v = +a[i + 1]; a.splice(i, 2); return v; } const m = a.find(x => /^-\d+$/.test(x)); if (m) { a.splice(a.indexOf(m), 1); return +m.slice(1); } return def; }
  C.head = (a, stdin) => { a = a.slice(); const n = nArg(a, 10); const src = a[0] ? readFile('head', a[0]) : { txt: stdin || '' }; if (src.err) return src.err; return { out: src.txt.split('\n').slice(0, n).join('\n'), code: 0 }; };
  C.tail = (a, stdin) => { a = a.slice().filter(x => x !== '-f'); const n = nArg(a, 10); const src = a[0] ? readFile('tail', a[0]) : { txt: stdin || '' }; if (src.err) return src.err; return { out: src.txt.split('\n').slice(-n).join('\n'), code: 0 }; };
  C.wc = (a, stdin) => { const fl = a.filter(x => x.startsWith('-')).join(''); const f = a.find(x => !x.startsWith('-')); const src = f ? readFile('wc', f) : { txt: stdin || '' }; if (src.err) return src.err;
    const t = src.txt; const l = t ? t.split('\n').length : 0, w = t.split(/\s+/).filter(Boolean).length; return { out: /l/.test(fl) ? `${l}${f ? ' ' + f : ''}` : `${l} ${w} ${t.length}${f ? ' ' + f : ''}`, code: 0 }; };
  C.grep = (a, stdin) => { const fl = a.filter(x => x.startsWith('-')).join(''); const rest = a.filter(x => !x.startsWith('-')); const pat = (rest[0] || '').replace(/^["']|["']$/g, '');
    const src = rest[1] ? readFile('grep', rest[1]) : { txt: stdin || '' }; if (src.err) return src.err;
    let re; try { re = new RegExp(pat, /i/.test(fl) ? 'i' : ''); } catch (e) { re = { test: s => s.indexOf(pat) >= 0 }; }
    let lines = src.txt.split('\n').filter(l => /v/.test(fl) ? !re.test(l) : re.test(l));
    if (/c/.test(fl)) return { out: String(lines.length), code: lines.length ? 0 : 1 };
    if (/n/.test(fl)) { const all = src.txt.split('\n'); lines = lines.map(l => (all.indexOf(l) + 1) + ':' + l); }
    return { out: lines.join('\n'), code: lines.length ? 0 : 1 }; };
  C.sort = (a, stdin) => { const f = a.find(x => !x.startsWith('-')); const src = f ? readFile('sort', f) : { txt: stdin || '' }; if (src.err) return src.err; let l = src.txt.split('\n').sort(); if (a.indexOf('-r') >= 0) l.reverse(); return { out: l.join('\n'), code: 0 }; };
  C.uniq = (a, stdin) => ({ out: (stdin || '').split('\n').filter((l, i, arr) => l !== arr[i - 1]).join('\n'), code: 0 });
  C.rm = (a) => { const r = a.some(x => /^-.*r/i.test(x)); const ts = a.filter(x => !x.startsWith('-')); if (!ts.length) return { out: 'rm: missing operand', code: 1 };
    for (const t of ts) { if (norm(t) === '/') return { out: "rm: it is dangerous to operate recursively on '/'\nrm: use --no-preserve-root to override this failsafe", code: 1 };
      const { dir, name } = parentOf(t); if (!dir || !dir.ch[name]) return { out: `rm: cannot remove '${t}': No such file or directory`, code: 1 };
      if (dir.ch[name].t === 'd' && !r) return { out: `rm: cannot remove '${t}': Is a directory`, code: 1 };
      if (!can(dir, 1)) return { out: `rm: cannot remove '${t}': Permission denied`, code: 1 };
      if (/t/.test(dir.mode) && S.user !== 'root' && dir.ch[name].owner !== S.user) return { out: `rm: cannot remove '${t}': Operation not permitted (sticky bit)`, code: 1 };
      delete dir.ch[name]; } return { out: '', code: 0 }; };
  C.rmdir = (a) => { const { dir, name } = parentOf(a[0] || ''); if (!dir || !dir.ch[name]) return nf('rmdir', a[0]); if (Object.keys(dir.ch[name].ch || {}).length) return { out: `rmdir: failed to remove '${a[0]}': Directory not empty`, code: 1 }; delete dir.ch[name]; return { out: '', code: 0 }; };
  function copyTo(srcPath, dst, move) { const src = get(srcPath); if (!src) return nf(move ? 'mv' : 'cp', srcPath);
    if (src.t === 'f' && !can(src, 0)) return denied(move ? 'mv' : 'cp', srcPath);
    let target = get(dst); let dir, name;
    if (target && target.t === 'd') { dir = target; name = norm(srcPath).split('/').pop(); } else { const p = parentOf(dst); dir = p.dir; name = p.name; }
    if (!dir) return nf(move ? 'mv' : 'cp', dst); if (!can(dir, 1)) return denied(move ? 'mv' : 'cp', dst);
    dir.ch[name] = move ? src : JSON.parse(JSON.stringify(src)); if (!move) { dir.ch[name].owner = S.user; }
    if (move) { const p = parentOf(srcPath); delete p.dir.ch[p.name]; } return { out: '', code: 0 }; }
  C.cp = (a) => { const ts = a.filter(x => !x.startsWith('-')); if (ts.length < 2) return { out: 'cp: missing destination file operand', code: 1 }; return copyTo(ts[0], ts[1], false); };
  C.mv = (a) => { if (a.length < 2) return { out: 'mv: missing destination file operand', code: 1 }; return copyTo(a[0], a[1], true); };
  function applyChmod(mode, spec) {
    if (/^[0-7]{3,4}$/.test(spec)) { const d = spec.slice(-3); return d.split('').map(n => (+n & 4 ? 'r' : '-') + (+n & 2 ? 'w' : '-') + (+n & 1 ? 'x' : '-')).join(''); }
    const m = mode.split(''); const ok = spec.split(',').every(part => { const mm = part.match(/^([ugoa]*)([+\-=])([rwx]+)$/); if (!mm) return false;
      const who = (mm[1] || 'a').replace('a', 'ugo'); const idx = { u: 0, g: 3, o: 6 };
      who.split('').forEach(w => { if (mm[2] === '=') ['r', 'w', 'x'].forEach((b, j) => m[idx[w] + j] = '-');
        mm[3].split('').forEach(b => { const j = { r: 0, w: 1, x: 2 }[b]; m[idx[w] + j] = mm[2] === '-' ? '-' : b; }); }); return true; });
    return ok ? m.join('') : null; }
  C.chmod = (a) => { const fl = a.filter(x => x === '-R'); const rest = a.filter(x => x !== '-R'); const [spec, t] = rest; const n = get(t || ''); if (!n) return { out: `chmod: cannot access '${t}': No such file or directory`, code: 1 };
    if (S.user !== 'root' && n.owner !== S.user) return { out: `chmod: changing permissions of '${t}': Operation not permitted`, code: 1 };
    const nm = applyChmod(n.mode, spec); if (!nm) return { out: `chmod: invalid mode: '${spec}'`, code: 1 }; n.mode = nm; return { out: '', code: 0 }; };
  C.chown = (a) => { const [spec, t] = a.filter(x => x !== '-R'); const n = get(t || ''); if (!n) return { out: `chown: cannot access '${t}': No such file or directory`, code: 1 };
    if (S.user !== 'root') return { out: `chown: changing ownership of '${t}': Operation not permitted`, code: 1 };
    const [u, g] = spec.split(':'); if (u) { if (!USERS[u] && u !== 'www-data') return { out: `chown: invalid user: '${spec}'`, code: 1 }; n.owner = u; } if (g) n.group = g; return { out: '', code: 0 }; };
  C.chgrp = (a) => { const [g, t] = a; const n = get(t || ''); if (!n) return nf('chgrp', t); if (S.user !== 'root' && !(n.owner === S.user && inGroup(S.user, g))) return { out: `chgrp: changing group of '${t}': Operation not permitted`, code: 1 }; n.group = g; return { out: '', code: 0 }; };
  C.su = (a) => { const u = a.filter(x => x !== '-')[0] || 'root'; if (!USERS[u]) return { out: `su: user ${u} does not exist`, code: 1 }; S.prev.push(S.user); S.user = u; if (a.indexOf('-') >= 0) S.cwd = USERS[u].home; return { out: u === 'root' ? '(sandbox: password accepted)' : '', code: 0 }; };
  C.exit = () => { if (S.prev.length) { S.user = S.prev.pop(); return { out: 'logout', code: 0 }; } return { out: 'logout (nowhere to go — this is the sandbox)', code: 0 }; };
  C.sudo = (a, stdin) => { if (!inGroup(S.user, 'sudo') && S.user !== 'root') return { out: `${S.user} is not in the sudoers file. This incident will be reported.`, code: 1 };
    if (!a.length) return { out: 'usage: sudo command', code: 1 }; const was = S.user; S.user = 'root'; const r = run1(a, stdin); S.user = was; return r; };
  C.useradd = (a) => { if (S.user !== 'root') return { out: 'useradd: Permission denied.', code: 1 }; const u = a.filter(x => !x.startsWith('-'))[0]; if (!u) return { out: 'usage: useradd NAME', code: 2 }; USERS[u] = { uid: 1000 + Object.keys(USERS).length, groups: [u], home: '/home/' + u }; if (a.indexOf('-m') >= 0) get('/home').ch[u] = D(u, u, 'rwxr-x---'); return { out: '', code: 0 }; };
  C.usermod = (a) => { if (S.user !== 'root') return { out: 'usermod: Permission denied.', code: 1 }; const i = a.indexOf('-aG'); const u = a[a.length - 1]; if (i < 0 || !USERS[u]) return { out: 'usage: usermod -aG GROUP USER', code: 2 }; a[i + 1].split(',').forEach(g => { if (USERS[u].groups.indexOf(g) < 0) USERS[u].groups.push(g); }); return { out: '', code: 0 }; };

  /* ---------- parser ---------- */
  function tokenize(line) { const out = []; let cur = '', q = null; for (const ch of line) { if (q) { if (ch === q) q = null; else cur += ch; } else if (ch === '"' || ch === "'") q = ch; else if (/\s/.test(ch)) { if (cur) out.push(cur), cur = ''; } else cur += ch; } if (cur) out.push(cur); return out; }
  function run1(tokens, stdin) { const [cmd, ...args] = tokens; if (!cmd) return { out: '', code: 0 };
    const fn = C[cmd]; if (!fn) return { out: `${cmd}: command not found  (type 'help')`, code: 127 };
    if (args.indexOf('--help') >= 0) return { out: `Usage: ${cmd} [OPTION]... — on a real box, '${cmd} --help' and 'man ${cmd}' explain every flag.`, code: 0 };
    return fn(args, stdin); }
  function exec(line) {
    line = line.trim(); if (!line) return { out: '', code: 0 };
    S.hist.push(line);
    let redir = null; const m = line.match(/^(.*?)\s*(>>|>)\s*(\S+)\s*$/);
    if (m && !/^echo\s.*['"].*>.*['"]$/.test(line)) { line = m[1]; redir = { op: m[2], file: m[3] }; }
    const parts = line.split('|').map(s => s.trim());
    let res = { out: '', code: 0 }, stdin = null;
    for (const p of parts) { res = run1(tokenize(p), stdin); stdin = res.out; }
    if (redir && res.code === 0) {
      const { dir, name } = parentOf(redir.file); if (!dir) return nf('bash', redir.file);
      let f = dir.ch[name]; if (f && f.t === 'd') return { out: `bash: ${redir.file}: Is a directory`, code: 1 };
      if (!f) { if (!can(dir, 1)) return denied('bash', redir.file); f = dir.ch[name] = F(S.user, USERS[S.user].groups[0], 'rw-r--r--', ''); }
      else if (!can(f, 1)) return denied('bash', redir.file);
      f.c = redir.op === '>>' && f.c ? f.c + '\n' + res.out : res.out; res = { out: '', code: 0 };
    }
    S.last = res.out; S.lastCode = res.code; return res;
  }
  function prompt() { const home = USERS[S.user].home; const d = S.cwd === home ? '~' : S.cwd.startsWith(home + '/') ? '~' + S.cwd.slice(home.length) : S.cwd; return { user: S.user, host: 'linux-lab', dir: d, sym: S.user === 'root' ? '#' : '$' }; }

  return { exec, prompt, reset, get: p => get(p), state: S, norm, USERS };
})();
