# Bash

- [Информация о команде](https://effective-shell.com/part-2-core-skills/understanding-commands) – `which where what whence whereis who`
- [my shell tips](http://luajit.io/post/my-shell-tips/) - у чела интересный блог. Пару дней как создан, а уже куча годноты. Нашел, когда искал как решить утечку памяти в lua

## Фишки

Преимущественно, взято [отсюда](https://github.com/jlevy/the-art-of-command-line)

1. Поднять http сервер в текущей папке. Полезно, чтобы быстро скачать что-то с браузера: `python3 -m http.server 7890`
2. Перейти в предыдущую папку: `cd -`
3. Поиск по истории команд. Повторное нажатие продолжает поиск `Ctrl + R`. Стрелка вправо вставляет в терминал для редактирования
4. Повтор команды с sudo `sudo !!`
5. Очистить консоль `Ctrl + L`
6. `Ctrl + X > Ctrl + E` откроет редактор, в котором удобно вводить большие команды. `export EDITOR=micro` в `~/.bashrc` позволяет указать любимый редактор
7. Ввод команды без записи в историю: поставьте перед ней пробел. `$> ls` вместо `$>ls`

## Алиасы

Те, которые использую опубликовал и обновляю [тут](./prepare.md)
