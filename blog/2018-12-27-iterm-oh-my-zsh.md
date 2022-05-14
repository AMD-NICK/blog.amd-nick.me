---
layout: post
title: Oh My Zsh - Улучшаем iTerm
date: '2018-12-27 10:37:00'
---

<figure class="kg-card kg-image-card"><img src=" __GHOST_URL__ /content/images/2018/12/image-1.png" class="kg-image" alt loading="lazy"></figure>

Эта инструкция написана для Mac'овского iTerm, но при помощи несложных манипуляций может применяться и в других термианалах в т.ч. на удаленных Linux машинах

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
<!--kg-card-begin: markdown-->
# Установка HomeBrew

> Это аналог пакетного менеджера apt в Linux. Через него гораздо проще устанавливать многие вещи, вроде оболочки Zsh и многих плагинов для нее

В терминал прописываем

    xcode-select --install
    
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

<!--kg-card-end: markdown--><!--kg-card-begin: markdown-->
# Установка Zsh

> Оболочка, типа всем известного баша, но с кучей настроек и возможностей для кастомизации

В терминал:

    brew install zsh

<!--kg-card-end: markdown--><!--kg-card-begin: markdown-->
# Установка [Oh My Zsh](https://github.com/robbyrussell/oh-my-zsh)

> Oh My Zsh это фреймворк, через который и будет настраиваться Zsh. Не стоит их путать. Все необходимые нам настройки будут производиться с единственного файла.

Установка:

    sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"

<!--kg-card-end: markdown-->
# Меняем оболочку на Zsh

Открываем настройки iTerm \> Profiles \> Default \> Command: /bin/zsh  
При перезапуске iTerm у вас уже будет Zsh (пока что ненастроенный)

<figure class="kg-card kg-image-card kg-card-hascaption"><img src=" __GHOST_URL__ /content/images/2018/12/image-2.png" class="kg-image" alt loading="lazy"><figcaption>command &gt; /bin/zsh</figcaption></figure>

<!--kg-card-begin: markdown-->
# Установка цветовой схемы iTerm

1. Скачиваем [репозиторий с кучей-кучей схем](https://github.com/mbadolato/iTerm2-Color-Schemes)
2. В readme.md по скриншотам ищем схему, которая понравилась (у меня Afterglow. Люблю ее еще с Sublime Text 3)
3. Находим ее в repo/schemes и испортируем в iTerm через `Preferences > Profiles > Default > Colors > Color Presets... > Import`
<!--kg-card-end: markdown--><!--kg-card-begin: markdown-->
# Установка Powerline Fonts

> Нужны для корректного отображения символов во многих темах. Без него в темах могут быть закарлючки вместо иконок

Вводим:

    git clone https://github.com/powerline/fonts.git --depth=1 ; cd fonts
    ./install.sh
    cd .. ; rm -rf fonts

Изменяем в iTerm `Profiles > Default > Text > Change Font > Meslo LG S Regular For Powerline` (Последнее можете выбрать другое, но обязательно кириллический и для Powerline)

<!--kg-card-end: markdown--><!--kg-card-begin: markdown-->
# Установка темы для OMZ (Oh My Zsh)

> Тема и делает всю красоту: добавляет особые фичи, изменяет оформление и тд

Список стандартных тем можно посмотреть [здесь](https://github.com/robbyrussell/oh-my-zsh/wiki/themes)  
Я использую нестандартную [Powerlevel9k](https://github.com/bhilburn/powerlevel9k). Если хотите ее же:

    git clone https://github.com/bhilburn/powerlevel9k.git ~/.oh-my-zsh/custom/themes/powerlevel9k

Если вам приглянулась какая-то из стандартных, например, как мне, Agnoser, то переходим к следующим шагам, **игнорируя этот**. Установка самой темы будет в конце

<!--kg-card-end: markdown--><!--kg-card-begin: markdown-->
# Установка плагинов для OMZ

> Плагины добавляют новые алиасы к коммандам, а в некоторых случаях и изменяют вид терминала, например, при входе в папку .git репозитория

Список стандартных плагинов [здесь](https://github.com/robbyrussell/oh-my-zsh/tree/master/plugins). Я использую `git docker docker-compose osx zsh-syntax-highlighting`

Последний добавляет крутую подсветку синтаксиса для всего вводимого текста в терминал, но требует отдельной загрузки, тк не стандартный

    brew install zsh-syntax-highlighting

Ниже мы активируем его, другие плагины, темы и немного поправим настройки OMZ

<!--kg-card-end: markdown--><!--kg-card-begin: markdown-->
# Настройка Oh My Zsh

Устанавливаем скачанные плагины, темы, добавляем дополнительные настройки

    open ~/.zshrc

У меня конфиг выглядит так:

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
    

<!--kg-card-end: markdown--><figure class="kg-card kg-image-card"><img src=" __GHOST_URL__ /content/images/2018/12/image-3.png" class="kg-image" alt loading="lazy"></figure><!--kg-card-begin: markdown-->
# Ссылки

- [Англоязычная статья, которая меня вдохновила](https://medium.com/ayuth/iterm2-zsh-oh-my-zsh-the-most-power-full-of-terminal-on-macos-bdb2823fb04c) | [Вторая](https://medium.com/swlh/power-up-your-terminal-using-oh-my-zsh-iterm2-c5a03f73a9fb) | [Третья](https://dev.to/aspittel/my-terminal-setup-iterm2--zsh--30lm)
- [Заметка о теме Powerlevel9k с парочкой интересностей](https://gist.github.com/kevin-smets/8568070)
<!--kg-card-end: markdown-->