# Docusaurus

Причины выбора после Ghost: [клик](/ghost-vs-docusaurus)

## notes

- Контент при клике на категорию определяется в файле с `{folder_name}/{folder_name}.md`
- Если файл начинается с header 1, то он определяет название страницы
- При переходе на typesense билд увеличился где-то на 10-20 сек. Думаю, фиксится удалением algolia из пакетов
- Для замены стандартной index страницы вроде в static удалил папку pages

### Перенос с Ghost

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

- [docs introduction](https://docusaurus.io/docs/docs-introduction)
- [routing](https://docusaurus.io/docs/advanced/routing)

