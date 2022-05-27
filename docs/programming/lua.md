# Lua

Реально простой и реально мощный язык программирования. luajit приближен по скорости к C++, с головой опережает python, node, ruby и многие другие языки, при этом имеет динамическую типизацию и не превращает все в ООП (но и не запрещает)

## Применения

В основном применяется как дополнение к другим продуктам, редко используется в чистом виде. Думаю, из-за отсутствия тонны функционала "из коробки".

- [Garry's Mod](https://wiki.facepunch.com/gmod/) - основной язык моддинга (я отсюда)
- OpenResty, [Kong](https://github.com/Kong/kong) - програмная обработка запросов. Можно даже Telegram ботов и прочее хостить прямо на OpenResty
- [Tarantool](https://www.tarantool.io/en/doc/latest/tutorials/lua_tutorials/) - БД в RAM. Может заменить MySQL+Redis, насколько я понимаю
- [FiveM](https://docs.fivem.net/docs/scripting-manual/runtimes/lua/) - GTA V Multiplayer mod. Lua вроде как основной язык моддинга
- [Roblox](https://developer.roblox.com/en-us/onboarding/intro-to-coding/1)
- [hammerspoon](http://www.hammerspoon.org) - автоматизация задач на MacOS. Мост между MacOS API и Lua
- [love2d](https://love2d.org) - создание 2D игр на Lua

## Чистый Lua

- [ggram](http://git.io/ggram) - моя штука для создания Telegram ботов на Lua с асинхронностью. Может работать как внутри Garry's Mod, так и в чистом Lua без горы зависимостей
- [luvit](https://luvit.io) - как express.js, но в lua
- [deferred](https://github.com/zserge/lua-promises/blob/master/deferred.lua) - A+ промисы на Lua. Применяю почти везде. Особенность: error внутри цепочки вызывает reject
- [copas](https://github.com/lunarmodules/copas) - асинхронные сокеты и http/https реквесты
