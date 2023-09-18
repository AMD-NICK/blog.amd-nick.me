# 🐧 Linux
## Ссылки

- [Информация о команде](https://effective-shell.com/part-2-core-skills/understanding-commands) – `which where what whence whereis who`
- [cheat.sh](https://github.com/chubin/cheat.sh) - получение шпаргалок через curl
- [Лучшая система мониторинга, что я видел](https://github.com/netdata/netdata). Даже несмотря на то, что я не сторонник подобных систем. Не требует настройки, сразу Production ready, можно запустить прямо в Docker и смотреть графики на специальном удобнейшем сайте
- [my shell tips](http://luajit.io/post/my-shell-tips/) - у чела вообще интересный блог. Пару дней как создан, а уже куча годноты. Нашел, когда искал как решить утечку памяти в lua
- [gdu](https://github.com/dundee/gdu) – использую для поиска мусора на диске

## bash tips

Преимущественно, взято [отсюда](https://github.com/jlevy/the-art-of-command-line)

1. Поднять http сервер в текущей папке. Полезно, чтобы быстро скачать что-то с браузера: `python3 -m http.server 7890`
2. Перейти в предыдущую папку: `cd -`
3. Поиск по истории команд. Повторное нажатие продолжает поиск `Ctrl + R`. Стрелка вправо вставляет в терминал для редактирования
4. Повтор команды с sudo `sudo !!`
5. Очистить консоль `Ctrl + L`
6. `export EDITOR=vim`, затем `Ctrl + X > Ctrl + E` откроет редактор, в котором удобно вводить большие команды
