---
slug: /
id: root
sidebar_position: 1
---

# ❤️ Моя Wiki

Вдохновлен идеей [My Knowledge Wiki](https://wiki.nikiv.dev), но у меня менее хаотично-взрывной подход.

- Главное отличие `/docs` от [блога](/) в том, что **информация здесь динамична и может обновляться**.
- Следить за апдейтами и предложить свои правки можно здесь: [GitHub](https://github.com/AMD-NICK/blog.amd-nick.me/tree/main/docs).
- Здесь нет "старой" и "новой" информации, нет сортировки информации по дате, только навигация по темам в сайдбаре. Кликайте, изучайте.

:::tip
Рекомендую попробовать использовать поиск по сайту через `Ctrl + K` (cmd + k на mac)
:::

![](amd-headed-person.png)

_Запуск Crew Dragon от SpaceX_

## Редактирование этого сайта

Любой может поменять что-то на этом сайте.

Все пишется на Markdown, соответственно можно использовать любой удобный текстовый редактор, но я выбрал VScode.

В VScode использовал [Markdown Preview Enchanced](https://marketplace.visualstudio.com/items?itemName=shd101wyy.markdown-preview-enhanced) + [Markdown All In One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one), но сейчас использую стоковые возможности работы с .md файлами.

```bash
git clone https://github.com/AMD-NICK/blog.amd-nick.me.git
# открываем в VScode
code blog.amd-nick.me
# устанавливаем зависимости
yarn install
# запускаем сайт локально. Любое изменение файлов сразу отразится на сайте. Очень удобно
yarn dev [--port 12345]
# делаем коммит и пулл реквест
```
