# Amazon Web Services

Все в одном. Сложно, дорого, не знаю почему выбрал его

## Использую

- S3 для бэкапов и загрузок форума
- SES для отправки писем с форума
- CloudFront CDN для S3, чтобы уменьшить расходы и вроде чтобы https работал на S3

## Заметки

- Регион имеет значение. Следим, чтобы сверху справа всегда был нужный регион. Сервисы закрепляются за регионом

---

## S3

Файловое хранилище. Использую для бекапов и для хранения аттачментов двух форумов

#todo цены

Возможные аналоги: Wasabi (дешевле, тоже есть S3), Storj 150 гб бесплатно, децентрализация

- [Пост про настройку S3 для Ghost CMS](/ghost-s3)

## SES

Сервис отправки Email сообщений

Можно отправлять через cli, SMTP или API. Использую SMTP

#todo цены

Аналоги: MailJet 25$ мес 1000 писем, MailGun не помню

### Заметки

- По умолчанию домен добавляется в SandBox. С него нельзя слать на неподтвержденные email. Для теста нужно подтвердить
- Для отправки с Discourse с включенным по умолчанию STARTTLS порт должен быть 587, а не тот, что публично говорит Amazon
- Скрипты для теста

```bash email.sh
curl --ssl-reqd \
  --url 'smtps://email-smtp.us-east-1.amazonaws.com:465' \
  --user 'IAM_USER:IAM_PASS' \
  --mail-from 'любой email с подтвержденного домена' \
  --mail-rcpt 'email получателя' \
  --upload-file mail.txt
```

``` mail.txt
From: "GMD Forum" <email@sender.com>
To: "Mail Test" <email@rcpt.com>
Subject: Test message

Bla bla bla
Кириллица
```

### Ссылки

- [Проверка настройки домена в SES через панель](https://aws.amazon.com/ru/getting-started/hands-on/send-an-email/)
