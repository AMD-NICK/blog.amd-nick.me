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
# может сработать
apt install lazygit

# иначе
LAZYGIT_VERSION=$(curl -s "https://api.github.com/repos/jesseduffield/lazygit/releases/latest" | grep -Po '"tag_name": "v\K[0-35.]+')

curl -Lo lazygit.tar.gz "https://github.com/jesseduffield/lazygit/releases/latest/download/lazygit_${LAZYGIT_VERSION}_Linux_x86_64.tar.gz"

sudo tar xf lazygit.tar.gz -C /usr/bin lazygit
```

### lazydocker

[github](https://github.com/jesseduffield/lazydocker)

Аналогичный инструмент для Docker. Используется намного реже

<details>
  <summary>Демка png</summary>

![lazydocker cui demo](https://github.com/jesseduffield/lazydocker/blob/master/docs/resources/demo3.gif?raw=true)
</details>

```bash
DIR=/usr/bin

curl https://raw.githubusercontent.com/jesseduffield/lazydocker/master/scripts/install_update_linux.sh | bash
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
curl -oL lsd.deb https://github.com/Peltoche/lsd/releases/download/0.23.0/lsd-musl_0.23.0_amd64.deb && dpkg -i lsd.deb && rm lsd.deb
```

#### Настройки lsd:

Если нет иконок: [клик](https://github.com/Peltoche/lsd/issues/199#issuecomment-494218334)

Алиасы:
```bash
echo "
alias ls='lsd'
alias l='ls -l'
alias la='ls -a'
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
