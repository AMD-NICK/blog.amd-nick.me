---
tags: [soft, tailscale, admin]
---

# Ошибка 451, 403 при установке Tailscale

Возникает при попытке установки Tailscale на хостах в некоторых странах.

```bash
root@s:~/tailscale# curl -fsSL https://tailscale.com/install.sh | sh
   The installer cannot reach https://pkgs.tailscale.com/
   Please make sure that your machine has internet access.
   Test output:
   curl: (22) The requested URL returned error: 451
```

![Скриншот с терминала. Ошибка apt update](tailscale-installation-error-451.png)

## Вкратце:

1. Добываем прокси нейтральной страны. Ниже подскажу где быстро, дешево, удобно
2. Выполняем команды установки Tailscale с указанием прокси

<!--truncate-->

## Прокси

Нужен socks5 прокси. Можно попробовать найти в бесплатных списках в интернете, но скорее всего, вы потратите на это час времени, а потом все равно купите нормальный прокси.

Лично я покупал на proxy6.net за 30 руб (это на 1 месяц). Выдача мгновенная, панель удобная.

Ниже прокси мне уже не нужен, действует до `18.09.24, 17:36`, если успели, то пользуйтесь.

![proxy6 panel demo](proxy6-dashboard.png)

## Установка Tailscale.

Socks5 прокси добыли? Сделайте с него примерно такую строку: `socks5h://fLonRW:33hAe6@200.71.126.127:9847`. Пригодится.

Идем сюда: [клик](https://pkgs.tailscale.com/stable/#ubuntu-focal). Это мануал инструкция по установке Tailscale. [Эту](https://tailscale.com/download/linux) не используем. В моем случае с Ubuntu 20.04 инструкция выглядит так:

![Инструкция по установке Tailscale на Ubuntu Focal](ubuntu-focal-tailscale-install-guide.png)

### curl

В команды `curl` перед `-fsSL` вставляем `--proxy наша_подготовленная_строка`, чтобы получилось примерно так:

```bash
# обращаем внимание на --proxy.
# далаем так для каждого curl из инструкции
curl --proxy socks5h://fLonRW:33hAe6@200.71.126.127:9847 -fsSL https://pkgs.tailscale.com/stable/ubuntu/focal.noarmor.gpg | sudo tee /usr/share/keyrings/tailscale-archive-keyring.gpg >/dev/null
```

### apt

С ним придется создать, затем удалить файлик, где мы пропишем прокси. Параметром команды никак, увы.

```bash
# создайте файл /etc/apt/apt.conf.d/proxy.conf
# в него поместите ваши прокси (лучше все 3)
Acquire::http::Proxy "socks5h://fLonRW:33hAe6@200.71.126.127:9847";
Acquire::https::Proxy "socks5h://fLonRW:33hAe6@200.71.126.127:9847";
Acquire::socks::Proxy "socks5h://fLonRW:33hAe6@200.71.126.127:9847";
```

После этого сделайте `apt update`, `sudo apt install tailscale` и удалите файлик с прокси: `sudo rm /etc/apt/apt.conf.d/proxy.conf`
