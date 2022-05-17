---
title: Хостим приложения с динамическим IP
date: '2019-02-19 13:37:00'
slug: remote-access-for-dynamic-ip
image: https://s3.blog.amd-nick.me/2019/02/duckdns-banner.png
---

![](https://s3.blog.amd-nick.me/2019/02/duckdns-banner.png)

Проблема динамического IP в том, что для работы сайта или веб приложения нужно следить за тем, чтобы домен всегда указывал на актуальный адрес, иначе сайт будет недоступен.

Я столкнулся с этой проблемой, когда [настраивал доступ к Raspberry Pi по SSH](raspberry-remote-ssh).

<!--truncate-->

Решение лежит в регулярной актуализации IP, на который указывает домен, но большинство DNS провайдеров не предоставляют возможности управлять записями через API или это не практично в некоторых случаях

Бесплатный [сервис DuckDNS](https://www.duckdns.org/install.jsp) предоставляет поддомен и простейший API к нему, через который каждые 5 минут мы будем актуализировать IP

После авторизации создайте любой поддомен и обратите внимание на token, указанный сверху той же страницы. Вы можете указать этот поддомен в качестве [CNAME записи](https://yandex.ru/support/pdd/set-mail/cname.html) (зеркала) своего основного домена, если не хотите пользоваться выданным

![duckdns-free-dynamic-dns](https://s3.blog.amd-nick.me/2019/02/duckdns-free-dynamic-dns.png)

### Настройка

Полностью процесс [описан здесь](https://www.duckdns.org/install.jsp). Вкратце, что нужно сделать:

1. Логинимся на сервере по SSH
2. Создаем скрипт для обновления IP `mkdir ~/duckdns && cd ~/duckdns && touch duck.sh`
3. Заменив exampledomain и token, помещаем вот такую команду в свежесозданный файл: `echo url="https://www.duckdns.org/update?domains=exampledomain&token=a7c4d0ad-114e-40ef-ba1d-d217904a50f2" | curl -k -o ~/duckdns/duck.log -K -` (сделать это можно через echo 'command' \> duck.sh)
4. Делаем файл исполняемым через `chmod 700 duck.sh`
5. Заставляем выполняться каждые 5 мин, добавив в планировщик `crontab -e`
6. Вставляем туда `*/5 * * * * ~/duckdns/duck.sh >/dev/null 2>&1`
7. Запускаем планировщик `sudo service cron start`

### Проверяем

1. Выполняем `bash ~/duckdns/duck.sh`
2. Должны увидеть OK (KO, если ошибка)
3. Если видим KO, то убеждаемся, что в файле верно указали token и domains
4. Иначе открываем командную строку и пробуем ping _поддомен._ duckdns.org. Должен отобразиться IP сервера. Если так, то можем подключаться к SSH, используя поддомен вместо IP

Если вы используете CloudFlare, то можете применить [этот API метод](https://api.cloudflare.com/#dns-records-for-a-zone-update-dns-record) вместо использования DuckDNS.
