---
sidebar_position: 1
---

# Lua

Реально простой и реально мощный язык программирования. luajit приближен по скорости к C++, с головой опережает python, node, ruby и многие другие языки, при этом имеет динамическую типизацию и не превращает все в ООП (но и не запрещает)

## Мои применения

- [Garry's Mod](https://wiki.facepunch.com/gmod/) сервера - основной язык моддинга (отсюда мои ноги растут). Мой проект `trigon.im` в 2015 году был в топ-3 garrysmod по мониторингу GameTracker 😎
- **OpenResty** - фильтрую запросы на уровне веб сервера. Рейт лимиты, алерты и тд. Так "дешевле", чем на уровне php. Еще слышал про Kong, но руки не дошли потрогать
- [ggram](https://git.io/ggram) – Моя библиотека для написания телеграм ботов различной сложности. Почти все [мои боты](/docs/telegram/bots) написаны на Lua
- [long polling server](/2023/12/15/long-polling) – OpenSource клиент и сервер, написанные на [lua-express](/2023/12/13/lua-express). Список применений написан в первой ссылке (по сути, единый вебхук для всего)
- [GMDonate](/kak-mi-delali-avtodonat-dlya-garrys-mod) API написан тоже на lua-express

## Что мне не нравится в Lua

### Отсутствие `continue` по умолчанию

`continue` это keyword, который позволяет пропустить итерацию цикла при каком-то условии. В минимальной демке, как снизу, проблема не кажется существенной, но когда функции побольше, то это ощутимое неудобство

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="without-continue" label="Без continue">

```lua
local start_loop = function()
	while something do
		wait(1)

		local search_ok, ctx = do_search(SEARCH_QUERY)
		if search_ok then
			local dat = ctx.json()
			if dat and dat.success then
				local step_ok, err = pcall(step_loop, dat)
				if not step_ok then
					print("step_loop error")
				end
			else
				print("query error 2", ctx)
			end
		else
			print("query error 1", ctx)
		end
	end
end
```

</TabItem>
<TabItem value="with-continue" label="С continue">

```lua
local start_loop = function()
	while something do
		wait(1)

		local search_ok, ctx = do_search(SEARCH_QUERY)
		if not search_ok then
			print("query error 1", ctx) continue
		end

		local dat = ctx.json()
		if not (dat and dat.success) then
			print("query error 2", ctx) continue
		end

		local step_ok, err = pcall(step_loop, dat)
		if not step_ok then
			print("step_loop error")
		end
	end
end
```

</TabItem>
</Tabs>

### keyword local вместо global

Почти никогда ничего не нужно делать глобальным, но почти всегда нужно делать что-то локальным. И keyword `local` становится чем-то, что уже пишется на автомате. Чем-то, что вообще не должно попадать в поле зрения

### Функции определяются громадно

<Tabs>
	<TabItem value="original" label="Оригинал">
		```lua
		local function something(arg1, arg2)
			print(arg1 + arg2)
		end

		do_something(function(a, b)
			return a + b
		end)
		```
	</TabItem>
	<TabItem value="dream" label="Хочется">
		```lua
		fun something(arg1, arg2) {
			print(arg1 + arg2)
		}

		do_something((a, b) {
			return a + b
		})
		```
	</TabItem>
</Tabs>

## Все остальное

- Можно найти по [тегу lua](/tags/lua) в блоге
- А также в сайдбаре на странице, где вы сейчас
