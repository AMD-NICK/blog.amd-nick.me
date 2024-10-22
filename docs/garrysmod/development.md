# Разработка

- Все, что в Steam Workshop – [по сути OpenSource](https://steamworkshopdownloader.io). Много контента для серверов можно [взять тут](https://steamcommunity.com/app/4000/workshop/). Купить что-то уникальное [можно тут](https://www.gmodstore.com)
- В `/garrysmod/lua` не нужно добавлять никакие файлы, кроме .dll в `lua/bin`. Это усложняет бекап, переносы и обновления. Часто туда кидают workshop.lua, он должен быть в `addons/somename/lua/autorun/server/workshop.lua`

- [Эффективная разработка](/gmod-development) 2020 пост
- [Обучение разработке](https://wiki.facepunch.com/gmod#learning) ссылка на вики

## Полезная информация

### Отправка ошибок на Webhook URL

Сущестует ConVar `lua_error_url`, который если указать, то сервер будет отправлять ошибки на указанный вебхук. [Подробнее тут](https://wiki.facepunch.com/gmod/Lua_Error_Logging).

### Прочая информация

- Консольная команда `lua_dumptimers_sv` выведет все активные таймеры на сервере. Заменив в конце sv на cl можно получить данные про клиентские


## Репозитории

Жирным выделены те, которые особо ценны для меня.

- Tags: [garrysmod](https://github.com/topics/garrysmod) | [glua](https://github.com/topics/glua) | [garrys-mod](https://github.com/topics/garrys-mod)
- **[ggram](https://github.com/TRIGONIM/ggram) фреймворк для написания ботов на чистом Lua (не в гмоде) и Glua (в гмоде)**
- [gmod wiki scraper](https://github.com/NullEnt1ty/gmod-wiki-scraper) парсит Gmod Wiki в удобночитаемый вид
- **[xFuscator](https://github.com/superfsm/XFuscator) обфускатор, но не поддерживает glua штуки: `continue / ! / != / goto`**
- [murder GM](https://github.com/MechanicalMind/murder) игровой режим, где кто-то из игроков - тайный убийца с ножом. Брал отсюда подсветку шагов и перенос трупов
- [darkrp GM](https://github.com/FPtje/DarkRP) самый популярный Roleplay режим
- **[Перма недвижимость для RP серверов](https://github.com/ExtReMLapin/gHomes) бесплатный скрипт, чтобы покупать дома на RP серверах**
- [ArcCW](https://github.com/HaodongMo/ArcCW) оружие в Garry's Mod. Упор на реализм, аттачменты
- [Royal Derma Designer](https://github.com/glua/Royal-Derma-Designer) внутриигровой редактор VGUI (не тестировал)
- [weapon switcher skeleton](https://github.com/Kefta/Weapon-Switcher-Skeleton) поможет быстрее написать переключатель оружия
- [circles](https://github.com/SneakySquid/Circles) рисовка кругов и всего круглого
- **[lua-promises](https://github.com/zserge/lua-promises) помогает избежать пирамид кода.** Использую повсеместно. P.S. error внутри цепочки приводит к reject (важно это помнить, если будете юзать)
- [TrackAssemblyTool](https://github.com/dvdvideo1234/TrackAssemblyTool) я не понимаю, что это такое, но очень интересно
- [animationsapi](https://github.com/JetBoom/animationsapi) тоже не понимаю, но интересно
- **[medialib](https://github.com/wyozi/gmod-medialib) воспроизведение контента с интернета (например, youtube)**
- [payday 2 hud](https://github.com/Kamikaze94/WolfHUD)
- **[EPOE](https://github.com/Metastruct/EPOE) серверная консоль внутри игры**
- **[luadev](https://github.com/Metastruct/luadev) использую в комбинации с [плагином](https://marketplace.visualstudio.com/items?itemName=lixquid.gmod-luadev) для VSCode для выполнения кода без отправки по SFTP**
- [map mirror](https://github.com/bmwalters/mapmirror) как шутка на 1 апреля. Зеркалирует вид карты
- **[FProfiler](https://github.com/FPtje/FProfiler) поиск медленных участков кода для оптимизации**
- **[GLuaFixer](https://github.com/FPtje/GLuaFixer) линтер**. Использовал в VScode, SublimeText и даже [Git Action](https://github.com/TRIGONIM/ggram/blob/main/.github/workflows/lint.yml)
- [Neustart](https://github.com/SuperiorServers/Neustart) перезапускает gmod сервер на винде, если он "упал" и не только гмод
- [lockbox](https://github.com/somesocks/lua-lockbox) криптографические алгоритмы на чистом Lua
- [msgpack](https://github.com/kieselsteini/msgpack) реализация [msgpack](https://msgpack.org) в Lua (энкодер, декодер)
- [emojichat](https://github.com/BadgerCode/emojichat) чат
- [EasyChat](https://github.com/Earu/EasyChat) чат
- **[Sit-Anywhere](https://github.com/Xerasin/Sit-Anywhere) сидеть на пропах**. Какой-то [форк](https://github.com/TheXYZNetwork/SIMPSit)

### Библиотеки

Имею в виду набор наборов функций :)

- [hooks lib](https://github.com/Srlion/Hook-Library) альтернативная hook библиотека. Быстрее стандартной
- [hooks lib by SuperiorServers](https://github.com/SuperiorServers/dash/blob/master/lua/dash/libraries/hook.lua) еще одна
- **[dash lib](https://github.com/SuperiorServers/dash) много крутых штук для gmod сервера. Почти все использую**
- [gmod misc](https://github.com/bmwalters/gmod-misc)
- **[fn lib](https://github.com/FPtje/GModFunctional) функциональное программирование**
- **[lua moses](https://github.com/Yonaba/Moses/blob/master/moses.lua) беру отсюда функции для функциональной разработки**
- **[tdLib](https://github.com/Threebow/tdlib) фреймворк, ускоряющий разработку UI в Garry's Mod**
- [gs_lib](https://github.com/Kefta/gs_lib/tree/master/lua/code_gs/lib)
- [optimaize_gmod](https://github.com/realpack/optimaize_gmod) оптимизация Garry's Mod
- [darkrp-addons](https://github.com/OverlordAkise/darkrp-addons) большой набор самописов для DarkRP
- [Jackarunda/gmod](https://github.com/Jackarunda/gmod/tree/master/lua/jmod) куча всякого

### DLL

Кидать в /lua/bin. Папки bin может не быть, нужно создать

- [gm_redis](https://github.com/SuperiorServers/gm_redis) поддержка REDIS (использую [с этим](https://github.com/SuperiorServers/dash/tree/master/lua/dash/libraries/server/redis))
- [gm_tmysql4](https://github.com/SuperiorServers/gm_tmysql4) dll для работы с MySQL. Использую с [этой](https://github.com/SuperiorServers/dash/blob/master/lua/dash/libraries/server/mysql.lua) либой
- [mysqloo](https://github.com/FredyH/MySQLOO) еще одна dll для работы с MySQL в Garry's Mod
- [gmsv_seversecure](https://github.com/danielga/gmsv_serversecure) защита от некоторых эксплойтов движка
- [gmod-chttp](https://github.com/timschumi/gmod-chttp) http запросы без ограничений

## Ссылки
- [Локализированная защита от подмены SteamID](https://github.com/Metastruct/luadev/pull/14/files) git commit
- [print(glua koders)](https://t.me/+pf3ZgCscKR85ZmIy) изначально шуточный Telegram чат, где могут помочь по glua вопросам
