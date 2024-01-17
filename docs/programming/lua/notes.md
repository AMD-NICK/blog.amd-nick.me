# Заметки

## nil не то же, что отсутствие значения

Поэтому если вы встретите в каких-то функциях `return nil`, то не спешите удалять эту строку. Возможно, она там не просто так

Например `tonumber(nil)` вернет nil, а `tonumber()` (без nil) вызовет ошибку

Проверить что nil это действительно nil, а не отсуствие аргумента в функции можно вот так: `select("#", ...)`. Функция вернет 1, если в параметрах передан nil и вернет 0, если ничего не указано

![lua select nil](notes-lua-select-nil.png)

## Получаем только одно значение из функции

Есть функции, которые возвращают несколько значений, например `next()` (возвращает key, value).

```lua
-- В этом примере мы получим оба значения
local key, v = next({kek = "lol"})
print(key, v) -- "kek", "lol"

-- В этом только первое. Остальные отсекутся
local key, v = ( next({kek = "lol"}) ) -- скобочки
print(key, v) -- "kek", nil
```

Можно использовать для `return` одного значения. Полезно, когда делаешь `return string.match/gsub`

```lua
local function two() return 1, 2 end
local function one() return ( two() ) end

print( one() )
```

Реальный пример, когда это может быть полезно

```lua
local function replace_spaces(str)
	if type(str) ~= "string" then return false, "Ожидалась строка" end

	return str:gsub(" ", "_")
end

local newstring, err = replace_spaces("раз два пробела")
if err then
	print("Ошибка:", err) -- "Ошибка: 2"
end
```
