# Frigate

![](https://file.def.pm/re9z66sO.jpg)

<details>
<summary>Старый вид интерфейса Frigate</summary>

![](https://file.def.pm/Ww8eI8cN.png)

</details>

Frigate это NVR. Позволяет подключить RTSP или HTTP камеры и 24/7 анализировать с них видео, в том числе записывать **по обнаружению объектов** (человек, машина и тд). Подобен до [iSpy](./ispy.md), но iSpy, хоть и мощнее, но начал выдавать в консоль слишком много ошибок и более сложен в поддержании конфигурации после обновлений.

## Нравится:

Сравниваю с iSpy NVR

- Качественный и быстрый детектор объектов. Субъективно намного лучше, чем iSpy, даже с деф настройками.
- [Конфиг](https://docs.frigate.video/guides/getting_started) в одном файле. Легко переносить и редактировать даже с телефона. Удобнее работать сразу с группой камер. Настроить можно через веб панель или сам файл.
- Есть опция мониторинга диска. Что если удален файл с диска, то удаляется запись в БД Frigate. Наверное, удобно для всяких медиа серверов.
- Мало мусорных (ненужных) настроек, которые для iSpy были обязательными
- Намного лучше документация, включая советы по настройках самих КАМЕР
- Кажется, менее требовательный по CPU
- Есть удобные дебаг тулы для лучшей настройки детекций, масок, обнаружений
- Можно докупить, например [Google Coral USB Accelerator](https://coral.ai/products/accelerator/) и отдать ему AI вычисления. Frigate готов к этому
- Удобный API с большим функционалом. Можно сделать практически любую автоматизацию

## Не нравится

- Нет возможности создать RTMP поток (пушить в Telegram, YouTube, Twitch)
- Нет встроенных автоматизаций, например, отправки сообщения, когда кто-то обнаружен

## Frigate + Traefik + OAuth

Если кому-то нужно – напишите мне ко контактам, распишу

<!-- 1. создать домен
2. создать гугл проект для oauth
3. создать отдельный сервис forward-auth
4. включить forward auth для основного -->

Ссылки на изученные ресурсы:

- https://daquinoaldo.medium.com/traefik-docker-oauth-a-free-reverse-proxy-with-tsl-and-google-oauth2-da9aa0df96cc
- https://www.smarthomebeginner.com/google-oauth-with-traefik-2-docker/
- https://geek-cookbook.funkypenguin.co.nz/docker-swarm/traefik-forward-auth/google/

## Motion tuner заметки:

Тут доки: https://docs.frigate.video/configuration/motion_detection/

- Идеальной настройки не будет. В ветренную погоду будет больше нагрузка на проц и ничего не поделаешь.

### Threshhold

Чувствительность. Насколько сильно должен поменяться цвет пикселей, чтобы считаться движением. Меньшее значение – больше шанс определить чела в красной рубашке на фоне красной машине, но больше срабатываний.

### Contour area

Двигать, пока квадратики не станут по размеру, как минимально желаемый для обнаружения объект. Меньше значение – меньше квадратики
