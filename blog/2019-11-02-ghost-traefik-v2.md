---
title: Ghost + Traefik v2 = блог с автообновлением SSL
date: '2019-11-02 13:37:00'
slug: ghost-traefik-v2
tags:
- docker
- soft
---

Этот блог работает внутри Docker контейнера и использует Traefik в качестве reverse proxy для Ghost. Недавно вышла версия v2.0, в которой были изменены некоторые фундаментальные особенности, что требует переконфигурации trafik.toml, acme.json и docker-compose.yml

У Traefik есть [официальная инструкция по обновлению](https://docs.traefik.io/migration/v1-to-v2/), и то ли я дурак, то ли ее стоит доработать, но факт в том, что после получаса вкуривания заново все настроить для меня было гораздо проще и полезнее

## Задача

Нашей задачей является настройка Traefik так, чтобы прицепить к нему всего один сайт-сервис (в нашем случае на Ghost CMS), который будет работать через SSL

Из всех функциональных способностей Traefik я использую лишь генерацию LetsEncrypt сертификатов. Балансировщик, метрики, dashboard и middleware а-ля ограничение запросов мне не нужны

* * *

> В следующих конфигах нужно быть очень внимательным, поскольку никаких параметров а-ля `entryPoints.name = insecure` нет. Названия компонентов и настроек являются частью названия самой переменной: entryPoints. **insecure**.address = ":80" как пример, в следующем конфиге

## traefik.toml

Это файл статической конфигурации. В нем указываются базовые настройки самого Traefik, а не того, как он будет обрабатывать сервисы

    [global]
      checkNewVersion = true
      sendAnonymousUsage = true
    
    [entryPoints]
      [entryPoints.insecure]
        address = ":80"
      [entryPoints.secure]
        address = ":443"
    
    [providers]
      [providers.docker]
        endpoint = "unix:///var/run/docker.sock"
        exposedByDefault = false
    
    [log]
      level = "WARNING"
    
    [certificatesResolvers]
      [certificatesResolvers.default]
        [certificatesResolvers.default.acme]
          email = "email@example.com"
          storage = "acme.json"
          [certificatesResolvers.default.acme.httpChallenge]
            entryPoint = "insecure"

Обратите внимание на `providers.docker.exposedByDefault = false`. Если у вас на хосте запущено множество сервисов, то без этого Traefik попытается автоматически подхватить и подстроиться под все. С этим он будет цеплять только те, у которых в `docker-compose.yml` будет label `traefik.enable=true`

Также заметьте названия entryPoint'ов (`insecure`, `secure`) и название `certificatesResolvers` (`default`), которые будут использованы в следующем файле

## docker-compose.yml

В нашем случае именно это файл динамической конфигурации

    version: '3.5'
    
    services:
      ghost:
        image: ghost:2
        labels:
          - traefik.enable=true
          - traefik.docker.network=traefiknet
          - traefik.http.routers.ghost.rule=Host(`blog.amd-nick.me`)
          - traefik.http.routers.ghost.entrypoints=insecure, secure
          - traefik.http.routers.ghost.tls.certresolver=default
          - traefik.http.services.ghost.loadbalancer.server.port=2368
        depends_on:
          - traefik
        networks:
          - traefiknet
    
      traefik:
        image: traefik:v2.0.4
        ports:
          - 80:80
          - 443:443
        volumes:
          - "/var/run/docker.sock:/var/run/docker.sock:ro"
          - ./traefik/traefik.toml:/etc/traefik/traefik.toml
          - ./traefik/acme.json:/acme.json # описан дальше
        networks:
          - traefiknet
    
    networks:
      traefiknet:
        name: traefiknet

- `.network=traefiknet` обязательно создайте внизу файла вместе с `.name: traefiknet`, иначе docker-compose создаст сеть с другим названием (Issues: [2348](https://github.com/containous/traefik/issues/2348), [2700](https://github.com/containous/traefik/issues/2700))
- В `routers.ghost.rule` используются обратные кавычки
- `.entrypoints`и `.certresolver` взяты с `traefik.toml`
- `loadbalancer.server.port=2368` указывает на порт, который Ghost [использует внутри контейнера](https://ghost.org/docs/concepts/config/#server). Наружу этот порт не выносим
- В volumes traefik видим проброс traefik.toml, который [автоматически](https://docs.traefik.io/getting-started/configuration-overview/#configuration-file) загрузится с той локации и acme по тому же принципу

## acme.json

Вам нужно создать пустой файл `acme.json` и **обязательно** сделать ему `chmod 600 acme.json`. Если забыть указать chmod, то SSL работать не будет (!). В этот файл будет сохраняться SSL сертификат

* * *

Как-то так :) Если помог - буду рад, если вы подпишитесь на [t.me/uFeed](tg://resolve?domain=uFeed), где я вкратце пишу о том, что читаю

#### 
