# Docusaurus

Генератор статичных сайтов. Подходит для блогов, документаций, даже лендинг страниц. Не требует своего хостинга, легко редактируется с любого устройства. Работает на Vercel, markdown хранится на GitHub

## Полезно знать

- Контент при клике на категорию определяется в файле с `{folder_name}/{folder_name}.md`
- Если файл начинается с header 1, то он определяет название страницы
- При переходе на typesense билд увеличился где-то на 10-20 сек. Думаю, фиксится удалением algolia из пакетов
- Algolia подтверждала заявку на подключение к ним где-то месяц
- Для замены стандартной index страницы вроде в static удалил папку pages
- Стиль этого сайта писал не я, а взял с другого. Искал стили через гитхаб поиск вот так: `path:/src/css/custom.css --ifm-font-family-base`

### Перенос с Ghost

Причины перехода с Ghost: [клик](/ghost-vs-docusaurus)

- Чтобы ссылки с Ghost продолжили работать, нужно было blog поместить на /. Делается через routeBasePath = "/" для presets.blog в конфиге. Без этого ссылки были в site.com/blog/slug
- В каждом посте сверху файла есть front-matter блок, где в каждом указан slug со старого блога
- Посты с Ghost экспортировал в Markdown через [эту тулзу](https://github.com/eloyesp/Jekyll_ghost_importer)
- Посты были экспортированы с неправильной датой. Пришлось добавлять +3 часа через самописный мини-скрипт (или вручную)
- Во многих постах были огрызки HTML. Их пришлось вручную заменять на markdown (Ctrl + F > `<figure`, `<!--kg-card-begin`, `<!--kg-card-end`)
- Вручную нужно было искать и заменять `__GHOST_URL__` на правильные ссылки
- Docusaurus впервые в репе деплоился через vercel, но он установил устаревшую версию

---

# Markdown заметки

## Выделение строк кода

```md {3-5}
### This

## Is

# Markdown

---

fux
```

## Admonitions

:::note
Some **content** with _markdown_ `syntax`. Check [this `api`](#).
:::

:::tip
Some **content** with _markdown_ `syntax`. Check [this `api`](#).
:::

:::info
Some **content** with _markdown_ `syntax`. Check [this `api`](#).
:::

:::caution
Some **content** with _markdown_ `syntax`. Check [this `api`](#).
:::

:::danger
Some **content** with _markdown_ `syntax`. Check [this `api`](#).
:::

---

## links

- [Поддержка дополнительных подсветок синтаксисов](https://docusaurus.io/docs/markdown-features/code-blocks#supported-languages)
