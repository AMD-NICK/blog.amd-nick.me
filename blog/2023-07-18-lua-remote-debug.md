---
title: Lua - Отладка кода на remote сервере
date: '2023-07-18 13:37:00'
slug: lua-remote-debug
image: https://file.def.pm/WejqyRFS.jpg
tags: [dev, lua, debug]
---

![header-image](https://file.def.pm/WejqyRFS.jpg)

<!--truncate-->


Проблема в том, что вся информация на китайском. **Каждый известный LuaDebug написал китаец и они не хотят переводить документацию на английский**.

- клиент – наше луа приложение или скрипт
- сервер – vscode

Сначала запускается сервер (нажатие кнопки старта debug в VSCode начинает слушать определенный порт), затем клиент подключается к серверу по TCP. Нажатие кнопки отладки, в отличии от локального дебага, не запускает код на компе с VSCode, а начинает ждать подключение по TCP

## VSCode LuaHelper + LuaPanda.lua

- [VSCode Marketplace](https://marketplace.visualstudio.com/items?itemName=yinfei.luahelper)
- [LuaPanda.lua](https://github.com/Tencent/LuaPanda/blob/master/Debugger/LuaPanda.lua)

.

- LuaHelper/LuaPanda китайская поделка, не работает пауза, данные передаются в виде непонятно чего.
- Есть переподключение, если отключить дебаггер, а потом включить заново. В mobdebug надо перезапускать луа скрипт/приложение
- В LuaPanda.lua сверху рекомендую изменить `consoleLogLevel = 0` на время тестов
- Еще поглядывать в консоль "Выходные данные" `Ctrl + J` в VSCode:
	![](https://file.def.pm/42oM3wp0.jpg)

```json
{
	"type": "LuaHelper-Debug",
	"request": "launch",
	"name": "LuaHelper-Attach",
	"description": "any",
	"cwd": "${workspaceFolder}",
	"luaFileExtension": "",
	"connectionPort": 8172,
	"stopOnEntry": true,
	"useCHook": true,
	"autoPathMode": true,
	"logLevel": 1
},
```

```lua
require('LuaPanda').start('123.123.123.123', 8172)
```

## VSCode Lua Debugger от devCAT + vscode-debuggee.lua

- [VSCode Marketplace](https://marketplace.visualstudio.com/items?itemName=devCAT.lua-debug)
- [vscode-debuggee.lua](https://github.com/devcat-studio/VSCodeLuaDebug/blob/master/debuggee/vscode-debuggee.lua)

Debug конфиг брал [тут](https://github.com/devcat-studio/VSCodeLuaDebug/blob/master/debuggee/.vscode/launch.json) (третий). Но он не запустился сразу. Удалил расширение VSCode, заменил конфиг на MobDebug. Оказывается, API VSCode расширений очень похожи, но в `vscode-debuggee.lua` пришлось напильником заменить пару строк:

```lua
-- было
sourceBasePath = initMessage.sourceBasePath
directorySeperator = initMessage.directorySeperator

-- стало
sourceBasePath = initMessage.arguments.sourceBasePath
directorySeperator = initMessage.arguments.directorySeperator
```

⚠️ Проблема нашлась в том, что после брейкпоинта нужно удалять его, чтобы работа скрипта продолжилась. Иначе застакается на строке (не работает кнопка продолжить). Если второй раз поставить брейкпоинт после удаления, то он почему-то не работает второй раз.

```lua
local util = require("gmod.util") -- или можно просто скормить cjson/dkjson
local json = {
	encode = util.TableToJSON,
	decode = util.JSONToTable,
}
local debuggee = require 'vscode-debuggee'
local startResult, breakerType = debuggee.start(json, {
	controllerHost = "123.123.123.123",
	controllerPort = 8172,
	dumpCommunication = true, -- принт в вывод VSCode того, что получает и отправляет
})
print('debuggee start ->', startResult, breakerType)
```

## VSCode MobDebug Adapter + mobdebug.lua

- [VSCode Marketplace](https://marketplace.visualstudio.com/items?itemName=AlexeyMelnichuk.lua-mobdebug)
- [mobdebug.lua](https://github.com/moteus/vscode-mobdebug/blob/main/lua/mobdebug.lua) – важно использовать именно этот файл.

[Оригинальный](https://github.com/pkulchenko/MobDebug/blob/master/src/mobdebug.lua) mobdebug.lua отличается от того, что идет с плагином. Оригинал не подходит, поскольку в нем сообщения принимаются без json, а плагин шлет json. Оригинал [используется](https://studio.zerobrane.com/doc-remote-debugging) в ZeroBrain Studio.

mobdebug нравится больше, чем LuaPanda, но файл засран говном. Работает пауза, меньше китайщины и багов. Более здраво выглядит конфиг.

Пример первого запроса от VSCode к Lua при подключении:
```json
#128
{"command":"welcome","arguments":{"stopOnEntry":true,"sourceBasePath":"/Users/amd/Desktop/ggram-bots","directorySeperator":"/"}}#230
{"type":"request","seq":3,"command":"setBreakpoints","arguments":{"source":{"name":"commands.lua","path":"/Users/amd/Desktop/ggram-bots/bots/aanebots/commands.lua"},"lines":[31],"breakpoints":[{"line":31}],"sourceModified":false}}#216
{"type":"request","seq":4,"command":"setBreakpoints","arguments":{"source":{"name":"launcher.lua","path":"/Users/amd/Desktop/ggram-bots/launcher.lua"},"lines":[64],"breakpoints":[{"line":64}],"sourceModified":false}}
```

```json
{
	"type": "luaMobDebug",
	"name": "Lua MobDebug: Listen",
	"request": "attach",
	"workingDirectory": "${workspaceFolder}",
	"sourceBasePath": "${workspaceFolder}",
	"listenPublicly": true,
	"listenPort": 8172,
	"stopOnEntry": true,
	"sourceEncoding": "UTF-8",
	// "runMode": "task",
	// "interpreter": "lua5.3"
},
```

```lua
local mobdebug = require("mobdebug")
mobdebug.logging(true)
mobdebug.start("123.123.123.123", 8172)
```

## VSCode LuaDebug от actboy168 + не пойму что

- [VSCode Marketplace](https://marketplace.visualstudio.com/items?itemName=actboy168.lua-debug)

Самая популярная и перспективная библиотека, но установка мне показалась геморройной, поэтому я не стал его устанавливать. Их используют [RealTimeLogic](https://github.com/RealTimeLogic/LSP-Examples/tree/master/Lua-Debug) и этим меня подкупили. Вроде не глупая компания. На момент написания недавно обновлялся.

## debugger.lua БЕЗ VSCode

![debugger.lua](https://file.def.pm/WejqyRFS.jpg)

Это [один файл-дебаггер](https://github.com/slembcke/debugger.lua/blob/master/debugger.lua). Код прелестный, минималистичный. Все нравится. Но нет расширения для VSCode. Это REPL скрипт, который подкупает, если запустить интерактивный туториал:

```bash
git clone https://github.com/slembcke/debugger.lua.git debugger && cd debugger
lua tutorial.lua
```

Мои скрипты запускаются через docker-compose.yml файл, но этот дебаггер при попытке использования все крашил. Исправил запуском контейнера без docker-compose и добавлением параметров -it в `docker run`.

Так скрипт работал хорошо, но в некоторых случаях не работало продолжение воспроизведения кода после брейкпоинта. Не знаю в чем дело
