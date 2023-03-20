# SSH

- Использую [mosh](/mosh) для "вечных" SSH подключений, которые держатся даже после спящего режима и смены WiFi сети
- [Hyper](../macos/apps/hyper.md) в качестве терминала. [Warp](https://www.warp.dev) выглядит крутой альтенативой, но почему-то не работает с mosh
- [Tailscale](https://tailscale.com/kb/1193/tailscale-ssh/) для SSH подключений без ввода пароля к любому серверу из Tailscale сети. Автоматически работает и с SFTP клиентами, вроде CyberDuck, а также удобно подключаться с iPhone через iSH по `ssh anyuser@hostname_in_tailnet`
