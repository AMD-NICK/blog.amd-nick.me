---
title: Переключение раскладки в Elementary OS по Alt + Shift
date: '2015-04-13 22:39:00'
slug: alt-shift-elementary
tags:
- notes
---

Вчера установил Elementary OS **Freya** и обнаружил один небольшой, но проблемный баг с переключением раскладки клавиатуры. Дело в том, что через Switchboard настроить переключение на **Alt+Shift** или **Ctrl+Shift** нельзя.

![elementary-os-logo](https://s3.blog.amd-nick.me/2018/08/elementary-os-logo.png)

Немного погуглив, я узнал, что этот баг уже публиковался на лаунчпаде и был отмечен, как Fix Commited, т.е. пофикшен, но на самом деле что-то ничего не изменилось, судя по всему.

Еще немного поковыряв гугл, русскоязычное [сообщество](https://vk.com/elementary_os) Elementary OS ВКонтакте, их блог и форум, я нашел решение проблемы.

### Для переключения по Alt+Shift

    gsettings set org.pantheon.desktop.gala.keybindings switch-input-source "['<Alt>Shift_L', '<Alt>Shift_R', '<Shift>Alt_L', '<Shift>Alt_R']"

### Для переключения по Ctrl+Shift

    gsettings set org.pantheon.desktop.gala.keybindings switch-input-source "['<Ctrl>Shift_L', '<Ctrl>>Shift_R', '<Shift>Control_L', '<Shift>Control_R']"

### Для переключения по Caps Lock

    gsettings set org.pantheon.desktop.gala.keybindings switch-input-source "['Caps_Lock']"

* * *

> По умолчанию в Elementary OS Freya раскладка переключается по Win+Space, если верить тому, что я читал. На деле я это проверить не успел

Выше указаны основные способы переключения раскладок. Назначить другую комбинацию не составляет труда, но если же все-таки возникли проблемы, то пишите в комментарии. Я постараюсь помочь.

<!--kg-card-end: markdown-->
