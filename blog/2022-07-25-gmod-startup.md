---
title: "Garry's Mod - Ускоряем загрузку сервера"
date: '2022-07-25 12:48'
slug: gmod-startup
tags: [garrysmod]
image: https://i.imgur.com/VHsA4WS.png
---

:::caution
Этот пост подойдет только тем, у кого сборка запускается на VDS/Dedicated сервере
:::

На сервере с `Intel(R) Core(TM) i9-9900K CPU @ 3.60GHz` и SSD моя сборка загружается в среднем за 31 сек. Больше всего времени загрузки сервера занимает mount всех аддонов из папки addons, которых сейчас там где-то 30 штук. **После изменений в 2 раза быстрее**

Для ускорения загрузки мы совместим все аддоны в одну папку. Чтобы не было бардака, нам нужно разделение на dev и production. Они должны быть на одном хосте рядом друг с другом. Ниже визуализация что мы сделаем

![](https://i.imgur.com/VHsA4WS.png)

:::info
На dev у нас все будет в человеческом виде, красиво рассортировано, а когда мы захотим выпустить обнову, то введем только одну команду и dev сервер автоматически "сбилдится" и переместится на production
:::

<!--truncate-->

## Зачем нам VDS

С VDS в вашем распоряжении практически второй компьютер, только без монитора. Это дешевле, чем хостинг и вы можете запустить на нем сколько нужно гмод серверов и делать любые автоматизации, подобно этим.

**[Так выглядит](2020-03-17-gmod-development.md) (в верхней части поста по ссылке) процесс разработки на запароленном Dev сервере**. Но в соседней папочке с dev сервером есть еще папочка production. Она такая же, как dev, но мы изменяем ее только тогда, когда хотим выпустить обнову для всех игроков, а не только для dev сервера. Для этого там удаляется папка addons и gamemodes, затем с dev копируется свежая.

![dev и prod сервер mc](https://i.imgur.com/Zb4RcIz.jpg)

Мы немножко вмешаемся в этот процесс (процесс деплоя dev на prod)

## Склейка аддонов в одну папку

Вот команды, которые и делают всю "магию". Я выделил их отдельно для наглядности. Сам скрипт деплоя находится еще ниже

```sh
# Путь к garrysmod папке production сервера
$PROD_DIR=/home/user/gmod/prod/garrysmod

# создаем временную пустую папку, куда будут собраны все аддоны
mkdir $PROD_DIR/superaddon

# склеиваем все аддоны в эту временную папку (30 аддонов станут одним)
cp -r $PROD_DIR/addons/**/* $PROD_DIR/superaddon/

# удаляем все аддоны из addons, ведь мы их уже склеили в superaddon
rm -r $PROD_DIR/addons/*

# перемещаем superaddon в addons. Теперь у нас там только 1 папка
mv -v $PROD_DIR/superaddon $PROD_DIR/addons/
```


## `deploy.sh`

`deploy.sh` это скрипт, который будет копировать аддоны и гейммод с dev на production сервер. После копирования он соберет все аддоны в одну папку, как описано выше

Сам скрипт можно поместить куда угодно. Он у меня в `/home/user/gmod/deploy.sh`


```sh
#!/bin/bash
MMDD=$(date +%m%d)
BASEPATH=$HOME'/gmod'

for serv in "prod"
do
        echo "Делаем бэкап $serv сервера"

        mv -v "$BASEPATH/$serv/garrysmod/addons"           "$BASEPATH/$serv/garrysmod/addons_$MMDD"
        mv -v "$BASEPATH/$serv/garrysmod/gamemodes/darkrp" "$BASEPATH/$serv/garrysmod/gamemodes/darkrp_$MMDD"

        echo "Копируем dev на $serv сервер"

        cp -r "$BASEPATH/dev/garrysmod/addons/"            "$BASEPATH/$serv/garrysmod/"
        cp -r "$BASEPATH/dev/garrysmod/gamemodes/darkrp"   "$BASEPATH/$serv/garrysmod/gamemodes"

        echo "Удаляем хвосты на $serv сервере" # из соображений безопасности

        rm -rv "$BASEPATH/$serv/garrysmod/addons/.vscode"
        rm -v  "$BASEPATH/$serv/garrysmod/addons/sftp-config.json"
        rm -rv "$BASEPATH/$serv/garrysmod/gamemodes/darkrp/.vscode"
        rm -v  "$BASEPATH/$serv/garrysmod/gamemodes/darkrp/sftp-config.json"

        echo "Склеиваем аддоны в superaddon" # датально описано выше

        mkdir $BASEPATH/$serv/garrysmod/superaddon
        cp -r $BASEPATH/$serv/garrysmod/addons/**/* $BASEPATH/$serv/garrysmod/superaddon/
        rm -r $BASEPATH/$serv/garrysmod/addons/*
        mv -v $BASEPATH/$serv/garrysmod/superaddon  $BASEPATH/$serv/garrysmod/addons/

        echo "$serv обновлен!"
done
```

## Демо процесса деплоя

Можно автоматизировать через GitHub Actions, чтобы вручную на сервере вообще не приходилось ничего вводить

![demo gif](https://i.imgur.com/8GtUmFH.gif)

## Что дальше?

Вы можете заниматься эффективной разработкой на dev сервере, как описано [здесь](2020-03-17-gmod-development.md), а когда сделаете все, что хотели для обновы, то выполните на хосте `sh deploy.sh`, чтобы перенести все на prod сервер.

Позже я напишу вторую часть поста про то, как значительно усложнить кражу ваших клиентских скриптов ворами. О публикации сообщу в чатике, который ниже.

- Вопросы можно задать в начем ТГ чатике: [@gmodev](https://t.me/gmodev).
- Предложить правки этого поста можно здесь: [GitHub](https://github.com/AMD-NICK/blog.amd-nick.me/tree/main/blog).

