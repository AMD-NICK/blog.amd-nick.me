---
layout: post
title: Настройка git для работы через ssh
date: '2021-11-02 10:37:00'
tags:
- notes
---

Вкратце: генерируем ключ, добавляем его на гитхаб, заставляем репозиторий использовать ключ вместо логин-токен

Зачем? Чтобы не приходилось постоянно вводить логин-токен или хранить его в открытом виде в .git-credentials (безопасность + простота)

### Генерируем ключ на машине, которая будет выполнять git команды

    ssh-keygen -t ed25519 -C "your_email@example.com" -f ~/.ssh/github

### Говорим хосту использовать наш ключ

Это нужно, чтобы не теребить ssh-agent и ssh-add. Так хост будет автоматически понимать какой ключ использовать.

Создаем или редактируем `~/.ssh/config`. Прописываем следующее:

    Host github.com
       HostName github.com
       IdentityFile ~/.ssh/github

Если `~/.ssh/config` не существовал, то может потребоваться ввести `chmod 600 ~/.ssh/config`.

### Сообщаем о нашем ключе GitHub'у

1. Смотрим сам ключ: `cat ~/.ssh/github.pub`, копируем его в буфер обмена
2. Открываем [https://github.com/settings/keys](https://github.com/settings/keys), добавляем туда скопированный ключ. Название не важно

### Заставляем репозиторий работать через ssh, а не логин-токен

Если раньше вы писали `git clone https://github.com/USER_NAME/REPO_NAME.git`, то теперь будет `git clone git@github.com:USER_NAME/REPO_NAME.git`

Разница наглядно:

    git clone git@github.com:USER_NAME/REPO_NAME.git
    git clone https://github.com/USER_NAME/REPO_NAME.git

# Может быть полезно:

- Вот тут я писал про SSH ключи в целом. Почему они на самом деле проще, чем пароли: [https://blog.amd-nick.me/ssh-keys/]( __GHOST_URL__ /ssh-keys/)
- Если вы на винде и используете Putty, Kitty, то это может стать хорошей заменой: [https://blog.amd-nick.me/xshell-alternative-for-putty/]( __GHOST_URL__ /xshell-alternative-for-putty/)

Ну и на главной странице сайта есть другая всячина: [https://blog.amd-nick.me]( __GHOST_URL__ /)

