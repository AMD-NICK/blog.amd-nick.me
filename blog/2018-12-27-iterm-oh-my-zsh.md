---
title: Oh My Zsh - Улучшаем iTerm
date: '2018-12-27 13:37:00'
slug: iterm-oh-my-zsh
image: https://s3.blog.amd-nick.me/2018/12/image-1.png
tags: [mac, soft, brew]
---

![](https://s3.blog.amd-nick.me/2018/12/image-1.png)

Эта инструкция написана для Mac'овского iTerm, но при помощи несложных манипуляций может применяться и в других термианалах в т.ч. на удаленных Linux машинах

<!--truncate-->

# TL;DR (Вкратце)

1. Установка HomeBrew
2. Установка оболочки zsh
3. Установка оболочки для zsh :) (Oh My Zsh)
4. В iTerm делаем, чтобы вместо Bash юзался Zsh
5. Меняем дефолтную цветовую схему в iTerm
6. Устанавливаем пропатченные шрифты с доп. символами
7. Устанавливаем тему OMZ (Oh My Zsh)
8. Устанавливаем плагины OMZ
9. Прописываем все это в настройках OMZ

# Установка HomeBrew

> Это аналог пакетного менеджера apt в Linux. Через него гораздо проще устанавливать многие вещи, вроде оболочки Zsh и многих плагинов для нее

В терминал прописываем

```sh
$ xcode-select --install
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```


# Установка Zsh

> Оболочка, типа всем известного баша, но с кучей настроек и возможностей для кастомизации

В терминал:

```sh
$ brew install zsh
```

# Установка [Oh My Zsh](https://github.com/robbyrussell/oh-my-zsh)

> Oh My Zsh это фреймворк, через который и будет настраиваться Zsh. Не стоит их путать. Все необходимые нам настройки будут производиться с единственного файла.

Установка:

```sh
$ sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

# Меняем оболочку на Zsh

Открываем настройки iTerm \> Profiles \> Default \> Command: /bin/zsh
При перезапуске iTerm у вас уже будет Zsh (пока что ненастроенный)

![](https://s3.blog.amd-nick.me/2018/12/image-2.png)
*command > /bin/zsh*


# Установка цветовой схемы iTerm

1. Скачиваем [репозиторий с кучей-кучей схем](https://github.com/mbadolato/iTerm2-Color-Schemes)
2. В readme.md по скриншотам ищем схему, которая понравилась (у меня Afterglow. Люблю ее еще с Sublime Text 3)
3. Находим ее в repo/schemes и испортируем в iTerm через `Preferences > Profiles > Default > Colors > Color Presets... > Import`

# Установка Powerline Fonts

> Нужны для корректного отображения символов во многих темах. Без него в темах могут быть закарлючки вместо иконок

Вводим:

```sh
$ git clone https://github.com/powerline/fonts.git --depth=1 ; cd fonts
$ ./install.sh
$ cd .. ; rm -rf fonts
```

Изменяем в iTerm `Profiles > Default > Text > Change Font > Meslo LG S Regular For Powerline` (Последнее можете выбрать другое, но обязательно кириллический и для Powerline)


# Установка темы для OMZ (Oh My Zsh)

> Тема и делает всю красоту: добавляет особые фичи, изменяет оформление и тд

Список стандартных тем можно посмотреть [здесь](https://github.com/robbyrussell/oh-my-zsh/wiki/themes)
Я использую нестандартную [Powerlevel9k](https://github.com/bhilburn/powerlevel9k). Если хотите ее же:

```sh
$ git clone https://github.com/bhilburn/powerlevel9k.git ~/.oh-my-zsh/custom/themes/powerlevel9k
```

Если вам приглянулась какая-то из стандартных, например, как мне, Agnoser, то переходим к следующим шагам, **игнорируя этот**. Установка самой темы будет в конце


# Установка плагинов для OMZ

> Плагины добавляют новые алиасы к коммандам, а в некоторых случаях и изменяют вид терминала, например, при входе в папку .git репозитория

Список стандартных плагинов [здесь](https://github.com/robbyrussell/oh-my-zsh/tree/master/plugins). Я использую `git docker docker-compose osx zsh-syntax-highlighting`

Последний добавляет крутую подсветку синтаксиса для всего вводимого текста в терминал, но требует отдельной загрузки, тк не стандартный

```sh
$ brew install zsh-syntax-highlighting
```

Ниже мы активируем его, другие плагины, темы и немного поправим настройки OMZ


# Настройка Oh My Zsh

Устанавливаем скачанные плагины, темы, добавляем дополнительные настройки

```sh
open ~/.zshrc
```

У меня конфиг выглядит так:

```sh
# Не трогаем
export PATH=$HOME/bin:/usr/local/bin:$PATH
export ZSH="/Users/amd/.oh-my-zsh"

# Прописываем выбранную тему
ZSH_THEME="powerlevel9k/powerlevel9k" #af-magic

# Добавляет автокоррекцию вводимых команд, иногда сбоит
ENABLE_CORRECTION="true"

HIST_STAMPS="yyyy-mm-dd"

# Через пробел плагины, которые нужно активировать
plugins=(git docker docker-compose osx zsh-syntax-highlighting)

# Требуется для некоторых тем, чтобы был короткий и красивый путь
# Должно быть идентичным выхлопу с whoami
DEFAULT_USER="amd"

# Вторая строчка нужна, чтобы zsh-syntax-highlighting работал корректно
source $ZSH/oh-my-zsh.sh
source /usr/local/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
```

![](https://s3.blog.amd-nick.me/2018/12/image-3.png)

# Ссылки

- [Англоязычная статья, которая меня вдохновила](https://medium.com/ayuth/iterm2-zsh-oh-my-zsh-the-most-power-full-of-terminal-on-macos-bdb2823fb04c) | [Вторая](https://medium.com/swlh/power-up-your-terminal-using-oh-my-zsh-iterm2-c5a03f73a9fb) | [Третья](https://dev.to/aspittel/my-terminal-setup-iterm2--zsh--30lm)
- [Заметка о теме Powerlevel9k с парочкой интересностей](https://gist.github.com/kevin-smets/8568070)

