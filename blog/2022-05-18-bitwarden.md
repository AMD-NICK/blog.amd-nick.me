---
title: Bitwarden – менеджер паролей
date: '2022-05-18 00:27'
slug: bitwarden
tags: [soft, bitwarden]
image: https://i.imgur.com/zueg01Q.png
---

После [моего поста](2019-02-12-keepass-free-password-manager.md) 2019 года про то, какой Keepass охеренный, не прошло и месяца, как я перешел на Bitwarden, пропользовавшись первым несколько лет 😅

Keepass неплох, но я считаю, что любой продукт должен быть для упрощения жизни, а не для ее усложнения и Bitwarden справился с задачей лучше.

![](https://i.imgur.com/2R1W9jd.jpg)

<!--truncate-->

Мое первое время с Bitwarden выглядело вот так. Цитирую отзыв первого времени:

```
_AMD_, [18.04.19 00:29]
и все же я нашел кучу косяков и неприятностей в bitwarden:
1) неудобная работа с файлами
2) нельзя работать с несколькими базами, организации не реализовывают необходимый функционал
3) приложение на смартфоне имеет нихуевый вес
4) папки это вообще пиздец. Лучше не связываться и кидать все в одну единственную помойку
5) интерфейс пизда неудобен. Это блять нахуй ебал в рот короче. Пару месяцев и никак не привыкну
6) нет ссаной корзины. После удаления предмета можно забыть о нем навсегда
7) нет свистоперделок для взаимодействия с другими приложениями, типа "нажал сочетание, открылся и авторизировался в SSH или FTP"
```

Вышло, как и с MacOS, в которой я пытался увидеть Windows, так и в Bitwarden я пытался увидеть KeePass. GENIUS (дед)

Спойлер: для меня минусов больше не осталось. Даже корзину они добавили

* * *

## За что я его люблю
### ⚠️ Безопасность
Все данные хранятся на серверах Bitwarden и хрен бы я на это согласился, припоминая взломы LastPass и 1Password, если бы не [отчеты аудитов безопасности](https://bitwarden.com/help/is-bitwarden-audited/), которые я несколько часов изучал на сайте Bitwarden. Вкратце – очень надежно. **Доверяю**.

Я больше не парюсь за то, что мой Dropbox (или другое хранилище) угонят вместе с базой и сбрутят пароль за пару минут с помощью какой-нибудь Nvidia Tesla, [арендованной у AWS](https://aws.amazon.com/ru/ec2/instance-types/p3/) за пару баксов.

А если в жопу припекает, то вы можете все равно сделать self-hosted хранилище и не переживать за безопасность своей базы на своем ssh с паролем

### 🔄 Синхронизация между  устройствами
Поскольку все данные летают в облаках, за синхру своими силами и порой устаревшие данные можно было забыть. Сохранил на Mac в Safari, использовал на Windows в Brave и т.д

![](https://bitwarden.com/static/bb4c0a8ba441933046babd8a7125dafa/e2ff5/hero.webp)

Кстати, несмотря на малое количество плагинов для Safari, плагин от Bitwarden все же был. И, что было удивительно в 2019 году – была нативная интеграция с iOS, чем не мог похвастаться, кажется, 1Password, а Keepass подавно.

### ❤️ Минимализм
Вот эти вот все ваши папочки, устройство которых в Bitwarden я по началу хейтил на самом деле оказалось, что мне и не всрались. Я помешан на упорядочении всего и вся, трачу на это львиную долю времени, но Bitwarden показал мне, что я страдаю херней со своими 9000 папками с 10 уровнями вложенности в Keepass.

У меня осталось около 5 папок, а ~97% паролей все равно в одной основной.

Помимо папок меня месило от того, что в Bitwarden намного меньше кнопок и настроек. На самом деле оказалось, что это фиктивное чувство отсталости продукта и эти кнопочки тоже просто замыливание глаз. Прям Android вспоминаю (я гейосер, только не бейте)


### Приятные мелочи
- С KeePass все легко импортируется легким взмахом руки
- BitWarden тоже не закрывает в своей экосистеме и дает перейти в другие хранилки
- Есть "эквивалентные домены", для которых в KeePass приходилось дублировать запись (steamcommunity, steampowered)
- Сообщает, если какие-то из твоих паролей слили в сеть. Welcome to https://haveibeenpwned.com
- Возможность юзать в браузере без танцев с бубном
- `Cmd + Shift + L` заполняет пароль на сайте. Кстати, можно настроить custom fields для записи и они тоже будут заполняться

![](https://i.imgur.com/ehKVhwY.gif)


## Вердикт
**Синхронизация, безопасность, интеграция** – три слона, на которых держится моя любовь к BitWarden уже 3 года. Я купил платную подписку просто, чтобы сказать спасибо разработчикам и никогда ее не использовал
