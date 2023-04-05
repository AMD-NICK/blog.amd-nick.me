# Подготовка Linux хоста

Чаще всего использую Ubuntu 20.04 и 22.04

## ⌨️ tools

### lazygit

[github](https://github.com/jesseduffield/lazygit)

Удобный CUI для управления git репозиторием. Пишешь lazygit в папке репозитория и визуально делаешь то, что нужно

<details>
  <summary>Демка gif</summary>

![lazygit cui demo](https://github.com/jesseduffield/lazygit/blob/assets/staging.gif?raw=true)
</details>

```bash
# может сработать, но у меня ставило устаревшую версию (не критично, но все же)
apt install lazygit

# иначе
LAZYGIT_VERSION=$(curl -s "https://api.github.com/repos/jesseduffield/lazygit/releases/latest" | grep -Po '"tag_name": "v\K[^"]*')

curl -Lo lazygit.tar.gz "https://github.com/jesseduffield/lazygit/releases/latest/download/lazygit_${LAZYGIT_VERSION}_Linux_x86_64.tar.gz"

tar xf lazygit.tar.gz lazygit

sudo install lazygit /usr/local/bin
```

### lazydocker

[github](https://github.com/jesseduffield/lazydocker)

Аналогичный инструмент для Docker. Используется намного реже

<details>
  <summary>Демка png</summary>

![lazydocker cui demo](https://github.com/jesseduffield/lazydocker/blob/master/docs/resources/demo3.gif?raw=true)
</details>

```bash
curl https://raw.githubusercontent.com/jesseduffield/lazydocker/master/scripts/install_update_linux.sh | bash

mv $HOME/.local/bin/lazydocker /usr/bin
```

### micro

[github](https://github.com/zyedidia/micro#quick-install-script) | [ufeed](https://t.me/uFeed/130)

**nano** на максималках. Практически полноценный, привычный редактор, но в терминале. Можно легко ставить в docker контейнерах

<details>
  <summary>Демка png</summary>

![micro screenshot demo](https://github.com/zyedidia/micro/blob/master/assets/micro-solarized.png?raw=true)
</details>

```bash
curl https://getmic.ro | bash

mv micro /usr/bin
```

### lsd

[github](https://github.com/Peltoche/lsd/releases) | [ufeed](https://t.me/uFeed/133)

`alias ls=lsd` с иконками

<details>
  <summary>Демка png</summary>

![lsd screenshot](https://i.imgur.com/NrftbGx.png)
</details>

```bash
apt install lsd

# Если верхнее не сработало, то ищем последнюю версию тут:
# https://github.com/Peltoche/lsd/releases

# Потом примерно так:
curl -o lsd.deb -L https://github.com/Peltoche/lsd/releases/download/0.23.0/lsd-musl_0.23.0_amd64.deb && dpkg -i lsd.deb && rm lsd.deb
```

#### Настройки lsd:

Если нет иконок: [клик](https://github.com/Peltoche/lsd/issues/199#issuecomment-494218334)

Алиасы:
```bash
echo "
alias ls='lsd'
alias l='ls -l'
alias la='ls -a'
alias lt='ls --tree'

alias dps='docker ps --format \"{{.ID}}\\t{{.Status}}\\t{{.Names}}\"'
alias dc='docker-compose'

alias sls='screen -ls'
alias sxu='screen -xU'
" >> ~/.bash_aliases
```

Настройки
```bash
mkdir -p ~/.config/lsd

echo "
sorting:
   dir-grouping: first

date: +%F %R
" >> ~/.config/lsd/config.yaml
```

### docker + docker-compose

```bash
# Install docker
curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh

# Install docker-compose
curl -Lo /usr/local/bin/docker-compose "https://github.com/docker/compose/releases/latest/download/docker-compose-linux-x86_64"
chmod +x /usr/local/bin/docker-compose

# Create docker user
adduser docker_user
usermod -aG docker docker_user
#usermod -aG sudo docker_user
```

### tailscale

VPN сеть

```bash
# install tailscale
curl -fsSL https://tailscale.com/install.sh | sh

# enable IP forwarding
echo 'net.ipv4.ip_forward = 1' | sudo tee -a /etc/sysctl.conf
echo 'net.ipv6.conf.all.forwarding = 1' | sudo tee -a /etc/sysctl.conf
sudo sysctl -p /etc/sysctl.conf

# start tailscale as exit node
sudo tailscale up --advertise-exit-node
```

### fzf

Поиск по командам в bash (`ctrl + r`) не имеет встроенного "fuzzy"(?) поиска. fzf добавляет его

Установка:

```bash
git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf
~/.fzf/install
git clone https://github.com/4z3/fzf-plugins ~/.fzf-plugins
```

Настройка кейбиндов

```bash
[ -f ~/.fzf.bash ] && source ~/.fzf.bash

# Когда выбрали команду, `C-e` вставит ее для редактирования вместо выполнения
FZF_CTRL_R_EDIT_KEY=ctrl-e
FZF_CTRL_R_EXEC_KEY=enter
source ~/.fzf-plugins/history-exec.bash

# применяем настройки
source ~/.bashrc
```

Ctrl + R активирует удобный поиск. Например, для lazydocker достаточно ввести lzdr > enter

### nnn (файловый менеджер)

Плагины, иконки, минимализм. Как замена Midnight Commander. Привыкаю

```bash
# Установка самого nnn с красивыми иконками
NNN_VERSION=$(curl -s "https://api.github.com/repos/jarun/nnn/releases/latest" | grep -Po '"tag_name": "v\K[^"]*')
curl -Ls "https://github.com/jarun/nnn/releases/download/v$NNN_VERSION/nnn-nerd-static-$NNN_VERSION.x86_64.tar.gz" | tar xz &
sudo mv nnn-nerd-static /usr/bin/nnn

# Установка плагинов (не включаются сами). По умолчанию ставит в $HOME/.config/nnn/plugins
sh -c "$(curl -Ls https://raw.githubusercontent.com/jarun/nnn/master/plugins/getplugs)"
```

Также надо настроить. Добавлять куда-нибудь в `.bashrc`

```bash
export NNN_OPENER=$HOME/.config/nnn/plugins/nuke
# тут надо самому узнать и понять что вам нужно, а что нет. Включаются потом по ; > кнопка
export NNN_PLUG='f:finder;p:preview-tui;v:imgview'
```

[Вот это](https://github.com/jarun/nnn/blob/master/misc/quitcd/quitcd.bash_zsh) очень рекомендую добавить тоже в .bashrc. Странное поведение, но без этого по умолчанию при выходе оно не входит в папку, где ты закрыл nnn. **Если добавили, то теперь запускайте nnn через `n`, а не nnn**.

## 🪞 Алиасы

```bash
dc=docker-compose
ssc='micro ~/.ssh/config'
lg=lazygit
ld=lazydocker

# личное
lr='luarocks --lua-dir=$(brew --prefix)/opt/lua@5.3'
```

## 🔑 SSH ключи

### Для GitHub

[Пост в блоге](/git-ssh-setup)

```bash
# На хосте, где будет юзаться Git
ssh-keygen -t ed25519 -f ~/.ssh/github -C "your_email@example.com"

mkdir -p ~/.ssh ; echo "
Host github.com
    HostName github.com
    IdentityFile ~/.ssh/github
" >> ~/.ssh/config

chmod 600 ~/.ssh/config

# Копируем выхлоп
cat ~/.ssh/github.pub

# Вставляем тут:
# https://github.com/settings/keys
```

### Для хоста

[ufeed](https://t.me/uFeed/65) | [Пост в блоге](/ssh-keys)

```bash
# Если ключ не создан
ssh-keygen -o -a 100 -t ed25519 -f ~/.ssh/keyname -C "any comment"

ssh-copy-id -i ~/.ssh/keyname.pub user@host

# личная заметка: /AppData/ssh_keys/uni.pub
```

## Прочие настройки

- [Timezone](https://linuxize.com/post/how-to-set-or-change-timezone-in-linux/)

```bash
# текущие настройки
timedatectl

# список зон
timedatectl list-timezones

# установка зоны
sudo timedatectl set-timezone Europe/Moscow
```
