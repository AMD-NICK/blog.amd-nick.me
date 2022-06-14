---
title: Точное время сообщения в Telegram
date: '2018-08-16 13:37:00'
slug: exact-time-telegram
tags: [telegram, bot]
---

Без какой либо на то причины захотелось узнать время отправки сообщения в телеграме с точностью до секунд. Я даже не представляю кому это может быть нужно. Если такие есть - напишите в комментариях - зачем?

1. Добавляем [@jsonson_bot](https://t.me/jsonson_bot)
2. Пересылаем ему нужное сообщение
3. В ответе находим поле `forward_date`
4. Вводим его на [epochconverter](https://www.epochconverter.com)
5. Видим точное время сообщения, включая секунды
6. Пишем в комментариях, зачем вам это нужно было)

![telegram_show_json_bot](https://s3.blog.amd-nick.me/2018/08/telegram_show_json_bot.png)

## Интересно
- [Графики онлайна человека в Telegram](2020-12-23-telegram-online-chart.md)
- [Telegram боты](/docs/telegram/bots)
- [Я знаю, на что ты дрочишь](2022-05-19-telegram-osint.md) (и не только)
- [Авторизация в Steam через Telegram](2020-01-29-steam-telegram-authenticator.md)
