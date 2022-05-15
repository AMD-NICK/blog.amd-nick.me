---
title: Точное время сообщения в Telegram
date: '2018-08-16 10:37:00'
slug: exact-time-telegram
tags:
- notes
---

Без какой либо на то причины захотелось узнать время отправки сообщения в телеграме с точностью до секунд. Я даже не представляю кому это может быть нужно. Если такие есть - напишите в комментариях - зачем?

1. Добавляем [@ShowJsonBot](https://t.me/ShowJsonBot)
2. Пересылаем ему нужное сообщение
3. В ответе находим поле `forward_date`
4. Вводим его на [epochconverter](https://www.epochconverter.com)
5. Видим точное время сообщения, включая секунды
6. Пишем в комментариях, зачем вам это нужно было)

![telegram_show_json_bot]( __GHOST_URL__ /content/images/2018/08/telegram_show_json_bot.png)

<!--kg-card-end: markdown-->