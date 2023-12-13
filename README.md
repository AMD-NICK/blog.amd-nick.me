# blog.amd-nick.me

- WordPress 2014-2018
- Ghost 2018-2022
- Docusaurus 2022-?

Перенос своего [блога](https://blog.amd-nick.me) с Ghost на GitHub.

![Graph блога на 2022-05-21 15:35:51](https://i.imgur.com/zzVv8RJ.png)
_Граф построен при помощи Obsidian_ (не помню когда)

Сайт теперь использует [Docusaurus 2](https://docusaurus.io/) – генератор статичных веб сайтов.

Вопросы и предложения можно оставить в Issues. Исправления ошибок через Pull Request.

Вдохновлен идеей [Nikita Voloboev – Everything I Know](https://wiki.nikiv.dev)

---

### Как это работает?

Любой коммит запускает Vercel App, а он билдит сайт и бесплатно хостит его на своих серверах. Для красивой ссылки в CloudFlare прописан CNAME, который ссылается на ссылку, что выдал Vercel.

Подробнее я писал [вот тут](./blog/2022-05-17-ghost-vs-docusaurus.md)

### Заметки:

- Локальный запуск для проверки поста: `yarn run start`
