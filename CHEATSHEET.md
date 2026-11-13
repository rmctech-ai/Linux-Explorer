# Linux Cheat Sheet

_Auto-generated from the Linux Explorer lessons. One master memory hook + the key commands per lesson._

## 01 · What is Linux?

> ★ Customer → Waiter → Chef → Kitchen. You order, the shell takes the order, the kernel cooks, the hardware is the stove.

| Command | What it does |
|---|---|
| `uname -a` | kernel & system info |
| `cat /etc/os-release` | which distro |
| `whoami` | current user |
| `hostname` | machine name |
| `uptime` | running time & load |
| `echo $SHELL` | which shell |

**Memory hooks:**

- **Meet the kernel**: Kernel = Kitchen boss. Both start with K. Only the kernel touches the stove.
- **Distributions**: Same engine, different cars. Ubuntu, Amazon Linux and Kali all run the Linux engine.
- **The shell**: Terminal = window, Shell = waiter. You talk to the waiter through the window.
- **Everything is a file**: "If it exists, it has a path." Hardware, settings and processes all live in the file tree.
- **Why Linux runs the cloud**: F.S.S.L.O.: Free, Stable, Scriptable, Lightweight, Open.
- **Your first commands**: WHO-HOST-UNAME-UP: the four-command "server hello".

## 02 · Terminal & Shell

> ★ Verb, adverb, noun. ls -l /etc = "list, in long form, the /etc folder".

| Command | What it does |
|---|---|
| `man <cmd>` | full manual (q quits) |
| `<cmd> --help` | quick help |
| `history` | past commands |
| `Ctrl+R` | search history |
| `echo $PATH` | where bash looks |
| `which <cmd>` | path of a program |
| `export VAR=val` | set env variable |

**Memory hooks:**

- **Read the prompt**: $ = civilian, # = root. A hash means "handle with care".
- **Command grammar**: V-A-N: Verb, Adverb, Noun. Command, flag, target.
- **Getting help**: "Man, I need help!" → man or --help. Stuck in a manual? Press q to Quit.
- **Speed keys**: Tab to finish, ↑ to repeat, Ctrl+C to escape.
- **Variables & $PATH**: PATH = the places bash looks. "Command not found" usually means "not in PATH".

## 03 · The Filesystem Map

> ★ Linux is a house. / = the land, /home = bedrooms, /root = the master's room, /etc = the fuse box, /var/log = the CCTV recorder, /tmp = the kitchen table, /bin = the toolshed.

| Command | What it does |
|---|---|
| `/etc` | configuration |
| `/var/log` | logs |
| `/home/<user>` | user files (~) |
| `/root` | root’s home |
| `/usr/bin` | commands |
| `/proc` | live kernel info |
| `/tmp` | temp, world-writable |
| `/dev/null` | black hole |

**Memory hooks:**

- **Root: /**: Slash is the start. Every absolute path begins with /.
- **/etc: configuration**: /etc = "Edit To Configure".
- **/home and /root**: ~ = home sweet home. Root sleeps in /root.
- **/var/log: logs**: "Something broke? Var-log it."
- **Program folders**: bin = binaries = tools. s-bin = system (admin) binaries.
- **Virtual & temp folders**: dev = devices, proc = processes, tmp = temporary.

## 04 · Moving Around

> ★ Where? What? Go! → pwd, ls, cd.

| Command | What it does |
|---|---|
| `pwd` | where am I |
| `ls -lah` | list long/all/human |
| `cd /path` | go (absolute) |
| `cd ..` | up one level |
| `cd ~ / cd` | go home |
| `cd -` | previous directory |
| `tree` | draw folder tree |

**Memory hooks:**

- **pwd: where am I?**: pwd = "Point Where I'm Drawn", the red pin on the map.
- **ls: look around**: "ls -lah": say it like "lah-di-dah": long, all, human.
- **cd: go somewhere**: Slash first = full address. No slash = "from here".
- **Path shortcuts**: One dot: here. Two dots: up. Tilde: home. Dash: back.
- **Tab & tree**: Type 3 letters, hit Tab. Fewer keystrokes, zero typos.

## 05 · Files & Directories

> ★ Make, Touch, Copy, Move, Remove → "My Tired Cat Meows Rarely".

| Command | What it does |
|---|---|
| `mkdir -p a/b` | make folders + parents |
| `touch f` | new empty file |
| `cp src dst` | copy (-r for folders) |
| `mv src dst` | move / rename |
| `rm f` | delete (no undo!) |
| `rm -r dir` | delete folder |
| `*  ?  {a,b}` | wildcards |

**Memory hooks:**

- **mkdir: make folders**: -p = "Parents, please." Builds every missing parent.
- **touch: new empty file**: Touch it and it exists.
- **cp: copy**: "From → To." Source first, destination second, always.
- **mv: move & rename**: Rename = move to a new name.
- **rm: delete forever**: Read twice, rm once. Especially anything with -rf or *.
- **Wildcards**: Star = any amount. Question = exactly one. Test with ls before rm!

## 06 · Reading & Editing

> ★ cat = whole, less = page, head = top, tail = bottom, tail -f = live.

| Command | What it does |
|---|---|
| `cat f` | print whole file |
| `less f` | page through (q quits) |
| `head -n 20 f` | first lines |
| `tail -n 50 f` | last lines |
| `tail -f f` | follow live |
| `nano f` | easy editor (^O ^X) |
| `vim f` | i · Esc · :wq · :q! |

**Memory hooks:**

- **cat: print it all**: cat = "conCATenate" = glue files together and show them all.
- **less: page through**: "less is more": it shows less at once and gives you more control. q quits.
- **head & tail**: tail -f = follow. Watch the log while you reproduce the bug.
- **nano: friendly editor**: Ctrl+O = Output (save), Ctrl+X = eXit.
- **vim: survive it**: "i to Insert, Esc to Escape, :wq to Win & Quit, :q! to Quit in panic!"

## 07 · Search: find & grep

> ★ find = find the folder/file. grep = grab the text. FIND the haystack, GREP the needle.

| Command | What it does |
|---|---|
| `find / -name "x"` | find by name |
| `find . -type f -size +100M` | big files |
| `find . -mtime -1` | changed in 24h |
| `grep "txt" file` | lines containing txt |
| `grep -rin "txt" dir` | recursive, case-ins, line no. |
| `grep -v / -c` | invert / count |
| `which cmd` | where a program is |

**Memory hooks:**

- **find by name**: "find WHERE WHAT": start place first, then what you're looking for.
- **find by attributes**: T-S-M-U: Type, Size, Modified, User. The four filters you'll use most.
- **grep: text inside**: grep = "Get Regular Expression & Print". -i ignore case, -v reverse, -c count, -n number.
- **grep recursively**: -r = recursive = "and all the folders inside".
- **which, whereis, locate**: locate = Library catalogue (fast, maybe stale). find = walk the shelves (slow, always fresh).

## 08 · Pipes & Redirection

> ★ > overwrites, >> appends, | passes it on. "One arrow = Overwrite. Two arrows = Add more."

| Command | What it does |
|---|---|
| `cmd > f` | stdout to file (overwrite) |
| `cmd >> f` | append |
| `cmd 2>/dev/null` | discard errors |
| `cmd > f 2>&1` | stdout + stderr to file |
| `a \| b` | pipe a into b |
| `sort \| uniq -c \| sort -rn` | count & rank |
| `cmd \| tee f` | save and pass on |

**Memory hooks:**

- **Three standard streams**: 0-1-2 = In, Out, Oops.
- **> and >>**: One arrow wipes, two arrows add.
- **2> and /dev/null**: 2>/dev/null = "shut up about errors". 2>&1 = "errors, follow stdout".
- **The pipe |**: The pipe is a conveyor belt. Read it left to right like a sentence.
- **Text-crunching toolkit**: "sort | uniq -c | sort -rn" = the famous "count & rank" chant.

## 09 · Users & Groups

> ★ User = a person's ID badge. Group = a team badge. Doors (files) check badges.

| Command | What it does |
|---|---|
| `whoami / id` | who am I + groups |
| `groups user` | list user’s groups |
| `sudo useradd -m -s /bin/bash u` | create user |
| `sudo passwd u` | set password |
| `sudo usermod -aG grp u` | add to group (keep -a!) |
| `sudo userdel -r u` | delete user + home |
| `/etc/passwd · /etc/shadow · /etc/group` | identity files |

**Memory hooks:**

- **Who is the user?**: UID 0 = root = god mode. Humans start at 1000.
- **/etc/passwd**: "Name, X, UID, GID, Comment, Home, Shell" → "Never eXpect Unicorns Growing Carrots Here, Silly".
- **Groups**: Grant to groups, not to people.
- **Create users**: useradd -m = "make me a home".
- **Add to a group**: "-aG: Always Group with A". a = append, or you'll Annihilate the other groups.
- **Service accounts**: Every service gets its own small key. That's least privilege.

## 10 · Permissions & Ownership

> ★ U-G-O × R-W-X, and the magic numbers 4-2-1: Read 4, Write 2, eXecute 1.

| Command | What it does |
|---|---|
| `ls -l` | view permissions |
| `chmod u+x f` | owner can execute |
| `chmod 755 f` | rwxr-xr-x |
| `chmod 644 f` | rw-r--r-- |
| `chmod 600 f` | private file |
| `sudo chown u:g f` | change owner/group |
| `chmod -R / chown -R` | recursive |

**Memory hooks:**

- **Three audiences**: U-G-O = "U Go first": User/owner, Group, Other. First match wins.
- **Read, Write, Execute**: Folders: x = enter, r = see, w = change contents. No x on a folder = locked door, even if you can "see" names.
- **Decode ls -l**: 1-3-3-3: Type, then U, G, O.
- **chmod: symbolic**: Who-Op-What: u+x = "user, add, execute".
- **chmod: numbers**: 4 Read, 2 Write, 1 eXecute. 7 = everything, 0 = nothing. "755 for scripts, 644 for files, 600 for secrets."
- **chown & chgrp**: chMOD = MODE (rules). chOWN = OWNER (who). Format: user:group.
- **The alice / bob / charlie test**: 750 = "Owner all, team use, world nothing".

## 11 · sudo & root

> ★ sudo = "Super User, DO this one thing." Borrow the master key, return it immediately.

| Command | What it does |
|---|---|
| `sudo cmd` | run one command as root |
| `sudo -i` | root shell (exit fast) |
| `sudo -u bob cmd` | run as bob |
| `sudo visudo` | edit sudoers safely |
| `sudo -l` | what may I sudo? |
| `/var/log/auth.log \| secure` | sudo audit trail |

**Memory hooks:**

- **Meet root**: Root has no seatbelt.
- **sudo one command**: "Make me a sandwich." "No." "sudo make me a sandwich." "Okay."
- **Everything is logged**: sudo = power + paper trail.
- **Who may sudo?**: Never edit sudoers raw. Use visudo.
- **su vs sudo -i**: See a # prompt? Finish and exit.

## 12 · Special Bits & umask

> ★ SUID = run as the owner. SGID = inherit the group. Sticky = only owners delete. Same 4-2-1, one digit to the left.

| Command | What it does |
|---|---|
| `chmod 4755 f` | set SUID |
| `chmod 2775 d` | set SGID on dir |
| `chmod 1777 d / +t` | sticky bit |
| `find / -perm -4000` | find SUID files |
| `umask` | show default mask |
| `umask 077` | private-by-default |

**Memory hooks:**

- **SUID: run as owner**: S in the owner slot = "Superpower of the owner".
- **Hunting SUID**: -perm -4000 = "show me the SUID files".
- **SGID: share the group**: SGID = "Same Group In Directory".
- **Sticky bit**: Sticky = "my stuff sticks to me". t at the end = /tmp.
- **umask: default perms**: umask = "un-mask" = bits removed. 022 → 644/755. 077 → private.

## 13 · Processes & Signals

> ★ Program = recipe. Process = the dish being cooked right now. PID = the order number.

| Command | What it does |
|---|---|
| `ps aux` | all processes |
| `ps aux \| grep x` | find a process |
| `top / htop` | live view (P/M/q) |
| `kill PID` | SIGTERM (polite) |
| `kill -9 PID` | SIGKILL (force) |
| `pkill -f name` | kill by name |
| `cmd &  · jobs · fg · bg` | job control |
| `nohup cmd &` | survive logout |

**Memory hooks:**

- **Program vs process**: PID 1 is the great-grandparent of every process.
- **ps & top**: ps = Photo Snapshot, top = Task Observer Panel. In top: P = CPU, M = Memory.
- **Signals & kill**: 15 first, 9 last. "Ask, then axe."
- **Ctrl+C, Ctrl+Z**: C = Cancel, Z = Zzz (sleep).
- **Background & nohup**: & = "and meanwhile…". nohup = "no hang-up".

## 14 · Boot & systemd

> ★ "Big Green Kangaroos Sing Loudly" → BIOS/UEFI, GRUB, Kernel, Systemd, Login.

| Command | What it does |
|---|---|
| `systemctl status x` | is it running? |
| `sudo systemctl start\|stop\|restart x` | control now |
| `sudo systemctl enable --now x` | start + on boot |
| `sudo systemctl reload x` | reload config |
| `journalctl -u x -e` | service logs (end) |
| `journalctl -f` | follow all logs |
| `sudo systemctl daemon-reload` | after editing units |

**Memory hooks:**

- **Firmware → GRUB → kernel**: B-G-K: BIOS, GRUB, Kernel. Baton, Grab, Keep running.
- **systemd takes over**: systemd = the system daemon = stage manager, PID 1.
- **systemctl basics**: "Status first." Always check status before and after changing anything.
- **enable vs start**: start = today, enable = every day. enable --now = both.
- **journalctl: service logs**: Failed service? "journalctl -u NAME -e". u = unit, e = end.
- **Write your own service**: Unit · Service · Install → "U S I": "U Se It". Then daemon-reload.

## 15 · Package Management

> ★ Package manager = app store. Repository = the store's warehouse. apt for Debian/Ubuntu, dnf for Red Hat/Amazon Linux.

| Command | What it does |
|---|---|
| `sudo apt update` | refresh package list |
| `sudo apt upgrade -y` | apply updates |
| `sudo apt install -y x` | install (Debian/Ubuntu) |
| `sudo dnf install -y x` | install (RHEL/AL2023) |
| `apt search / dnf search` | find packages |
| `sudo apt purge x` | remove + config |
| `sudo dnf upgrade --security` | security patches |

**Memory hooks:**

- **update the catalogue**: Update the menu, then upgrade the meal. Always update before installing.
- **install & dependencies**: install = order; -y = "yes to everything".
- **search, info, remove**: remove keeps config, purge erases all.
- **Patch = security**: Unpatched = unlocked.

## 16 · Logs & Health Checks

> ★ "Doctor's checkup": df (weight), free (blood), uptime (pulse), top (fever), logs (history).

| Command | What it does |
|---|---|
| `df -h` | disk free per FS |
| `sudo du -sh /* \| sort -h` | biggest folders |
| `free -h` | memory (available!) |
| `uptime · nproc` | load vs CPUs |
| `last / lastb` | logins / failed |
| `journalctl -p err -b` | errors this boot |
| `/etc/logrotate.d` | rotation configs |

**Memory hooks:**

- **Disk: df & du**: df = Disk Free (whole drive). du = Disk Used (by folder).
- **Memory: free**: "Free is fake, available is real."
- **Load: uptime**: Load ÷ CPUs > 1 = queue forming. Read 1-5-15 like "now, recently, lately".
- **Know your logs**: Login question → auth. System question → syslog. App question → the app's folder.
- **Catch a brute-force**: Many fails + few IPs = brute force.
- **Rotate & ship logs**: Rotate locally, ship centrally.

## 17 · Networking Essentials

> ★ IP = street address, Port = apartment door, DNS = the phone book.

| Command | What it does |
|---|---|
| `ip a / ip -br a` | IP addresses |
| `ip route` | routes / gateway |
| `ping -c 4 host` | reachability |
| `sudo ss -tulpn` | listening ports |
| `dig name +short` | DNS lookup |
| `curl -I url` | HTTP headers |
| `nc -zv host port` | test a TCP port |

**Memory hooks:**

- **Your IP: ip a**: 127.0.0.1 = "there's no place like home".
- **Reachability: ping**: ping = knock. No answer ≠ nobody home.
- **Ports: ss -tulpn**: "ss -tulpn" = "TULiP N": plant a tulip at every open door. 0.0.0.0 = open to the world.
- **DNS: names → IPs**: "It's always DNS." The sysadmin proverb. Check it early.
- **Talk HTTP: curl**: curl -I = "I just want the headlines".
- **Troubleshooting ladder**: "Running → Listening → Local FW → Cloud FW → DNS → Path."

## 18 · SSH & Keys

> ★ Public key = padlock (give it away). Private key = the only key that opens it (never share).

| Command | What it does |
|---|---|
| `ssh user@host` | connect |
| `ssh -i key.pem user@host` | connect with key file |
| `ssh-keygen -t ed25519` | make key pair |
| `ssh-copy-id user@host` | install public key |
| `scp f host:/path` | copy file |
| `rsync -avz src/ host:dst/` | sync changes |
| `sudo sshd -t` | test sshd config |

**Memory hooks:**

- **ssh user@host**: ssh WHO@WHERE: same pattern as an email address.
- **Key pairs**: .pub = Public = Put it on servers. No .pub = Private = Pocket only.
- **authorized_keys**: Folder 700, file 600, or SSH silently refuses your key.
- **Config & jumping**: Long command? Make it a Host alias.
- **Copy files: scp & rsync**: scp = Secure CoPy. rsync = Re-SYNC only what changed. Remote side is host:path.
- **Harden sshd**: "No root, no passwords, keys only." And never close your last session before testing.

## 19 · Hardening a Server

> ★ "Patch, Lock, Wall, Watch, Shrink." Patch packages, Lock SSH, Wall with a firewall, Watch the logs, Shrink the attack surface.

| Command | What it does |
|---|---|
| `sudo ufw default deny incoming` | default deny |
| `sudo ufw allow OpenSSH` | allow SSH first! |
| `sudo ufw enable / status` | turn on / check |
| `sudo fail2ban-client status sshd` | bans |
| `find / -perm -0002 -type f` | world-writable |
| `sudo lynis audit system` | full audit |
| `systemctl disable --now x` | remove a service |

**Memory hooks:**

- **Patch & lock SSH**: Patch first, lock second.
- **Host firewall: ufw**: Deny by default, allow by exception. And allow SSH before you enable, or you lock yourself out.
- **fail2ban**: fail2ban = fail too many times → ban.
- **Audit the box**: "Ports, SUID, 777, UID 0, failed logins." Five checks, five minutes.
- **Shrink the attack surface**: "If you don't need it, don't run it."

## 20 · Bash Scripting & Cron

> ★ Shebang, chmod +x, run. Then cron's five stars: "Minute Hour Day Month Weekday" → "My Hamster Drinks Milk Weekly".

| Command | What it does |
|---|---|
| `#!/bin/bash` | shebang |
| `set -euo pipefail` | fail fast |
| `chmod +x s.sh && ./s.sh` | run script |
| `"$1" "$@" $(cmd)` | args & substitution |
| `if [ -f f ]; then…fi` | condition |
| `echo $?` | last exit code |
| `crontab -e / -l` | schedule jobs |

**Memory hooks:**

- **Shebang & run**: "#! = she-bang!" Hash-bang points to the interpreter.
- **Variables & arguments**: No spaces around =. Dollar to read. Quotes always.
- **if & loops**: if…fi, case…esac, do…done: bash closes blocks with the word reversed (mostly!).
- **Exit codes**: Zero is hero. && = "and then", || = "or else".
- **A real backup script**: Archive, prune, log. The three verbs of any backup job.
- **Schedule with cron**: "My Hamster Drinks Milk Weekly" = Minute Hour Day Month Weekday. Use crontab.guru to double-check.

## 21 · Linux on AWS EC2

> ★ "AMI, Key, SG, User-data, Connect." → "A Kind Server Usually Connects".

| Command | What it does |
|---|---|
| `chmod 400 key.pem` | protect AWS key |
| `ssh -i key.pem ec2-user@IP` | connect (AL2023) |
| `/var/log/cloud-init-output.log` | user-data output |
| `curl 169.254.169.254 (+token)` | instance metadata |
| `aws ssm start-session --target i-…` | SSH-less shell |
| `sudo dnf upgrade --security` | patch AL2023 |

**Memory hooks:**

- **Pick an AMI**: Amazon → ec2-user, Ubuntu → ubuntu.
- **Connect with the key**: 400 the pem, -i the pem.
- **User data & cloud-init**: User data runs ONCE, as ROOT, at FIRST boot.
- **Instance metadata (IMDSv2)**: 169.254.169.254 = "ask AWS about me". v2 = token first.
- **Shared responsibility & SSM**: AWS = security OF the cloud. You = security IN the cloud. (Straight from the CCP exam.)

## 22 · Containers Under the Hood

> ★ Container = process + blinders (namespaces) + diet (cgroups) + lunchbox (image).

| Command | What it does |
|---|---|
| `docker run -d -p 8080:80 nginx` | run container |
| `docker ps / docker stats` | list / usage |
| `docker exec -it c sh` | shell inside |
| `docker logs -f c` | container logs |
| `--memory 256m --cpus 0.5` | cgroup limits |
| `lsns` | list namespaces |
| `USER 1000 (Dockerfile)` | run as non-root |

**Memory hooks:**

- **Just a process**: Container = a process with a costume.
- **Namespaces: blinders**: "PUMNIU": Pid, Uts, Mnt, Net, Ipc, User. Six blinders.
- **cgroups: the diet**: Namespaces = what you SEE. cgroups = what you USE.
- **Images & layers**: Image = recipe result (read-only). Container = the dish being eaten (writable, temporary).
- **Containers vs VMs**: VM = house (own kernel). Container = apartment (shared kernel).

