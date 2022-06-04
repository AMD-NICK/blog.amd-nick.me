# Хостинг и администрирование

gmod server однопоточный и очень прожорливый. При выборе хостера старайтесь выбирать сервер с процессором, который повыше в [этом списке](https://www.cpubenchmark.net/singleThread.html). Выбор хостера: [клик](https://forum.gm-donate.ru/t/posovetujte-hosting/832/). ArtPlanet и MyArena для меня были неплохими вариантами. **Использую VDS**

Мой скрипт запуска сервера. Подробнее о [хостинге серверов](https://wiki.facepunch.com/gmod/Downloading_a_Dedicated_Server)

```sh
#/bin/bash

PORT='12345'
PLAYERS='60'
TICKRATE='16'
WORKSHOP='123456'
MAP='rp_downtown_tits_v2' # 'rp_bloc42_zarp' # 'rp_previlmelon' #rp_world_kdg

#-nocrashdialog
./srcds_run -port $PORT +maxplayers $PLAYERS -tickrate $TICKRATE -game garrysmod -console -condebug -insecure +host_workshop_collection $WORKSHOP +map $MAP # -allowlocalhttp # -autoupdate

```

Сервер запускаю внутри [GNU screen](https://linuxize.com/post/how-to-use-linux-screen/), чтобы можно было выйти из терминала и сервер не упал

## Бекап

Для бекапа не нужно сохранять всю garrysmod папку. Достаточно нескольких папок и файлов

- sv.db
- addons/
- cfg/ > autoexec.cfg, mount.cfg, server.cfg
- data/
- gamemodes/ > только кастом гейммод, например darkrp
- lua/bin/ (если папка есть и в ней .dll)
- console.log при желании

## Ссылки

- [Автодонат](https://vk.com/gmod.donate) автоматический прием донатов
