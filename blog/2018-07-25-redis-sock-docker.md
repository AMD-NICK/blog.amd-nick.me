---
title: Как вытащить redis.sock с Docker
date: '2018-07-25 16:25:00'
slug: redis-sock-docker
tags: [docker, redis]
---

Для одной задачи мне потребовалось подключиться к Redis внутри контейнера с хоста напрямую через `redis.sock`

В redis репозитории docker'a такой информации нет, а на сайтах устаревшие или нерабочие способы.

<!--truncate-->

## Вкратце

1. `wget http://download.redis.io/redis-stable/redis.conf`
2. Ищем, раскомментируем и заменяем `unixsocket` и `unixsocketperm` на

    unixsocket /data/redis.sock
    unixsocketperm 777

3. `docker run -d -v $PWD:/data redis redis-server /data/redis.conf`

redis.sock появится после запуска контейнера

## Что мы сделали

1. Заставили Redis использовать unixsocket и поместить его в `/data` внутри контейнера
2. Пробросили текущую директорию хоста в `/data` в контейнере. Там оказался `redis.conf`
3. Запустили `redis-server` указав ему свой кастомный конфиг, который мы пробросили в контейнер
4. Redis увидел в нем, что нужно поместить сокет в /data, что и сделал
5. Поскольку эта директория общая для двух систем, мы увидели redis.sock на хосте
