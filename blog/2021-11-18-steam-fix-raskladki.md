---
layout: post
title: "[Решение] Steam автоматически добавляет раскладку"
date: '2021-11-18 10:37:00'
tags:
- notes
---

После запуска игры в Steam у меня автоматически добавляется лишняя раскладка клавиатуры. Чтобы удалить ее из "карусели" Alt-Shift, приходится заходить в настройки, самому добавлять ее, затем сразу же удалять. И так после каждого рестарта компьютера

<figure class="kg-card kg-image-card kg-card-hascaption"><img src="https://s3.blog.amd-nick.me/2019/06/unwanted-keyboard-layout.png" class="kg-image" alt loading="lazy"><figcaption>Раскладка отображается в "карусели" Alt-Shift, но чтобы увидеть ее в настройках, придется вручную ее добавить снова</figcaption></img></figure>

Проблема возникает, если при установки Windows вы выбрали основным языком тот, который вам не нужен и вы его удалили. У меня это украинский

# Решение

1. ПКМ на "Пуск" \> "Выполнить". Вводим там `regedit`
2. В `HKEY_LOCAL_MACHINE\SYSTEM\ControlSet001\Control\Keyboard Layouts` \> Ctrl + F, вводим на английском название "лишней" раскладки. У меня это ukrainian (Искал ua, ukr)
3. В адресной строке отобразится ID раскладки
4. Переходим в `HKEY_USERS.DEFAULT\Keyboard Layout\Preload`, находим там третьего лишнего и удаляем. Предварительно экспортируйте запись на всякий случай
<figure class="kg-card kg-image-card"><img src="https://s3.blog.amd-nick.me/2019/06/regedit-control-keyboard-layouts-ukrainian.png" class="kg-image" alt loading="lazy"></img></figure>

Заметил, что есть еще еще похожая ветка `HKEY_CURRENT_USER\Keyboard Layout\Preload`, где всего 2 раскладки и как раз лишняя отсутствует

