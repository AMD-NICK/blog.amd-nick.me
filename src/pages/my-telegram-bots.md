---
title: Мои Telegram боты
slug: my-telegram-bots
---

Боты в Telegram - мощнейший инструмент автоматизации абсолютно любых процессов. Начиная от отправки простых уведомлений и не заканчивая умными домами. Ниже описаны основные мои боты, но по факту я использую их ВЕЗДЕ, в любой сфере деятельности.

## Извлечение картинок из видео

[@video\_thumbnails\_bot](https://t.me/video_thumbnails_bot) - начал смотеть порнуху в Telegram и чтобы не перебирать миллионы видосов, просто выделяю их и скиыдваю боту. Бот присылает картинки с видосов и по ним быстрее можно отсеять годноту :D

Но никто вас не осудит, если вместо порнухи ему скидывать фото котиков

## Генерация кодов авторизации Steam

[@steam\_code\_bot](steam-telegram-authenticator) - генерирует коды авторизаций Steam Guard без необходимости вводить свой логин и пароль. Чистая реализация алгоритма. Напишите боту /about, чтобы узнать подробнее. А еще там пасхалка!

## Шифрование сообщений

[@encrbot](https://t.me/encrbot) - писалось для [чата](https://t.me/trigon_chat) моего проекта [trigon.im](https://trigon.im) в качестве примитивной дразнилки над нубами. Используется в inline режиме в любом чате, даже где бота нет. Достаточно написать `@encrbot кто прочел, тот не осел` и нажать Enter. Расшифровка там же. [Сможете?](https://pastebin.com/Yujky1pZ)

## Сбор самых интересных постов со стены ВК

[@vk\_reposter\_bot](https://t.me/vk_reposter_bot) - с появлением телеграм и началом [моей информационной диеты](https://t.me/boxie/23) я почти полностью избавился от ВК, наполнив свою жизнь концентрированной полезной информацией с каналов Telegram, но некоторый контент все же остается в ВК.

> Бот занимается сбором самых интересных постов за указанный промежуток времени с интересующих вас стен ВК и отправляет их вам в [виде списка](https://img.qweqwe.ovh/1556382258890.png) или набора [постов из картинок](https://img.qweqwe.ovh/1556382203451.png).

В будущем планирую написать мост для чатов, чтобы даже переписки с ВК велись через телегу

## Отображение JSON кода Telegram сообщений

[@jsonson\_bot](https://t.me/jsonson_bot) - Для тех, кто работает с Telegram Bot API помогает наглядно увидеть объекты: сообщения, стикеры, фото, войсы и тд. Для рядового пользователя помогает узнать чей-то ID, адрес стикерпака.

## Бот не-калькулятор

[@hokthebot](https://t.me/hokthebot) - Ну вообще-то по сути все же калькулятор. Транзакционный. Он суммирует числа, которые ему присылать и подбивает по ним финальный итог/баланс/сумму. Например создаешь чат с человеком, который одолжил у тебя денег, пишешь в нем сумму, а потом по мере отдачи долга списываешь часть за частью. И должник и ты всегда знаете, сколько еще осталось отдать. Это одно из применений, другие описаны в самом боте

## Интересный факт

Все эти боты написаны на Lua и работают на игровом Garry's Mod сервере через [самописный фреймворк](https://git.io/ggram).
