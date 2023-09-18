---
title: OpenVPN сервер через Docker
date: '2018-07-15 13:37:00'
slug: docker-openvpn-server
tags:
- note
- docker
---

[Здесь](https://habr.com/post/354632/) написано о запуске через `docker compose`. Я пишу об установке в качестве сервиса systemd

Если сервис "упадет" (Будь то убийство процесса или краш), он перезапустится через 10 секунд

# Создаем и запускаем сервис OpenVPN

1.

Создаем volume с названием ovpn-data-NAME, где NAME - название контейнера, которое во всех последующих действиях должно быть одинаковым

    OVPN_DATA="ovpn-data-example"
    docker volume create --name $OVPN_DATA

Здесь название это `example`. Дальше оно и будет использоваться

2.

Генерируем данные (Замените HOST\_OR\_IP на адрес сервера)
При вводе 2 команды нужно будет дважды ввести пароль, который стоит запомнить. Он еще потребуется при завершении выполнения команды. Название сертификата можно ввести любое или просто `.`

    docker run --rm -v $OVPN_DATA:/etc/openvpn kylemanna/openvpn ovpn_genconfig -u udp://HOST_OR_IP
    docker run --rm -v $OVPN_DATA:/etc/openvpn -it kylemanna/openvpn ovpn_initpki

3.

Скачиваем [docker-openvpn@.service](https://raw.githubusercontent.com/kylemanna/docker-openvpn/master/init/docker-openvpn%40.service) в `/etc/systemd/system`

    curl -L https://raw.githubusercontent.com/kylemanna/docker-openvpn/master/init/docker-openvpn%40.service | sudo tee /etc/systemd/system/docker-openvpn@.service

4.

Запускаем:

    systemctl enable --now docker-openvpn@example.service

**Статус сервиса** : `systemctl status docker-openvpn@example.service`
**Лог сервиса** : `journalctl --unit docker-openvpn@example.service`
**Остановка** : `systemctl stop docker-openvpn@example.service`

# Создаем клиентские конфиги

Чтобы подключиться к VPN потребуется конфигурация. Заменяем CLIENTNAME в первой строчке

    CLIENTNAME=home_pc
    docker run --rm -v $OVPN_DATA:/etc/openvpn -it kylemanna/openvpn easyrsa build-client-full $CLIENTNAME nopass
    docker run --rm -v $OVPN_DATA:/etc/openvpn kylemanna/openvpn ovpn_getclient $CLIENTNAME > $CLIENTNAME.ovpn

На Windows ее нужно поместить в `C:\Program Files\OpenVPN\config`

# Полезные ссылки

- [Подробнее через systemd](https://github.com/kylemanna/docker-openvpn/blob/master/docs/systemd.md)
- [Через docker compose](https://github.com/kylemanna/docker-openvpn/blob/master/docs/docker-compose.md)
- [Debugging](https://github.com/kylemanna/docker-openvpn/blob/master/docs/debug.md)
- [Управление клиентами](https://github.com/kylemanna/docker-openvpn/blob/master/docs/clients.md)
