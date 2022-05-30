# Полезности

Удобства, влиящие на личную эффективность при использовании Mac

## Использую

- В сейв меню можно нажать ~ или / для быстрого выбора директории для сохранения

![~ and / in save menu](https://i.imgur.com/dbTUZLP.gif)

- В Finder и многих других интерфейсах можно просто начать писать на клавиатуре название файла для поиска в текущей директории

![просто начни писать](https://i.imgur.com/79dJwYD.gif)

- Для открытия приложений, которые блокаются Gatekeeper'ом, нужно держать Ctrl при клике на иконку, затем нажать "Открыть"
- Практически в любом приложении с зажатым Cmd можно изменять menu bar. Даже в статус баре MacOS иконки можно перемещать таким образом
- С зажатым Opt/Ctrl клик по иконкам часто открывает новые возможности. Для наглядности с Opt кликни по иконке Wifi или выбери несколько файлов в Finder, открой контекстное меню и нажимай Ctrl/Opt
- QuickLook (пробел на файле) быстро показывает его содержимое. [iPreview](https://apps.apple.com/ua/app/ipreview-powerful-quick-look/id1519213509?l=ru&mt=12) делает его суперзаряженным
- `Ctrl + Cmd + Space` открывает панельку Emoji 😊
- `⌘⇧.` отображение скрытых файлов в Finder
- `⌘⌥D` фиксация отображения Dock
- Ускорение Dock

```sh
# Remove dock animation. https://www.reddit.com/r/apple/comments/6xg9xq/tip_of_the_day_one_thing_i_cant_live_without_in/
defaults write com.apple.dock autohide-delay -int 0
defaults write com.apple.dock autohide-time-modifier -float 0.4
killall Dock

# Revert
defaults delete com.apple.dock autohide-delay
defaults delete com.apple.dock autohide-time-modifier
killall Dock
```

## Интересно

- [Можно](https://twitter.com/MBoffin/status/1218668903586394112) выделять текст внутри гиперссылки, удерживая Option. Не работает в Safari
- 2FA QR коды [можно](https://twitter.com/rafahari/status/1456013646144933893) установить в iCloud Keychain
- `networkQuality` в консоль замеряет скорость интернета (а-ля fast.com или speedtest.net)
- `caffeinate` предотвращает уход мака в режим сна. 
- Другой способ для "Открыть с помощью". Если перенести файл в Finder или например картинку в браузере на иконку в Dock, то файл откроется при помощи этого приложения
- Для переименования сразу многих файлов, выдели их все и в контекстном меню нажми "Переименовать"
- Тап (не клик) двумя пальцами по иконке в Dock покажет все окна приложения и "Последние файлы"
- `Cmd + Opt` + drag файла создаст алиас на него

## Ссылки

- [MacOS | Everything I Know](https://wiki.nikiv.dev/macOS/) - многие штуки взяты отсюда
- [macOS Tips & Tricks](https://saurabhs.org/macos-tips) - еще немного отсюлда
- [.dotfiles](https://github.com/mathiasbynens/dotfiles/blob/master/.macos) - разные настройки Mac через консоль
