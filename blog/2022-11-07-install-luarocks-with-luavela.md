---
slug: install-luarocks-with-luavela
tags: [lua, dev, luavela, ujit]
image: https://raw.githubusercontent.com/luarocks/luarocks-logos/master/luarocks_new_logo.png
---

# Установка luarocks для luavela (ujit)

![luarocks-logo-png](https://raw.githubusercontent.com/luarocks/luarocks-logos/master/luarocks_new_logo.png)

:::note
Инструкция предназначена для debian-based дистрибутивов, включая ubuntu
:::

## Необходимые зависимости

- `git` для `git clone`
- `cmake`, `dpkg-dev`, `libc-dev` и `gcc` для `cmake ../luavela`
- `g++` для `make install` в luavela
- `wget` для скачивания luarocks
- `unzip` для `./configure` luarocks

Предварительно напишите `LVPATH=/usr`. Это будет путь установки luavela и с ним будет работать luarocks.

<!--truncate-->


## Установка luavela

При установке luavela нужно указать и запомнить флаг `-DCMAKE_INSTALL_PREFIX=/путь/установки`.

Предположим, мы используем `/usr`

```bash
cd /tmp

git clone https://github.com/luavela/luavela.git

# Создаем и сходим пустую папку, в которой будем билдить luavela
mkdir luavela-build && cd luavela-build

# luavela-build находится рядом с luavela, в которую сделан git clone
cmake ../luavela -DCMAKE_INSTALL_PREFIX=$LVPATH

make install

# Нужно будет для luarocks и для некоторых системных зависимостей
ln -s /usr/bin/luavela /usr/bin/lua
```

## Установка luarocks

Перейдите на [страницу релизов luarocks](https://luarocks.org/releases) и посмотрите версию последнего релиза. Скопируйте ее. Например, 3.8.0

```bash
cd /tmp

wget https://luarocks.org/releases/luarocks-3.8.0.tar.gz

tar zxpf luarocks-3.8.0.tar.gz && rm luarocks-3.8.0.tar.gz

cd luarocks-3.8.0

./configure --with-lua=$LVPATH --with-lua-include=$LVPATH/include/ujit --with-lua-interpreter=luavela

make && make install
```

## Может быть интересно

- [Про __mode в метатаблицах](./2020-01-21-lua-metatables-mode.md)
- [Мои заметки про Lua](/docs/programming/lua)
- [ggram - мой telegram bot api lua framework](https://git.io/ggram)
