---
title: Взлом базы данных KeePass
date: '2018-08-12 13:37:00'
slug: crack-keepass-using-hashcat
tags:
- notes
---

Нашел на компе старую БД от [KeePass](keepass-free-password-manager), от которой уже сто лет как забыл пароль. Немного гугла + вычислительных мощностей и наслаждение ностальгией не оставило себя ждать

# Используем

- keepass2john.py для извлечения хэша с имеющейся БД
- hashcat для взлома полученного хэша
 ![hashcat_keepass](https://s3.blog.amd-nick.me/2018/08/hashcat_keepass.png)

# Взлом

```sh
# Создаем рабочую директорию и переносим в нее БД
$ mkdir crack_keepass
$ cd crack_keepass
$ cp path/to/database.kdbx .

# Скачиваем скрипт для извлечения хэша
$ curl -O https://gist.githubusercontent.com/HarmJ0y/116fa1b559372804877e604d7d367bbc/raw/keepass2john.py

# Скачиваем и устанавливаем hashcat
$ git clone https://github.com/hashcat/hashcat.git
$ cd hashcat
$ git submodule update --init
$ make


$ cd ..
# Тут копируем хэш после первого двоеточия и выносим в отдельный файл, например, my.hash
$ python keepass2john.py passwords.kdbx
$ echo "hash" > my.hash
```

![keepass2john](https://s3.blog.amd-nick.me/2018/08/keepass2john.png)


Перебор по словарю:
`./hashcat/hashcat -a 0 -m 13400 -w 2 passwords.hash my.dict`
`-a 0. ` - режим перебора по словарю
`-w 2. ` - щадящий (Default) профиль перебора (Есть еще Low, High, Nighmare)
`-m 13400` - режим перебора паролей KeePass

Брут пароля из 10 цифр:
`./hashcat/hashcat -a 3 -m 13400 -w 2 passwords.hash ?d?d?d?d?d?d?d?d?d`
?d - один символ от 0 до 9. Другие примеры в `./hashcat/hashcat --help`

# Ссылки

- [О взломе KeePass](https://defcon.ru/penetration-testing/3353/)
- [Структура БД KeePass](https://habr.com/post/346820/)
