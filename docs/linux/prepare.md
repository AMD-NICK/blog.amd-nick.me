# Подготовка хоста

Страница [часто](https://github.com/AMD-NICK/blog.amd-nick.me/commits/main/docs/linux/prepare.md) обновляется. Чаще всего использую Ubuntu 22.04 и 24.04.

## 🧢 База

```bash
apt update && apt -y upgrade

# Новый не root юзер (me)
adduser me
usermod -aG sudo me

# Установка docker (с репозитория)
# https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository
# Затем \/
groupadd docker
usermod -aG docker me

# Перенос данных через rsync со старого хоста
rsync -azP local-dir/ me@ip:/home/me/remote-dir
```

```bash
# info source: https://linuxize.com/post/how-to-set-or-change-timezone-in-linux/

# текущие настройки
timedatectl

# список зон
timedatectl list-timezones

# установка зоны
sudo timedatectl set-timezone Europe/Moscow
```

```shell
# ~/.bashrc

# Сохранение истории после каждой команды. Синхронизация истории между сессиями
PROMPT_COMMAND="history -a; history -n; $PROMPT_COMMAND"

# Предпочтение по редактору. Ctrl + X + E например
export EDITOR=micro
```

## ⌨️ tools

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
LAZYGIT_VERSION=$(curl -s "https://api.github.com/repos/jesseduffield/lazygit/releases/latest" | grep -Po '"tag_name": "v\K[^"]*') && echo $LAZYGIT_VERSION

curl -Lo lazygit.tar.gz "https://github.com/jesseduffield/lazygit/releases/latest/download/lazygit_${LAZYGIT_VERSION}_Linux_x86_64.tar.gz"

tar xf lazygit.tar.gz lazygit

sudo install lazygit /usr/local/bin
```

### lazydocker

[github](https://github.com/jesseduffield/lazydocker)

Аналогичный инструмент для Docker. Используется намного реже

<details>
  <summary>Демка gif</summary>

![lazydocker cui demo](https://github.com/jesseduffield/lazydocker/blob/master/docs/resources/demo3.gif?raw=true)
</details>

```bash
curl https://raw.githubusercontent.com/jesseduffield/lazydocker/master/scripts/install_update_linux.sh | bash

sudo install $HOME/.local/bin/lazydocker /usr/bin
```

### gdu

[github](https://github.com/dundee/gdu)

Поиск и чистка диска. Пользуюсь постоянно. По умолчанию ищет большие файлы в текущей папке, но я часто делаю `gdu /` для поиска по всему диску

<details>
  <summary>Демка jpg</summary>

![demo](https://camo.githubusercontent.com/d8fa7d2f7bdd10dce45a81c2accf26d597b300b82e01b97a1288ff2f1fe06c57/68747470733a2f2f61736369696e656d612e6f72672f612f3338323733382e737667)
</details>

```bash
# curl
curl -L https://github.com/dundee/gdu/releases/latest/download/gdu_linux_amd64.tgz | tar xz
chmod +x gdu_linux_amd64
mv gdu_linux_amd64 /usr/bin/gdu

# docker
docker run --rm --init --interactive --tty --privileged --volume /:/mnt/root ghcr.io/dundee/gdu /mnt/root
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

sudo install micro /usr/bin
```

### lsd

[github](https://github.com/Peltoche/lsd/releases) | [ufeed](https://t.me/uFeed/133)

`alias ls=lsd` с иконками

<details>
  <summary>Демка png</summary>

![lsd screenshot](https://file.def.pm/535QK48i.jpg)
</details>

```bash
apt install lsd

# Если верхнее не сработало, то ищем последнюю версию тут:
# https://github.com/Peltoche/lsd/releases

# Потом примерно так:
curl -L -o lsd.deb https://github.com/lsd-rs/lsd/releases/download/v1.1.5/lsd-musl_1.1.5_amd64.deb && sudo dpkg -i lsd.deb && rm lsd.deb
```

#### Настройки lsd:

Если нет иконок: [клик](https://github.com/Peltoche/lsd/issues/199#issuecomment-494218334)

Настройки
```bash
mkdir -p ~/.config/lsd

echo "
sorting:
   dir-grouping: first

date: +%F %R
" >> ~/.config/lsd/config.yaml
```

Алиасы в том числе для lsd перечислены ниже в отдельном блоке.

### fzf

Поиск по командам в bash (`ctrl + r`) не имеет встроенного "fuzzy" поиска. fzf добавляет его

Установка:

```bash
git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf
~/.fzf/install
```

Настройка кейбиндов

```bash
# выполнить
nano ~/.fzf.bash

# добавить
# Когда выбрали команду, `C-e` вставит ее для редактирования вместо выполнения
FZF_CTRL_R_EDIT_KEY=ctrl-e
FZF_CTRL_R_EXEC_KEY=enter
source ~/.fzf-plugins/history-exec.bash

# применяем настройки
source ~/.bashrc
```

Ctrl + R активирует удобный поиск. Например, для `lazydocker` достаточно ввести `lzdr` > enter

### clifm (cli file manager)

Заморочился с установкой на Ubuntu 18.04 (на других ОС все было норм)

<details>
  <summary>Демка gif</summary>

![demo](https://camo.githubusercontent.com/d721d2ad31d0a2fd8f8ae9b9df7387d22e4802f700887e7ddba0869b31666441/68747470733a2f2f692e706f7374696d672e63632f3158534b425268382f73756767657374696f6e732e676966)
</details>

```bash
# самая проклятая строка, без которой не будет билдится clifm
sudo apt update && sudo apt install -y build-essential libreadline-dev libcap-dev libacl1-dev libmagic-dev

mkdir tmp && cd tmp
git clone https://github.com/leo-arch/clifm.git && cd clifm
make install
```

## 🪞 Алиасы

```bash
echo "
alias ls='lsd'
alias l='ls -l'
alias la='ls -a'
alias lt='ls --tree'

alias ..='cd ..'
alias ...='cd ../..'
alias ....='cd ../../..'
alias .....='cd ../../../..'
alias ~='cd ~'
alias -- -='cd -'

alias dps='docker ps --format \"{{.ID}}\\t{{.Status}}\\t{{.Names}}\"'
alias dc='docker compose'

alias sls='screen -ls'
alias sxu='screen -xU'

alias ssc='micro ~/.ssh/config'
alias lg=lazygit
alias ld=lazydocker

# Fuzzy cd to directory. dir= needs to not cd home dir when no selection made
alias cdf='dir=$(find . -type d -not -path \"*/\.*\" | fzf --preview \"ls -l {}\") && cd $dir'

# Create a new directory and enter it
function mkd() {
    mkdir -p \"$@\" && cd \"$@\"
}

# Применить изменения без перелогина:
# source ~/.bash_aliases
" >> ~/.bash_aliases
```

```bash
# парочка личных экстра алиасов, которые под каждую машину свои
nload='nload -t 1000 ens3'
lr='luarocks --lua-dir=$(brew --prefix)/opt/lua@5.3
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

