---
title: Разработка прямо на удаленном сервере с кайфом
date: '2023-07-24 13:37:00'
slug: vscode-remote-ssh
image: https://file.def.pm/K5F78aiH.png
tags: [note, dev, soft, vscode]
---

![official banner](https://file.def.pm/K5F78aiH.png)

Открыл для себя [VSCode Remote – SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh). Всегда думал, что оно 100% костыльно работает и не решался попробовать, а теперь хочу специально порекомендовать.

<!--truncate-->

Это плагин для VSCode, который позволяет подключиться по SSH к Linux/Windows/Mac хосту **и работать с ним, словно файлы находятся на своем компе**.

При первом подключении VSCode сам за пару секунд установит на удаленном хосте VSCode Server, с которым будет общаться наш VSCode на компе.

Установленный VSCode Server позволит не скачивать все файлы себе на комп, чтобы например быстро осуществлять поиск по ним, а будет делать поиск напрямую на удаленном сервере и просто возвращать результат клиенту.

Таким образом будут работать даже большинство сложных плагинов, например [Lua Language Server](https://marketplace.visualstudio.com/items?itemName=sumneko.lua), [Lua Debug](https://marketplace.visualstudio.com/items?itemName=actboy168.lua-debug), [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens), [AI Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) и другие.


## Некоторые личные заметки

- Больше не нужно держать на компе FileZilla или CyberDuck. Ты работаешь с файлами напрямую
- Раньше я использовал SFTP плагин и всегда держал копию файлов на своем компе. Когда сохранял изменения в файле, он выгружался по SFTP на сервер. Потом я коммитил изменения через GitHub Desktop. Сейчас могу редактировать прямиком на сервере и коммитить через VSCode.
- Если какие-то файлы не отображаются через `Ctrl + P`, то проверьте `.gitignore` файл. То, что попадает под .gitignore не отобразится в поиске. Можно либо **отдельно создать workspace с папкой, которая гитигнорится**, либо в настройках VSCode добавить `"search.useIgnoreFiles": false`.
