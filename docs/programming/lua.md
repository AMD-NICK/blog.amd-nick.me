# Lua

Реально простой и реально мощный язык программирования. luajit приближен по скорости к C++, с головой опережает python, node, ruby и многие другие языки, при этом имеет динамическую типизацию и не превращает все в ООП (но и не запрещает)

## Мои применения

- [Garry's Mod](https://wiki.facepunch.com/gmod/) - основной язык моддинга (я отсюда)
- OpenResty, [Kong](https://github.com/Kong/kong) - програмная обработка запросов. Можно даже Telegram ботов и прочее хостить прямо на OpenResty. Смотрите еще [luvit](https://luvit.io) и [lapis](https://leafo.net/lapis/)
- [hammerspoon](http://www.hammerspoon.org) - автоматизация задач на MacOS. Мост между MacOS API и Lua

## Интересное

- [ggram](http://git.io/ggram) - моя штука для создания Telegram ботов на Lua с асинхронностью. Может работать как внутри Garry's Mod, так и в чистом Lua без горы зависимостей
- [deferred](https://github.com/zserge/lua-promises/blob/master/deferred.lua) - A+ промисы на Lua. Применяю почти везде. Особенность: error внутри цепочки вызывает reject
- [copas](https://github.com/lunarmodules/copas) - асинхронные сокеты и http/https реквесты
- [moses](https://github.com/Yonaba/Moses/blob/master/moses.lua) - функциональное программирование
- [Tarantool](https://www.tarantool.io/en/doc/latest/tutorials/lua_tutorials/) - БД в RAM. Может заменить MySQL+Redis, насколько я понимаю
- [love2d](https://love2d.org) - создание игр на Lua
- [luash](https://github.com/zserge/luash) shell скрипты на Lua
- [xFuscator](https://github.com/superfsm/XFuscator) обфускатор. Использовал сам
- [luabundle](https://github.com/graue/luabundle) собирает модуль в один файл
- [lockbox](https://github.com/somesocks/lua-lockbox) криптографические алгоритмы на чистом Lua
- [luajit.me](https://github.com/rapidlua/luajit.me) сервис визуализации LuaJit компилятора. Узнал о нем с [этой презентации](https://www.youtube.com/watch?v=SeGK_NxmWOk), пока искал инфу про утечки памяти

## Заметки

### nil не то же, что отсутствие значения

Поэтому если вы встретите в каких-то функциях `return nil`, то не спешите удалять эту строку. Возможно, она там не просто так

Например `tonumber(nil)` вернет nil, а `tonumber()` (без nil) вызовет ошибку

Проверить что nil это действительно nil, а не отсуствие аргумента в функции можно вот так: `select("#", ...)`. Функция вернет 1, если в параметрах передан nil и вернет 0, если ничего не указано

![lua select nil](https://i.imgur.com/KVskJdN.jpg)

---

## Поиск утечек памяти

Пришлось столкнуться. Мои микрозаметки на этот счет.

:::tip
UPD: все, что описано ниже может быть полезным, но в моем случае полезнее всего оказалось [сбилдить LuaJit](https://github.com/TRIGONIM/ggram/blob/7e48477fb6e95fa9c8389bfc6ba253ab4631efed/Dockerfile_tarantool) от Tarantool и использовать встроенный в него memory profiler ([memprof](https://www.tarantool.io/en/doc/latest/reference/tooling/luajit_memprof/)), который покажет где и сколько памяти не высвободилось в коде.
:::

### Ручной поиск

В таймере каждую секунду принтить `collectgarbage("count") / 1024`, удаляя подозреваемые куски кода, пока память не перестанет "улетать в трубу"

```lua
-- Заметка для личного пользования

timer.Create("gc_count", 1, 0, function()
	local freeMem = collectgarbage("count")
	MsgMC("&eGC Count: &a" .. math.Round(freeMem / 1024, 2) .. "&3 MB")
end)
```

Таймер работает на copas.

### Инструменты

Может быть интересно полистать: [мини презентация](https://www.lua.org/wshop15/Musa2.pdf) по разным инструментам для поиска утечек

Я использую `LuaMemorySnapshotDump + lua-microscope` в связке.

#### LuaMemorySnapshotDump

[LuaMemorySnapshotDump](https://github.com/yaukeywang/LuaMemorySnapshotDump) - делает файлы с дампом памяти. Чистый lua без сторонних модулей. Нужно сделать снимок "до" и "после" того, как часть памяти "уплыла", затем через этот же тул сделать diff

```lua
local mri = require("MemoryReferenceInfo")

mri.m_cConfig.m_bAllMemoryRefFileAddTime = false

print("dump BEFORE")

collectgarbage("collect")
mri.m_cMethods.DumpMemorySnapshot("./", "1-Before", -1)

print("waiting some time before next dump")

timer.Simple(120, function()
	print("dump AFTER")
	collectgarbage("collect")
	mri.m_cMethods.DumpMemorySnapshot("./", "2-After", -1)

	print("dump COMPARED")
	mri.m_cMethods.DumpMemorySnapshotComparedFile("./", "Compared", -1, "./LuaMemRefInfo-All-[1-Before].txt", "./LuaMemRefInfo-All-[2-After].txt")

	print("DONE BLYAT!!")
end)

```

В репе есть [example файл](https://github.com/yaukeywang/LuaMemorySnapshotDump/blob/master/Example.lua) и очень понятное readme. Конечный файл нужно выглядывать глазками. Выглядит примерно так:

```
--------------------------------------------------------
-- This is compared memory information.
--------------------------------------------------------
-- Collect base memory reference at line:-1@file:./LuaMemRefInfo-All-[1-Before].txt
-- Collect compared memory reference at line:-1@file:./LuaMemRefInfo-All-[2-After].txt
--------------------------------------------------------
-- [Table/Function/String Address/Name] [Reference Path]        [Reference Count]
--------------------------------------------------------
string: "China" registry.2[_G].Author.Country[string]   1
function: 0x5618d4a99f10        registry.2[_G].Author.Ask[line:33@file:Example.lua]     1
string: "Beijing"       registry.2[_G].Author.City[string]      1
string: "Game Developer"        registry.2[_G].Author.Job[string]       1
string: "Game, Travel, Gym"     registry.2[_G].Author.Hobby[string]     1
string: "yaukeywang"    registry.2[_G].Author.Name[string]      1
table: 0x5618d4a7e5f0   registry.2[_G].Author   1
```

#### lua-microscope

[lua-microscope](http://siffiejoe.github.io/lua-microscope/) – собирает информацию об указанной таблице, на выходе дает файл, который можно скормить [GraphViz](http://www.graphviz.org) и получить КАРТИНКУ памяти

**Быстрый тест:**

```bash
git clone git@github.com:siffiejoe/lua-microscope.git

cd lua-microscope
```

```bash
$ cat > test.lua
local up1 = false
local up2 = io.stdout
local t1 = { val = 1 }
local t2 = { val = 2 }
setmetatable( t1, { __index = function( t, k )
  if t2[ k ] ~= nil then
    return t2[ k ]
  else
    return up1 or up2
  end
end } )
setmetatable( t2, { __index = t1 } )

require( "microscope" )( "example1.dot", t1 )
^D
```

```bash
lua test.lua

# http://www.graphviz.org/download/
dot -T jpeg -o example1.jpeg example1.dot
```

#### loom

У luajit есть модуль [dump](https://github.com/LuaJIT/LuaJIT/blob/master/src/jit/dump.lua), запускается примерно так: `luajit -jdump=T -e 'local s = 0; for i = 1, 100 do s = s + i end; print(s)'`. Он генерирует .txt или .html файлик с информацией о "трассах памяти"(?). Короче, вот такие отчеты: [клик](https://github.com/luavela/dumpanalyze/blob/master/tests/dump-files/test_cli.txt).

На основе этих отчетов можно построить визуализации о работе jit компилятора.

**[Loom](https://github.com/cloudflare/loom)** от CloudFlare улучшает эти отчеты, генерируя более подробный и красивый html файлик. Пальцем наугад я заметил в этих отчетах хоть только один, но очень важный участок кода, который поправил. Уверен, можно и больше, но пока что мне не хватает опыта.

Установка проста: `git clone`, `mv jit $путь_в_пределах_package.path`, `mv loom.html $папка_с_initlua`. Потом запускаем свой скрипт: `luajit -jloom=loom.html,loom_dump.html init.lua`
