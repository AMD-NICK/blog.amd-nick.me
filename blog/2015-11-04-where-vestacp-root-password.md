---
title: Найти и изменить root пароль VestaCP
date: '2015-11-04 12:15:00'
slug: where-vestacp-root-password
---

При чистой установке VestaCP на Debian-based или CentOS пароль будет храниться в следующем файле:

`cat /usr/local/vesta/conf/mysql.conf`

Найдите такую часть:

    USER='root'
    PASSWORD='ПАРОЛЬ БУДЕТ ЗДЕСЬ'

Для авторизации с паролем перейдите по подобному адресу
`http://server-ip/phpmyadmin`

У вас должна открыться панель PHPmyadmin. В ней и введите ваши данные
