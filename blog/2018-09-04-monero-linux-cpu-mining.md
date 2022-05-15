---
title: Monero. Linux CPU mining (Ubuntu)
date: '2018-09-04 13:37:00'
slug: monero-linux-cpu-mining
---

Майнинг монеро основан на алгоритме CryptoNight, который устойчив к майнингу ASIC'ами. Особенностью алгоритма является возможность майнинга, как на CPU так и на GPU. У меня завалялось несколько серверов, поэтому я рассматриваю майнинг на CPU

<!--kg-card-begin: markdown-->
# Кошелек

Нам нужен кошелек, на который будут осуществляться выплаты. Рекомендуется скачать официальный кошелек и синхронизироваться с блокчейном монеро, но для начала подойдет и онлайн кошелек. Я использую [mymonero.com](https://mymonero.com/#/create-your-account)

<!--kg-card-end: markdown--><!--kg-card-begin: markdown-->
# Mining pool

Будем считать это нашим работодателем. Ваши сервера выполняют работу, отправляют результат в пул, а пул начисляет вам за это награду, вычитывая свою комиссию.

В основном пулы отличаются стабильностью (их часто DDoS'ят, а некоторые просто закрываются, унося с собой деньги пользователей), комиссией, а также минимальной суммой для выплаты.

Можете поискать себе пул здесь:

- [https://monero.org/xmr-monero-mining-pools-april-2018/](https://monero.org/xmr-monero-mining-pools-april-2018/)
- [https://monero.org/services/mining-pools/](https://monero.org/services/mining-pools/)

Я выбрал **minexmr.com**. У него большой аптайм, выплаты от 0.5 XMR и средняя комиссия - 1%

<!--kg-card-end: markdown--><!--kg-card-begin: markdown-->
# Как майнить Monero на Ubuntu 16.04 и выше

Не забудьте заменить YOUR\_ADDRESS\_HERE в последней команде

    apt-get -y install git automake autoconf pkg-config libcurl4-openssl-dev libjansson-dev libssl-dev libgmp-dev make g++
    
    git clone https://github.com/tpruvot/cpuminer-multi && cd cpuminer-multi/ && ./build.sh
    
    ./cpuminer -a cryptonight -o stratum+tcp://pool.minexmr.com:4444 -u YOUR_ADDRESS_HERE

<!--kg-card-end: markdown--><!--kg-card-begin: markdown-->
# Майнинг в фоне

Самый простой способ - через **screen**. Это консольный менеджер окон. Позволяет создавать виртуальные терминалы, выполнять в нех действия, переключаться между ними, отключаться и тд.

Установка  
`apt install screen`

Создаем фоновую "сессию"  
`screen -SU monero`

Запускаем майнер, как написано выше.

Можем отключиться от скрина сочетанием клавиш Ctrl + A + D. Чтобы подключиться заново, введите `screen -xU monero`

<!--kg-card-end: markdown--><!--kg-card-begin: markdown-->
# Проверка работы

Если вы все сделали правильно, то на сайте пула, который вы выбрали, **спустя пару минут** должна появиться информация о ваших воркерах (запущенных майнерах). У меня это страница [http://minexmr.com/#worker\_stats](http://minexmr.com/#worker_stats)

![monero-mining-workers-stats]( __GHOST_URL__ /content/images/2018/09/monero-mining-workers-stats.png)

Примерный вид выхлопа в терминале:  
 ![monero-cpuminer-multi-console-output]( __GHOST_URL__ /content/images/2018/09/monero-cpuminer-multi-console-output.png)

<!--kg-card-end: markdown--><!--kg-card-begin: markdown-->
## Задавайте свои вопросы в комментариях
<!--kg-card-end: markdown-->