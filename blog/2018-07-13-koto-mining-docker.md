---
title: CPU Майнинг KOTO через Docker
date: '2018-07-13 21:41:00'
slug: koto-mining-docker
tags: [docker, finances, mining, crypto]
---

## UPD 2023.12.15

Напиши мне в лс, если это читаешь. Мне очень интересно, кто в 2023 году сюда попал, а главное – КАК?

---

Ниже заметки, касательно KOTO и `yescrypt`, но используя `cpuminer-multi` майнятся и другие монеты

![yescrypt-cpu-mining](https://s3.blog.amd-nick.me/2018/07/yescrypt-cpu-mining.png)

## Установка с Docker

`docker run --rm defaced/cpuminer-multi --algo yescrypt --url stratum+tcp://koto.litepool.ru:3032 --user k1FQS7Q2XxaWWLjLdFXFJfG7cQq74mWsZph`
Можно заменить адрес пула и кошелька

## Установка без Docker

Требуется Debian based OS\*

Установка зависимостей
`sudo apt install git build-essential libcurl4-openssl-dev autotools-dev automake`

Скачиваем майнер
`git clone https://github.com/KotoDevelopers/cpuminer-yescrypt.git koto-miner ; cd koto-miner`

Устанавливаем
`./autogen.sh`
`./configure`
`make`

Запускаем (В -u кошелек)
`./minerd -a yescrypt -o stratum+tcp://koto.litepool.ru:3032 -u k1FQS7Q2XxaWWLjLdFXFJfG7cQq74mWsZph`

## Статистика

Наблюдать за своими воркерами можно по ссылке:
[http://koto.litepool.ru:8080/workers/k1FQS7Q2XxaWWLjLdFXFJfG7cQq74mWsZph](http://koto.litepool.ru:8080/workers/k1FQS7Q2XxaWWLjLdFXFJfG7cQq74mWsZph)
Нужно только заменить адрес кошелька на свой.

![koto-litepool-stats](https://s3.blog.amd-nick.me/2018/07/koto-litepool-stats.png)

Если есть несколько воркеров (aka rigs), то его имя можно указать через точку после адреса при запуске майнера: `--user ADDRESS.rigname`
