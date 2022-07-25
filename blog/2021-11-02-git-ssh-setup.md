---
title: Настройка git для работы через ssh
date: '2021-11-02 13:37:00'
slug: git-ssh-setup
image: https://s3.blog.amd-nick.me/2021/11/git-ssh-setup.jpg
tags: [git, github, ssh]
---

![](https://s3.blog.amd-nick.me/2021/11/git-ssh-setup.jpg)

Вкратце: генерируем ключ, добавляем его на гитхаб, заставляем репозиторий использовать ключ вместо логин-токен

Зачем? Чтобы не приходилось постоянно вводить логин-токен или хранить его в открытом виде в .git-credentials (безопасность + простота)

<!--truncate-->

### Генерируем ключ на машине, которая будет выполнять git команды

```bash
$ ssh-keygen -t ed25519 -C "your_email@example.com" -f ~/.ssh/github
```

### Говорим хосту использовать наш ключ

Это нужно, чтобы не теребить ssh-agent и ssh-add. Так хост будет автоматически понимать какой ключ использовать.

Создаем или редактируем `~/.ssh/config`. Прописываем следующее:

```
Host github.com
	HostName github.com
	IdentityFile ~/.ssh/github
```

Если `~/.ssh/config` не существовал, то может потребоваться ввести `chmod 600 ~/.ssh/config`.

### Сообщаем о нашем ключе GitHub'у

1. Смотрим сам ключ: `cat ~/.ssh/github.pub`, копируем его в буфер обмена
2. Открываем [https://github.com/settings/keys](https://github.com/settings/keys), добавляем туда скопированный ключ. Название не важно

### Заставляем репозиторий работать через ssh, а не логин-токен

Если раньше вы писали `git clone https://github.com/USER_NAME/REPO_NAME.git`, то теперь будет `git clone git@github.com:USER_NAME/REPO_NAME.git`

Разница наглядно:

```bash
$ git clone git@github.com:USER_NAME/REPO_NAME.git
$ git clone https://github.com/USER_NAME/REPO_NAME.git
```

# Может быть полезно:

- [Вот тут я писал про SSH ключи в целом](2021-10-05-ssh-keys.md). Почему они на самом деле проще, чем пароли
- Если вы на винде и используете Putty, Kitty, то [это может стать](2020-03-03-xshell-alternative-for-putty.md) хорошей заменой

Ну и на [главной странице](/) есть другая всячина
