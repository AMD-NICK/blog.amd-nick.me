---
title: Ghost CMS vs Docusaurus
slug: ghost-vs-docusaurus
tags: [docusaurus, blog, ghost, git, github, markdown, vercel]
---

![](https://d33wubrfki0l68.cloudfront.net/8164082c0ad2773310eba3f77725cb09cec0f815/ac8f5/assets/images/slash-introducing-411a16dd05086935b8e9ddae38ae9b45.svg)

Почти закончил переезд с [Ghost](https://ghost.org) на [Docusaurus](https://docusaurus.io), что дает целый ряд преимуществ.

:::info

Docusaurus это ГЕНЕРАТОР статичных сайтов. То, что вы видите (если я снова не сменил cms/фреймворк, что теперь как два пальца обоссать) – это где-то лежащий заранее скомпилированный html файлик. Ghost же "билдил" страничку каждый раз, когда на нее кто-то заходил

:::

<!--truncate-->

## Как Это Работает? В двух словах
Я пишу пост в [markdown](https://gist.github.com/cuonggt/9b7d08a597b167299f0d) файле. Чтобы его запостить, делаю `git push` с этим файлом в [репозиторий блога](https://github.com/AMD-NICK/blog.amd-nick.me) , затем [Vercel](http://vercel.com/) это замечает и выполняет "в репозиторие" `npm run build` (это создает статические файлики) и "выкидывает" все это добро на [docusaurustest-pi.vercel.app](https://docusaurustest-pi.vercel.app/). В DNS amd-nick.me прописал CNAME запись blog, которая ссылается на этот домен, чтобы использовать свой.

![](https://i.imgur.com/oS2gLpo.png)


## Преимущества

Чтобы не говнить Ghost напрямую, я просто опишу преимущества перехода на Docusaurus, которые я заметил УЖЕ, хотя тыкаю Docusaurus всего 2 дня

### База данных не нужна
Это отнимаем затраты энергии на ее содержание. А поскольку у меня на блог был отдельный сервер и все это крутилось в [docker](2019-11-02-ghost-traefik-v2.md), то например переезд на новый сервер и любое обновление было действительно проблемой

### Бесплатно
Для БД и обычной CMS нужен сервер. Для Docusaurus нужен только GitHub (или тот же GitLab) репозиторий. Бесплатный домен может выдать Vercel или Github Pages, а картинки хранит тот же GitHub, Imgur, Amazon S3 или что угодно другое

### Бекапы
GitHub хранит всю историю изменений бесплатно. Раньше приходилось платить за Amazon S3 для хранения бекапов и картинок

### Отказоустойчивость
Хочешь заддосить сайт – заддось Vercel или GitHub.

Также если раньше у хостинг-провайдеров происходили какие-то технические работы, то сайт, соответственно, не работал. Теперь за это отвечает GitHub и Vercel, а их инфраструктура поприличнее 1 отказного сервера

![](https://i.imgur.com/GOvOB1T.png)

### Скорость сайта
Весь сайт это набор html и js файликов, которые просто отдаются браузеру "как есть". Никакой код ничего не просчитывает каждый раз, когда на сайт кто-то заходит и с БД ничего не дергается.

### Редактирование
Страницы сайта можно создавать в разных форматах: .md, [.mdx](https://docusaurus.io/docs/markdown-features/react), .js, .jsx. Если не хватает возможностей одного – пиши на React что угодно.

И делать это можно с любой картошки, на которой есть текстовый редактор, [хоть с терминала](https://t.me/uFeed/130). Сейчас я хочу писать в [Obsidian](https://obsidian.md), завтра в [VSCode с плагинами](2022-05-12-macbook-apps-and-settings.md), послезавтра просто отредактирую [через интерфейс GitHub](https://github.com/AMD-NICK/blog.amd-nick.me/blob/571964cb2e0b34ced89c147868aa5873a1df3135/blog/2022-05-17-ghost-vs-docusaurus.md) и т.д.

![](https://i.imgur.com/yqZSuKG.jpg)


Картинки и гифки заливаю плагинами просто через `Ctrl + V` в Obsidian

Чтобы запостить, мне нужно просто сделать `git push`

### Переносимость
Markdown сверх универсальный язык. С md файлами можно переехать на любую другую платформу (в отличии от переезда на markdown формат с Ghost). Также Markdown легко конвертируется в html, png, pdf, docx и другие форматы

У [wiki.nikiv.dev](https://wiki.nikiv.dev/ "https://wiki.nikiv.dev") тысячи файлов и он за пару часов перешел с GitBook на Docusaurus благодаря переносимости markdown. Мне для переноса с Ghost потребовалось 2 дня на гораздо меньший объем файлов

### Поиск по сайту
"С коробки" доступен ElasticSearch поисковик [Algolia](https://docusaurus.io/docs/search#using-algolia-docsearch) через  Ctrl + K. Для установки достаточно просто подредачить конфиг. Если Algolia не подходит, то есть еще Open Source [Typesense](https://docusaurus.io/docs/search#using-typesense-docsearch).

![](https://i.imgur.com/598t5la.png)

Работает очень шустро сразу показывая найденные результаты без лишних кликов

### Хоть blog, хоть docs, хоть page
Docusaurus это не только для блогов. Еще это фреймворк для написания документации, а также создания других статических страничек, как например у меня [about страница](about)

![](https://i.imgur.com/AwyAlst.jpg)

Вот здесь можно посмотреть что еще люди делают на нем: https://docusaurus.io/showcase

### Приятные бонусы
- Все ссылки с прошлого блога остались рабочими
- Если есть сломанные ссылки на другие посты, то при билде вылезает ошибка, чтобы заметить это
- Кроме относительных и абсолютных ссылок можно указывать относительный путь к файлу и оно само определит ссылку для этого файла
- В Ghost нельзя было использовать Emoji 😡