---
title: Запускаем GoLang приложение с GitHub
date: '2019-10-02 10:37:00'
slug: golang-run-from-github
tags:
- notes
- programming
---

Итак, вы уже знаете какой-то язык, нашли GitHub репозиторий с проектом на Golang и решили его поковырять. В основах, как тру проггер разберетесь методом тыка, нужно как-то только начать. Hello World для слабаков

## Установка Golang:

Использую Ubuntu 18.04  
Я установил то, что было в системе: `apt update && apt install -y golang-go`  
Встала версия go1.10.4 ([свежая 1.13](https://golang.org/doc/devel/release.html))  
Установка свежего [описана тут](https://github.com/golang/go/wiki/Ubuntu)

## Запуск приложения с GitHub

Для примера возьмем [LazyDocker](https://github.com/jesseduffield/lazydocker).

1. Скачиваем: `go get github.com/jesseduffield/lazydocker`
2. Переходим в папку: `cd ~/go/src/github.com/jesseduffield/lazydocker` (вместо ~/go может быть другой путь. Смотрим `echo $GOPATH`)
3. Чтобы запустить приложение используем `go run main.go`. Чтобы сделать бинарник `go build -o lazydocker main.go`. Бинарник запускается через ./lazydocker и его можно переносить между системами с той же архитектурой, даже если там нет golang

## Бонус:

Документация `godoc fmt Println`  
Второе - название пакета, третье - функция

`godoc -http=":6060"` - запустит вебсервер с докой на :6060 порту

