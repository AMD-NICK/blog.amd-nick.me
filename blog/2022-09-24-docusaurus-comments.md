---
title: "Добавляем комментарии в Docusaurus"
date: '2022-09-24 16:02'
slug: docusaurus-comments
tags: [docusaurus, blog, utterances, disqus]
image: https://i.imgur.com/1KYfkV9.png
---

![demo](https://i.imgur.com/1KYfkV9.png)

> **[utterances](https://utteranc.es)** 🔮 это простой виджет комментарирования, который хранит комменты в GitHub Issues. К комментам применяются все плюшки, которые есть на GitHub. Все это бесплатно 🆓, Open Source 😻 и не отправляет кучу аналитики, как тот же Discourse

:::note
Инструкция подойдет и для Disqus, но я его хейчу, так что если вы хотите использовать его, то я вам не помощник
:::

<!--truncate-->

Этот пост по сути взят [отсюда](https://jbl428.github.io/2021/10/19/utterances/), но там все на корейском и я столкнулся с нюансами, которые там не описаны. **Мой пост не является переводом**.

## 👾 Подготовка

В папке с Docusaurus пишем `npm run start`. Просто чтобы убедиться, что все работает до того, как мы что-то там напортачим. Ну, чтобы если что-то сломается, то понимать, когда это произошло.

![У меня было сломано](https://i.imgur.com/jvK5OrY.png)

Мне параллельно предложило обновить Docusaurus и я сделал это

![Предложение обновиться](https://i.imgur.com/97mHZaG.png)

## 🦧 Установка

В исходном посте у [корейца был .tsx файл](https://github.com/jbl428/jbl428.github.io/blob/main/src/theme/BlogPostItem.tsx), я его скопировал вставил себе (не делайте так) и Docusaurus выдавал мне ошибку, пока я не ввел эту команду

```bash
# Создаст файл src/theme/BlogPostItem/index.js
yarn run swizzle @docusaurus/theme-classic BlogPostItem -- --wrap

# Для удобства и симметрии я сделал так:
mv src/theme/BlogPostItem/index.js src/theme/BlogPostItem.tsx
rm -r src/theme/BlogPostItem # уже мусорная папка
```

Открываем `src/theme/BlogPostItem.tsx` и засовываем туда [вот это вот добро](https://github.com/AMD-NICK/blog.amd-nick.me/blob/main/src/theme/BlogPostItem.tsx), параллельно изменяя значения в `script.setAttribute`. Конфигуратор параметров тут: https://utteranc.es/

# 🫡
