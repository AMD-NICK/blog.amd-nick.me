---
layout: post
title: poll.gmod.app документация
date: '2021-11-15 10:37:00'
tags:
- programming
---

Это простейший [Long Polling](https://learn.javascript.ru/long-polling) микросервис, который выступает в качестве своеобразного WebHook сервера для POST запросов. Принятые данные можно получить с сервера по GET запросу.

> Рассчитан для ограниченной среды, где усложнена или отсутствует возможность поднятия Web сервера для своих вебхуков.

Рекомендую прочесть [это](https://learn.javascript.ru/long-polling), если вы представляете LongPolling как GET запрос раз в 10 секунд.

<figure class="kg-card kg-image-card kg-card-hascaption"><img src="https://s3.blog.amd-nick.me/2021/11/image-3.png" class="kg-image" alt loading="lazy" width="1262" height="582"><figcaption>Одной этой схемы достаточно, чтобы понять как все работает на примере Telegram бота</figcaption></img></figure>

В недавнем посте рассказаны варианты применения этого сервиса. Рекомендую почитать:

<figure class="kg-card kg-bookmark-card"><a class="kg-bookmark-container" href=" __GHOST_URL__ /webhook-bez-web-servera/"><div class="kg-bookmark-content">
<div class="kg-bookmark-title">Webhook без веб сервера</div>
<div class="kg-bookmark-description">Если развернуть веб сервер с вебхуком возможности нет, а принимать сообщения от какого-то сервиса (например Telegram) нужно, мы используем polling. Это когда мы сами спрашиваем у сервиса, нет ли у него для нас новостей. В случае с Telegram, это происходит через запрос getUpdates. Но что, если сервис…</div>
<div class="kg-bookmark-metadata">
<span class="kg-bookmark-author">Блог _AMD_</span><span class="kg-bookmark-publisher">_AMD_</span>
</div>
</div>
<div class="kg-bookmark-thumbnail"><img src="https://s3.blog.amd-nick.me/2021/03/long-polling-instead-webhook.jpg" alt=""></img></div></a></figure>
# API

Мы хотели сделать максимально простой API, поэтому нет никаких токенов, паролей, регистраций. Все данные считаются публичными (любой может прочесть или записать), но вы можете спрятать их, подставив вместо SECRET\_UID что-то вроде пароля или токена.

- GET https://poll.gmod.app/SECRET\_UID/getUpdates
- POST https://poll.gmod.app/SECRET\_UID/pushUpdates

Больше ничего. Почти. У GET запроса есть возможность указания некоторых параметров, но сначала покажу пример ответа от GET запроса

<figure class="kg-card kg-image-card kg-card-hascaption"><img src="https://s3.blog.amd-nick.me/2021/11/image-2.png" class="kg-image" alt loading="lazy" width="694" height="136"><figcaption>Возвращается массив с полями ok, ts и updates. Обратите внимание на ts, он пригодится для формирования GET запроса</figcaption></img></figure>
- **?ts=12345**. Это offset. Его нужно обновлять каждый раз, когда вы получаете новый апдейт. Без этого параметра каждый раз будут возвращаться все последние апдейты, а следующий параметр sleep не будет обрабатываться, потому что сервер решит, что возвращает вам что-то новое
- **?sleep=60** , default 0, max 60. Время ожидания появления обновлений на сервере. Это время poll.gmod.app будет как бы "висеть". На самом деле он будет удерживать соединение, пока не появятся новые данные или не истечет указанный срок. Без указания sleep смысла с Long Polling мало, ведь суть как раз в удержании соединения до появления данных. После получения данных или сброса по таймауту можно смело заново выполнять GET запрос. sleep=60 означает 1 GET запрос в минуту.

## Определение какой сервис прислал апдейт

POST запрос может принять любые параметры. Они будут добавлены в каждый update объект, что полезно для идентификации сервиса, с которого пришел апдейт, если вы указываете один webhook на нескольких сервисах. Например, для определения какой телеграм бот прислал апдейт, я задаю каждому боту вебхук в таком стиле: /setWebhook?url=https://poll.gmod.app/myS3cretU1D/pushUpdates?botname=video\_thumbnails\_bot.

Теперь на GET https://poll.gmod.app/myS3cretU1D/getUpdates в каждом апдейте будет поле botname=video\_thumbnails\_bot

## Пример библиотеки на Lua для работы с poll.gmod.app
<figure class="kg-card kg-bookmark-card"><a class="kg-bookmark-container" href="https://github.com/GM-DONATE/IGS/blob/main/addons/igs-core/lua/igs/modules/pushes/akupol_sv.lua"><div class="kg-bookmark-content">
<div class="kg-bookmark-title">IGS/akupol_sv.lua at main · GM-DONATE/IGS</div>
<div class="kg-bookmark-description">🛍 Внутриигровой магазин для Garry’s Mod https://git.io/IGS - IGS/akupol_sv.lua at main · GM-DONATE/IGS</div>
<div class="kg-bookmark-metadata">
<img class="kg-bookmark-icon" src="https://github.com/fluidicon.png" alt=""><span class="kg-bookmark-author">GitHub</span><span class="kg-bookmark-publisher">GM-DONATE</span></img>
</div>
</div>
<div class="kg-bookmark-thumbnail"><img src="https://opengraph.githubassets.com/50151420544baf6e3cec164638c8a9dea5d33bfeda6d3a439f64c3050ac00dc5/GM-DONATE/IGS" alt=""></img></div></a></figure>
