# Hyper Terminal

Минималистичный [Open Source](https://hyper.is) терминал

![Hyper](https://i.imgur.com/lEWWhb2.png)

Самый популярный аналог, iTerm, это целый завод для открытия консервной банки, избыточно для почти всех задач. Hyper это чистый минимализм.

Еще интересно выглядит [Warp](https://www.warp.dev), но он почему-то не хочет открывать [mosh](/mosh) сессии

## Настройки

Сделал для себя триггер отображения по `Opt + ;` из любого места, используя плагин `hyperterm-summon`. В настройках делается так:

```js
config: {
	summon: {
		hideDock: true,
		hideOnBlur: true,
		hotkey: 'Alt+;',
	},
},
```
