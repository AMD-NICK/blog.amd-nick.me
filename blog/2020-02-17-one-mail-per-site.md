---
title: 1 почта - 1 сайт. Лайфхак с почтой на домене
date: '2020-02-17 13:37:00'
slug: one-mail-per-site
tags: [yandex, email]
---

# TL;DR

> На яндексе можно сделать почту для домена, а затем сбор почты с несуществующих ящиков в одно место. Таким образом я сделал, что на каждом сайте у меня разные мыльники. Например insta@lol.com. И если кто-то начинает слать всякую дичь, то я сразу знаю откуда она пошла

* * *

У Яндекса есть интересный сервис [Яндекс.Коннект](https://connect.yandex.ru/) (раньше Yandex PDD), который позволяет бесплатно делать почтовые ящики на своем домене, используя при этом интерфейс Яндекс Почты.

> По простому говоря, это админка, которая позволяет в пару кликов клепать ящики для себя или сотрудников вида kek@lol.com

И у Яндекса есть интересная фишка

<!--truncate-->

## Сбор писем с несуществующих ящиков

У почты для домена есть настройка сбора писем с несуществующих ящиков. Например, если у вас создан только _kek@lol.com_ и _heh@lol.com_, а письмо пришло на _mda@lol.com_, то оно попадет на какой-нибудь _collector@lol.com_ или что угодно другое, что вы укажете в качестве адреса для сбора "потерянных" писем

![](https://s3.amd-nick.me/2020/02/image.png)

## Проблема

Сегодня друг прислал мне забавное сообщение от "Следователя"

![](https://s3.amd-nick.me/2020/02/image-1.png)

Внутри классическая схема вымогательства денег: "у нас есть пруфы, что вы мудак и мы вас накажем, если вы не заплатите бетховены".

Как они работают? Сайты. на которых мы с вами регистрируемся время от времени взламывают, воруют базы данных и сливают их в сеть. В них хранятся наши почты, пароли и прочие вкусности, которые хацкеры используют в описанных выше целях и не только

> Если у вас 1-3 почтовых ящика, то можете вбить их ради интереса на [этом сайте](https://haveibeenpwned.com/) и узнать, слили ли ваши данные

## Решение

При регистрации на сайте указывайте для него уникальную почту, например _insta@lol.com для инстаграма_. теперь, если вам придет угроза или спам на этот ящик, то вы будете знать, кто в этом виноват :)

Кстати, часто шлют спам с разных адресов, так что отсеять их сложно, зато вы легко можете отключить весь адрес, указав на сайте новый

Также это добавляет вам немного безопасности, потому многие используют одинаковые почты и пароли на разных сайтах и узнав данные от одного, злоумышленники получат доступ к остальным. Есть специальные программы, которые ищут такие сайты. Но лучше, конечно, использовать разные пароли на разных сайтах, хотя одно другому не мешает
