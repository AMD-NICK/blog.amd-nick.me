# Разработка пакета

## Заметки

- Советую исходники кидать в корне репа в папку lua. Тогда это будет похоже и на аддон для garrysmod и также принято luarocks как стандартная папка с исходниками, поэтому автоматически подхватится например этим GitHub Action: [luarocks-tag-release](https://github.com/nvim-neorocks/luarocks-tag-release/)
- Возиться с rockspec файлами это тот еще геморрой. Упомянутый выше аддон позволяет избежать головной боли и делать релизы [автоматически без особых настроек](https://github.com/TRIGONIM/lua-express/blob/main/.github/workflows/luarocks-release.yml)
- Если вы написали модуль и используете его в Docker имейдже, то может возникнуть дискомфорт с отладкой или микроправками в нем. Например, я использую `lua-gmod-lib` в образе с одним API микросервисом и одна функция работает не так, как ожидается. Чтобы ее отдебажить надо либо пересобрать образ с обновленной библиотекой, либо можно инжектнуть dev версию прямо внутрь образа через volumes, примерно так: `$PWD/../lua-gmod-lib:/usr/local/share/lua/5.1/lua-gmod-lib:ro`
- В lua это нормально, что нужно долбаться с env `LUA_PATH` и `LUA_CPATH`. Ну или `package.path` и `package.cpath`. Советую первое: один раз настроил и забыл. Второе больше для отладки и тестов, как тут: [copas errhandlers test](https://github.com/lunarmodules/copas/blob/c262fadecab29ca8670b8a1cf1550508202fadec/tests/errhandlers.lua#L6)
