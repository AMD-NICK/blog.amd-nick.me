---
title: "Добавляем комментарии в Docusaurus"
date: '2022-09-24 16:02'
slug: docusaurus-comments
tags: [docusaurus, blog, utterances, gisqus, disqus]
image: https://i.imgur.com/1KYfkV9.png
---

![gisqus](https://i.imgur.com/wDdcyD5.png)

Рассматрим 2 варианта добавления комментов: gisqus и utterances. Оба решения бесплатные 🆓, Open Source 😻 и не отправляют кучу аналитики, как мерзкий Disqus. **Для комментирования требуют GitHub аккаунт** (но у кого его нет..)

Их **главное** отличие в том, что gisqus хранит комменты в **Discussions** репозитория, а utterances в **Issues**. Еще gisqus имеет больше настроек и API

:::note
Инструкция подойдет и для **Disqus**, но я его хейчу, так что если вы хотите использовать его, то я вам не помощник
:::

<!--truncate-->

> Часть поста про utterances по сути взята [отсюда](https://jbl428.github.io/2021/10/19/utterances/), но там все на корейском и я столкнулся с нюансами, которые там не описаны. **Мой пост не является переводом**.

## 👾 Подготовка

В папке с Docusaurus пишем `npm run start`. Просто чтобы убедиться, что все работает до того, как мы что-то там напортачим. Ну, чтобы если что-то сломается, то понимать, когда это произошло.

![У меня было сломано](https://i.imgur.com/jvK5OrY.png)

Мне параллельно предложило обновить Docusaurus и я сделал это

![Предложение обновиться](https://i.imgur.com/97mHZaG.png)

---

Я не сильно джаваскриптер и не знаю, почему так получилось, но если просто создать файл с кодом, то Docusaurus выдавал ошибку, поэтому нужно создать файл командой, и уже затем заменить его на код с нужной вам интеграцией.

```bash
# Создаст файл src/theme/BlogPostItem/index.js
yarn run swizzle @docusaurus/theme-classic BlogPostItem -- --wrap

# Для удобства и симметрии я сделал так:
mv src/theme/BlogPostItem/index.js src/theme/BlogPostItem.tsx
rm -r src/theme/BlogPostItem # уже мусорная папка
```

Открываем `src/theme/BlogPostItem.tsx` и засовываем туда вариант интеграции, который вам больше по душе:

### utterances 🔮

Конфигуратор параметров и Demo тут: https://utteranc.es/

![utterances](https://i.imgur.com/1KYfkV9.png)

🧑‍💻 [Код для utterances](https://github.com/AMD-NICK/blog.amd-nick.me/blob/23d13cb6bb856ec7f4e8fc4ffd5fe6eb143c8d5d/src/theme/BlogPostItem.tsx)


### gisqus 💎

Конфигуратор параметров и Demo тут: https://giscus.app/ru

![gisqus](https://i.imgur.com/wDdcyD5.png)

🧑‍💻 [Код для gisqus](foobar.com)

# 🫡
