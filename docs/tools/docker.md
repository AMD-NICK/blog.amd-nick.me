# Docker

![](https://i.imgur.com/WpRwAhO.png)

## 🤔 Зачем он лично мне

**Docker позволяет без специальных настроек системы установить и настроить почти любой нужный сервис одной командой**. По сути команда создает "виртуалку", в которой уже установлен нужный софт. Соответственно, и обновление сервиса это тоже просто "скачать новый образ и запустить". Если что-то из установленного больше не нужно – это "что-то" так же удаляется одной командой, **не оставляя мусора**. При этом на самом хосте нужен только docker и больше никаких дополнительных зависимостей.

![lazydocker](https://i.imgur.com/AOrJG1P.png)


## 🪄 Интересные инструменты

- micro - удобный консольный текстовый редактор, который удобно закидывать внутрь docker контейнера (упоминался в блоге)
- [lazydocker](https://github.com/jesseduffield/lazydocker) – UI для Docker. Использую сам, упоминался в блоге
- [dry](https://github.com/moncho/dry) – интересная альтернатива для 👆
- [portainer](https://github.com/portainer/portainer) – браузерный UI для управления всем Docker
- [composerize](https://github.com/magicmark/composerize) – конвертировать docker run команду в docker-compose формат. [Онлайн демо](https://www.composerize.com).
- [supdock](https://github.com/segersniels/supdock) – `alias docker=supdock` позволяет удобнее выполнять некоторые docker команды

## ⌨️ Полезные команды

```bash
# Смотреть логи всех сервисов через браузер
# Использует https://github.com/amir20/dozzle
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock -p 8888:8080 amir20/dozzle:latest

# получить лог и следить за обновлением
docker logs -fn 100 CONTAINER_NAME
docker compose logs -f --tail 100

# вход в bash/sh контейнера (сервиса)
# чтобы посмотреть файлы, выполнить redis-cli, импортировать БД и т.д.
docker exec -it CONTAINER_NAME sh
docker compose exec traefik sh

# инфа контейнера
# - узнать путь к volume контейнера (когда надо бекапнуть)
# - узнать ip контейнера. Полезно, когда хочешь с например REDIS GUI на своем компе подключиться к REDIS в контейнере на сервере (port forwarding)
# - узнать причину, почему контейнер unhealthy
docker inspect CONTAINER_NAME
# для IP искать .NetworkSettings.Networks.*.IPAddress
```

## 💡 Советы

### Удобное создание Dockerfile

**Когда нужно сделать Dockerfile**, то делаю контейнер с базового image и внутри ввожу команды одна за одной, пока не получу желаемый результат. В процессе все эти команды выписываю в текстовый файл.

`docker run --rm -it base_image_name sh`

Если где-то зафейлился, то пишу exit и ввожу команду заново. Контейнер вайпается

### Использование алиасов

[Здесь](https://gist.github.com/jgrodziski/9ed4a17709baad10dbcd4530b60dfcbb) можно найти кучу полезных алиасов, которые могут пригодиться.

Как минимум, я рекомендую сделать `alias dc='docker compose'` и посмотреть `dip` из ссылки выше

Еще я сделал свой алиас `dps`, который показывает компактный docker ps без всего лишнего. О нем написал в [подготовке Lunux хоста](../linux/prepare.md)

## 🧱 Юзаю/юзал сервисы

Список неполный. Просто каждому свое

- traefik – альтернатива nginx для контейнеров. Сам делает SSL сертификаты и после первой настройки очень легко подключать новые сервисы не перезагружая traefik
- [watchtower](https://github.com/containrrr/watchtower) – автообновление контейнера, когда обновился image
- [cloudflare-ddns](https://hub.docker.com/r/oznu/cloudflare-ddns/) – обновляет IP в CF. Прикручиваю к web сервисам, чтобы при переносе на новый хост не нужно было лезть в CF для обновления IP
- [telegram-bot-api](https://hub.docker.com/r/aiogram/telegram-bot-api) для моего [@video_screenshoter_bot](https://t.me/video_screenshoter_bot) (бот присылает скрины участков видео). Скидываешь боту гору порнушки с каналов, а он тебе присылает скрины и ты решаешь годнота или нет 👍. Без сервиса бот упирался в лимит размера файла
- ispy agent – видеонаблюдение. `Ctrl + K`, писал о нем
- ghost cms, pritunl vpn, outline vpn, mariadb, redis, laradock, luarocks, openresty...

### Быстро развернуть веб файловый менеджер

[tinyfilemanager](https://github.com/prasathmani/tinyfilemanager) – запустил и работаешь. `admin:admin@123`. Не открывает .mkv видео

```bash
# будет доступен по порту 12345
docker run -d -v $PWD:/var/www/html/data -p 12345:80 tinyfilemanager/tinyfilemanager:master
```

[filestash](https://github.com/mickael-kerjean/filestash) – вроде `admin:admin`, нужно кликнуть Local для доступа к локальной файловой системе. Даже открывает mkv вроде

```bash
docker run -d -v $PWD:/var/www/html/data -p 12345:8334 machines/filestash
```

Еще есть [filebrowser](https://github.com/filebrowser/filebrowser), самый популярный так то. Не помню пробовал ли

## 💭 Мысли вслух, не придумал раздел

У Docker есть возможность настройки **healthcheck** проверок для контейнеров. Я до этого не работал с ним, потому что не понимал зачем оно, если есть просто `restart: rule` настройка, которая ребутит упавший контейнер. Сейчас осознал, что эта штука не всегда понимает, что контейнер RIP и может быть полезна в куче случаев:

- БД поймала лимит подключений и вроде работает, но по факту не функциональна.
- ТГ бот вроде и не крашнулся, но случился баг и он "завис".
- Сервис сожрал дофига ОЗУ и проще назвать его unhealthy чем исправлять чужой код.

Тут настречу и приходит хелсчек. Он может либо просто отмечать контейнер "нездоровым" в docker ps либо сразу рестартить его, если указать `--restart`.

Почитать еще: [клик](https://dotsandbrackets.com/docker-health-check-ru/)

## 📒 Почитать

- [Awesome docker](https://github.com/veggiemonk/awesome-docker) – список кучи всего связанного с Docker
- [Шпаргалки по Docker](https://github.com/wsargent/docker-cheat-sheet)
