window.EXPLAIN = {
"what-is-linux": [
 [null, ["Ubuntu is a distribution: the kernel plus tools, package manager and defaults.", null, "Bash is one shell that runs on top of the kernel.", "GNOME/KDE are optional graphical layers; servers usually have none."]],
 [null, ["The chef is the kernel, which does the real work with hardware.", "The stove is the hardware the kernel controls.", null, "The customer is you, the user typing commands."]],
 [null, ["apt is for Debian and Ubuntu.", null, "pacman is Arch Linux's package manager.", "brew is Homebrew on macOS (and optional on Linux)."]],
 [null, ["/etc holds configuration files, not live hardware data.", "/home holds users' personal files.", null, "/var holds variable data like logs and caches."]]
],
"terminal-shell": [
 [null, ["Comments start with # inside scripts, not in the prompt.", null, "Failures show as error messages or a non-zero exit code.", "The prompt symbol doesn't show the directory."]],
 [null, ["tar is the command.", "-czf are the options (flags).", null, "Variables start with $, like $HOME."]],
 [null, ["Running as another user doesn't hide installed commands.", null, "A broken kernel wouldn't let the shell run at all.", "Tab completes names; it can't run something that isn't there."]],
 [null, ["Ctrl+Z suspends (pauses) the program; it's still in memory.", null, "Esc doesn't send signals to programs.", "q quits some programs like less, but isn't universal."]]
],
"filesystem": [
 [null, ["/home is for user files, not system services.", "/var holds logs and data, not service config.", null, "/bin holds programs, not their configuration."]],
 [null, ["/tmp is temporary scratch space (sometimes where attackers drop tools, but not the log of what happened).", null, "/boot holds the kernel and bootloader files.", "/opt holds optional third-party software."]],
 [null, ["The top of the filesystem is / itself.", null, "The kernel lives in /boot (and memory).", "Devices live in /dev."]],
 [null, [null, "/etc is configuration stored on disk.", "/usr holds installed programs on disk.", "/home holds user files on disk."]]
],
"navigation": [
 [null, ["/ is the very top; .. goes up only one level.", "/home is two levels up.", null, "The shell resolves .. to the parent; you never stay in a path ending in /..."]],
 [null, ["-h shows human-readable sizes (with -l).", null, "-t sorts by modification time.", "-r reverses the sort order."]],
 [null, ["project/src is relative to the current directory.", "../log is relative to the current directory.", null, "./notes.txt is relative to the current directory."]],
 [null, ["Plain cd (or cd ~) goes home.", "cd / goes to the root of the filesystem.", null, "cd never deletes anything."]]
],
"files-dirs": [
 [null, ["rename exists on some systems with different syntax, but mv is the standard way.", null, "cp -n copies (without overwriting), leaving the original behind.", "rn isn't a Linux command."]],
 [null, ["Without -p it fails because a and a/b don't exist.", "mkdir has no -r option.", null, "touch creates files, not directories."]],
 [null, ["The terminal has no Trash; rm deletes immediately.", "There's no undo for rm.", "rm has no -u restore option.", null]],
 [null, ["Without -r, cp refuses to copy a directory.", null, "mv moves (and has no -r); the original would be gone.", "-f forces overwriting but doesn't copy directories."]]
],
"read-edit": [
 [null, ["cat prints the file once and exits; it has no -f follow mode.", "less has follow mode with Shift+F, but -live isn't an option.", null, "head shows the first lines; it can't follow."]],
 [null, ["Ctrl+S may freeze your terminal (flow control); it isn't vim's save.", null, "Ctrl+X is nano's exit.", "q alone only works for a few programs; vim needs :q in Normal mode."]],
 [null, ["cat dumps all 3 GB to the screen.", "nano tries to load the whole file into memory.", null, "touch only updates timestamps or creates empty files."]],
 [null, ["Ctrl+R reads (inserts) a file in nano.", null, "Ctrl+X quits.", "Undo is Alt+U."]]
],
"find-grep": [
 [null, ["grep searches file contents and has no -mtime.", null, "locate searches a name database, not by modification time.", "ls -t sorts one directory by time; it doesn't filter or recurse."]],
 [null, ["-i makes the match case-insensitive; it still shows DEBUG lines.", null, "-c counts matching lines.", "find doesn't search file contents."]],
 [null, [null, "find matches names, and this syntax is invalid.", "cat can't read a directory like /etc.", "locate searches file names, not contents."]],
 [null, ["Quoting doesn't change speed.", null, "-type works with or without quotes.", "Case-insensitive matching needs -iname."]]
],
"pipes": [
 [null, ["> truncates the file before writing.", null, "| sends output to a program, not a file.", "2> redirects errors, not the normal output."]],
 [null, ["> /dev/null hides normal output and keeps the errors.", null, "| null pipes into a command called null, which doesn't exist.", "1> is the same as >: it hides stdout, not errors."]],
 [null, [null, "uniq doesn't need root.", "uniq reads stdin happily.", "uniq works on any text."]],
 [null, ["stderr isn't piped by |; use 2>&1 | for that.", null, "Redirection (>) connects to files.", "It's the left command's stdout into the right command's stdin, not the reverse."]]
],
"users-groups": [
 [null, ["UID 1 is usually a system account like daemon or bin.", "UID 1000 is typically the first regular user.", null, "65534 is usually nobody; UIDs aren't root-reserved at 65535."]],
 [null, ["/etc/passwd is world-readable and shows only x for the password.", null, "Linux doesn't store passwords in home directories.", "auth.log records logins, not password hashes."]],
 [null, ["Without -a, -G replaces all of bob's supplementary groups.", null, "groupadd creates a new group.", "chown changes file ownership."]],
 [null, ["It's about security, not speed.", null, "HTTP doesn't require any particular user.", "Disk usage is unrelated."]]
],
"permissions": [
 [null, ["755 would be rwxr-xr-x (others can read and run).", null, "740 would be rwxr----- (group read only).", "640 would be rw-r----- (no execute for the owner)."]],
 [null, ["The group bits are r--, so read only.", null, "Only the owner or root can chmod.", "bob isn't the owner; the group triple applies."]],
 [null, ["Directories aren't programs, so they can't be run.", null, "Deleting entries needs w on the parent directory.", "Listing names needs r on the directory."]],
 [null, ["777 is the opposite: everyone can read and write.", null, "Ownership by root doesn't fix the permission bits.", "Deleting the key locks you out of the instance."]],
 [null, ["Owners can't give files away (that would let them dodge quotas).", "Group members can't change ownership.", null, "Others certainly can't."]]
],
"sudo-root": [
 [null, ["That's how su works, not sudo.", null, "By default a password is required (unless configured with NOPASSWD).", "Groups don't have passwords for sudo."]],
 [null, ["A syntax mistake saved directly can lock everyone out of sudo.", null, "Appending blindly risks a broken file.", "Use visudo regardless of the editor."]],
 [null, [null, "/etc/sudoers is configuration, not a log.", "/root/log isn't a standard log location.", "/tmp isn't used for logs."]],
 [null, ["Speed isn't the issue.", null, "Linux doesn't forbid it, but it's bad practice.", "sudo still works; accountability is what's lost."]]
],
"special-perms": [
 [null, ["Anyone with execute permission can run it, and it runs as root.", null, "Sticky shows as t in the others execute slot.", "Directories start with d."]],
 [null, ["SUID runs programs as their owner.", "SGID affects group ownership.", null, "umask sets default permissions for new files."]],
 [null, ["644 comes from umask 022.", null, "777 would be no mask at all (and files don't get execute by default).", "700 is what directories get with umask 077 (777 - 077)."]],
 [null, ["ls has no recursive permission search like this.", null, "chmod changes permissions; it doesn't list them.", "/etc doesn't record SUID files."]]
],
"processes": [
 [null, ["SIGKILL (9) is kill -9, which can't be caught.", null, "SIGHUP (1) is a hangup, often used to reload config.", "SIGINT (2) is what Ctrl+C sends."]],
 [null, ["PID 0 is the kernel's scheduler/idle task, not a normal process.", null, "100 is an arbitrary process.", "1337 is just a number."]],
 [null, ["Ctrl+C or kill would end it.", null, "It's stopped, not running; bg would resume it in the background.", "Nothing restarts it automatically."]],
 [null, ["P sorts by CPU.", null, "k kills a process in top.", "s changes the refresh delay."]]
],
"systemd": [
 [null, ["start runs it now but not after a reboot.", null, "reload re-reads config of a running service.", "service ... boot isn't a valid command."]],
 [null, ["/etc/myapp may hold config but not the failure output.", null, "ps shows running processes only.", "top shows live resource usage."]],
 [null, ["Rebooting works but is unnecessary and disruptive.", null, "grub-install reinstalls the bootloader.", "systemd keeps the old unit until you reload."]],
 [null, ["The firmware (BIOS/UEFI) must run first.", null, "GRUB is loaded by the firmware, not the other way round.", "systemd is the last step, started by the kernel."]]
],
"packages": [
 [null, ["That's apt upgrade.", null, "Kernel updates come through upgrade.", "apt never reboots."]],
 [null, ["apt is for Debian and Ubuntu.", null, "brew is Homebrew.", "pacman is Arch Linux."]],
 [null, ["AWS secures the hypervisor and hardware, not your guest OS.", null, "Canonical publishes Ubuntu patches, but you must apply them.", "Unpatched systems get exploited; someone must patch."]],
 [null, ["remove keeps configuration files.", null, "clean empties the package download cache.", "apt has no delete command."]]
],
"logs-monitoring": [
 [null, ["df shows free space per filesystem.", null, "free shows memory.", "lsblk lists block devices."]],
 [null, ["available (378Mi) is what apps can actually use.", null, "Swap is a fallback; available memory is the real indicator.", "Rebooting throws away a healthy cache."]],
 [null, ["Idle would be near 0.", null, "Load measures processes, not logged-in users.", "A full disk shows in df, not load average."]],
 [null, ["Shipping logs uses a little CPU; it doesn't save it.", null, "Linux has no such requirement.", "The goal is to keep logs safe, not delete them."]]
],
"networking": [
 [null, ["ip a shows interfaces and addresses.", null, "ping tests reachability and has no listening-port mode.", "dig queries DNS."]],
 [null, ["A firewall drop usually causes a timeout, not a refusal.", null, "DNS failures happen before connecting.", "Authentication happens after a connection is accepted."]],
 [null, ["resolv.conf lists which DNS servers to ask.", null, "/etc/dns isn't a standard file.", "/var/hosts isn't a standard file."]],
 [null, ["Loopback is never reachable from outside the machine.", null, "Other VPC hosts can't reach 127.0.0.1 on this machine.", "Local programs can still connect."]]
],
"ssh": [
 [null, ["The private key never leaves your machine.", null, "Only the public key goes on the server.", "known_hosts stores servers' keys on the client."]],
 [null, ["sshd refuses keys in a world-writable file.", null, "755 isn't typical for this file, and stricter is better.", "With 000 even the owner can't read it."]],
 [null, ["That blocks root logins, but passwords still work for other users.", null, "Moving the port only reduces noise.", "UseDNS controls reverse DNS lookups."]],
 [null, ["scp copies everything every time.", null, "cp works locally only.", "ssh-copy-id installs your public key."]]
],
"hardening": [
 [null, ["Rebooting doesn't add a firewall rule for SSH.", null, "Disabling sshd locks you out.", "fail2ban complements the firewall but doesn't replace the rule."]],
 [null, ["A single control is a single point of failure.", null, "DPI is one possible layer, not the principle.", "Disk encryption is one layer."]],
 [null, ["SSH is already encrypted.", null, "Patching is done by the package manager.", "logrotate rotates logs."]],
 [null, [null, "id shows a user's IDs; id 0 isn't valid usage.", "/etc/group lists groups, not user UIDs.", "whoami has no -0 option."]]
],
"scripting": [
 [null, ["#bash is just a comment.", null, "!# is reversed and invalid.", "// isn't a shell comment."]],
 [null, ["1 is a generic error.", null, "Exit codes are 0-255; -1 wraps to 255.", "255 often means an error such as an SSH failure."]],
 [null, ["Every 30 minutes would be */30 * * * *.", null, "June 30th would be 0 0 30 6 *.", "6:30 PM daily would be 30 18 * * *."]],
 [null, ["Spaces make bash run NAME as a command.", null, "$ is only used when reading a variable.", "set NAME x sets positional parameters instead."]]
],
"linux-ec2": [
 [null, ["Root login over SSH is disabled.", "admin is the Debian AMI user.", null, "ubuntu is the Ubuntu AMI user."]],
 [null, ["AWS manages the hypervisor, not your guest OS.", null, "It isn't split equally.", "Someone must patch; on EC2, you."]],
 [null, ["Logins don't run user data.", null, "There's no hourly user data schedule.", "Stopping an instance doesn't run it."]],
 [null, ["Telnet is unencrypted and needs an open port.", null, "IMDS serves instance metadata, not shells.", "S3 is storage."]]
],
"containers": [
 [null, ["Namespaces isolate what a process can see.", null, "iptables controls network packets.", "umask sets default file permissions."]],
 [null, ["The pid namespace isolates process IDs.", null, "uts isolates the hostname.", "The user namespace maps user IDs."]],
 [null, ["That describes VMs.", null, "VMs run Linux all the time.", "Kernel sharing is a big difference."]],
 [null, ["Running as root increases the impact of a breakout.", null, "777 lets anyone modify app files.", "Secrets baked into images leak."]]
]
};

/* merge into the lessons (loaded after lessons, before app.js) */
(function (E) { (window.LESSONS || []).forEach(l => { const x = E[l.id]; if (!x || !l.quiz) return; x.forEach((e, i) => { const q = l.quiz[i]; if (!q || !e) return; if (e[0]) q.why = e[0]; if (e[1]) q.w = e[1]; }); }); })(window.EXPLAIN || {});
