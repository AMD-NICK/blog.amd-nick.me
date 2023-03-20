# OpenResty

## Логирование и отладка
- Отключение луа кеша, чтобы изменения применялись мгновенно `lua_code_cache off;`
- `docker-compose exec nginx -s reload` при обновлении .conf или .lua файлов (если кеш включен)
- `tail -fn 100 /path_to/error.log`
- Стандартный уровень логгинга в рести принтит `ngx.STDERR ngx.EMERG ngx.ALERT ngx.CRIT ngx.ERR`, а `ngx.WARN ngx.NOTICE ngx.INFO ngx.DEBUG` нет. Как мне мне, то лучше для error.log делать level warn, ибо ниже там флуд и говно

## Notes

**Ссылка по частям**. Тут не хватает `ngx.var.args` и мб `ngx.req.get_uri_args()`. [Еще с args](https://stackoverflow.com/a/53260126/6490118)

```lua
local full_url = ngx.var.scheme.."://"..ngx.var.http_host..ngx.var.request_uri
if ngx.var.query_string ~= nil then
  full_url = full_url.."?"..ngx.var.query_string
end
ngx.say(full_url)
```

**Функции времени**. Есть еще. Ниже ссылка на `extra TIME locations`

```lua
os.time() == ngx.time() == 1678064879
ngx.today() == "2023-03-06"
ngx.localtime() == "2023-03-06 01:07:59"
ngx.now() == 1678064879.458
```

## Ссылки

- [Flow of lua nginx module directives](https://openresty-reference.readthedocs.io/en/latest/Directives/)
  ![](https://cloud.githubusercontent.com/assets/2137369/15272097/77d1c09e-1a37-11e6-97ef-d9767035fc3e.png)
- [SSL Configuration Generator](https://ssl-config.mozilla.org) - генерация базового конфига с cipher

- [Добавление хедера](https://gist.github.com/es/ef4da0558c23f8a9e83d1f54ae12bca9). `header_filter_by_lua_block`
- [Выполнение запроса к хосту и /healthcheck](https://gist.github.com/sabretus/6002af0a9dd3a4401adafacaa67caa7f). `access_by_lua_block`
  Теги: `http.new()`, `:request_uri(`, `ngx.status`, `ngx.HTTP_SERVICE_UNAVAILABLE`, `ngx.exit`
- [Пушит метрики в Prometheus](https://gist.github.com/katzefudder/a244bd2123838ec8a0cc87b6b942f299). `content_by_lua`, `log_by_lua_block`, `init_worker_by_lua_block`
  Теги: `opm get knyar/nginx-lua-prometheus`
- [Логирование body запроса и ответа](https://gist.github.com/RavenZZ/e7cd969702969fb1ad94f508eb2d48ed). `lua_need_request_body`, `body_filter_by_lua`
- [Объединение 2 запросов](https://gist.github.com/RavenZZ/667fb1a06de18f20bea946f276937847). `content_by_lua_block`
  Теги: `ngx.req.read_body()`, `ngx.req.get_body_data()`, `ngx.HTTP_GET`, `init_by_lua` (оптимизация загрузки cjson), `ngx.location.capture_multi(reqs)`
- [extra TIME locations](https://gist.github.com/pahud/8c5b945cf86f3d4fcb60). Респонсы не смотрел
  Теги: `ngx.time()`, `ngx.today()`, `ngx.http_time( ngx.now() )`, `ngx.cookie_time( ngx.now() )`, `ngx.utctime()`, `ngx.localtime()`, `ngx.now()`
- [Переиспользование redis соединения](https://gist.github.com/tolitius/23c1db2a69f3de8ec447d7b1e879e648). set_keepalive использовать вместо close.
  Теги: `red:set_keepalive()`, `red:get_reused_times()`
