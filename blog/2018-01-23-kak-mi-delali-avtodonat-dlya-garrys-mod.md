---
layout: post
title: Как мы gm-donate.ru открывали
date: '2018-01-23 15:39:00'
tags:
- gm-donate
- garrys-mod
---

gm-donate.ru — система автоматического приема и обработки донатов (пожертвований) для Garry’s Mod серверов. **Простыми словами – [автодонат для гмод серверов](https://gm-donate.ru/).**

GMD — это вторая попытка сделать качественный сервис для автоматизации донатов и мне кажется, она удалась.

# Зарождение идеи

Идея автоматизировать прием донатов и выдачу услуг пришла после общения с очередным человеком, которому пришлось пол часа объяснять, что его не обманут и как пользоваться услугой. Я человек нервный, подобные разговоры нередко выводили меня из себя, а когда я прикидывал, сколько времени на них потратил и сколько еще потрачу, то решил процесс автоматизировать

* * *

# Неудачная попытка автоматизации

Когда-то я даже пытался делать что-то вроде купонов для пополнения счета и продавать их через plati.ru, но вскоре понял, что я идиот. Это не только увеличило количество вопросов, но и забрало еще больше времени на создание этих кодов и их обработку

* * *

# Первый шаг в нужном направлении

Пока игроки каждые пол часа наяривали мне в личку, я занимался поиском платежного агрегатора.

Это такой сервис, который предоставляет удобный интерфейс для работы сразу с множеством платежных систем за процент от транзакций.

Убив не один день на поиски, пришел к выводу, что без персонального аттестата WebMoney согласны работать только какие-то бомжегрегаторы.

Кстати говоря, получал я его достаточно долго. Там возникали какие-то проблемы с документами, оплатой, а также поездками для встречи с самим аттестатором, чтобы выслушать устрашающие (правда устрашающие) морали об ответственности. Кататься пришлось не один раз, но не помню почему.

1 апреля 2016, пока другие [смеялись над белыми спинами](https://ru.wikipedia.org/wiki/%D0%94%D0%B5%D0%BD%D1%8C_%D1%81%D0%BC%D0%B5%D1%85%D0%B0), я наблюдал надпись «Одобрено» в панели управления unitpay.ru — агрегаторе, с которым я решил работать. _upd. позже мы заключили договора сразу с несколькими другими агрегаторами, чтобы выбрать у каждого лучшие из условий_

* * *

# Начало работы

Пошла жара. Все идеи, которые я месяцами вынашивал в своей голове или записывал на задних страницах своих тетрадей начали превращаться в строки говнокода.

Тогда я был слишком глуп, чтобы осознать, что пишу код скрипта, который не поддается дальнейшей поддержке. Это был практически монолитный кусок говна, который я гордо называл «автодонат». Добавить в него новые услуги или информацию без моего мозга было нереально, но зато это работало и приносило реальную прибыль.

* * *

# Кстати, о прибыли

Спустя пару месяцев вместе с осознанием ущербности своего творения, я заметил, что донаты выросли в среднем в 2-3 раза, при этом я практически перестал общаться на эту тему с игроками, ведь все происходило на автомате. И почему я раньше так не сделал? Был бы на пару сотен тыщ богаче.

* * *

# Автодонат - говно

Код первого автодоната был настолько "крут", что когда очередной раз потребовалось добавление новой категории услуг, то я решил, что мне проще будет написать новый продукт, чем тыкать палкой этот.

Кстати, вот некоторые моменты с разработки его интерфейса:

> [gm-donate.ru IGS #1](//imgur.com/2R6A9)

<script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

Отложив новые услуги на потом, я начал рожать идеи для второй версии. Они должны были решить туеву хучу ошибок первой, а также иметь плюшки для еще большего увеличения профитов.

Заняло это «всего-то лишь 2 месяца», из которых одна лишь неделя на продумывание технической части и плюшек, а остальное на интерфейс, который в день начала работ был переосмыслен и к окончанию стал совсем не похож на то, что я понавыдумывал ? В общем, со сроками я справился на «ура». Ненавижу UI.

Я уже не помню, сколько времени потратил на написание первоначального кода, но точно помню, как матерился, пока писал интерфейс. Все это помнят. Он, как и во время придумывания, занял 90% времени разработки.

> [gm-donate.ru IGS #2](//imgur.com/0YPle)

<script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

И так неделя, вторая, третья, продукт становится пригодным к употреблению. Переношу конфиг, добавляю новые задуманные услуги, последние тесты, фанфары, обратный отсчет, релиз на мастер-сервер. Работает! Можно и выпить минералки.

* * *

# Я зря работал?

Новый автодонат увеличил прибыль проекта, но с количеством игроков на сервере, которое тогда уже сильно упало, это практически не имело значения.

Во время второй версии я договорился с некоторыми знакомыми и они также пользовались моим первым автодонатом. За это я брал с них какой-то процент, который со всех тех проектов меня устраивал, а знакомых устраивал автоматизм и увеличенный доход.

Думать долго не пришлось — вторая версия автодоната начала затачиваться под широкую аудиторию.

* * *

# Я теперь не один

К этому времени я неплохо разбирался в lua, но ужасно в веб разработке. Мне нужен был человек, который займется этим. Я начал работать с тем, кого за несколько лет до этого банил перманентным баном на совсем чужом проекте, совсем не зная, кто это и уж точно не предполагая, что когда-то мы будем работать вместе :). Так GMD превратился в командный проект.

* * *

# Проблемы работы в команде

> Хочешь идти быстро — иди один. Хочешь идти далеко — идите вместе

Будущее проекта вставало под вопрос каждый раз, когда надо было что-то делать.

Сотрудничество началось с того, что мы с шаблоном сайта посрались (никто не хотел иметь дела с фронт-ендом), а потом срались «просто потому что должны» (с)

Так бывает, когда члены команды не знают кто и за что отвечает или когда нет начальника, но есть разногласия.

Конфликты, кстати, происходят до сих пор, но все же меньше, поскольку мы кое-как да распределили сферы своей деятельности. Хотя из-за них много амбициозных идей остаются лишь идеями — у напарника редко есть желание делать что-то новое, а у меня ругаться и платить фрилансерам или учиться самому. Замкнутый круг. Возможно, нам нужен тим лид?

* * *

# Окей, поехали!

Все началось с того, что я перевел своих прошлых знакомых, которые использовали IGS #1 на IGS #2 (InGameShop. Так называлась часть автодоната (плагин), которую владельцы серверов должны были установить у себя на проектах)

Все шло хорошо, а что не хорошо, то быстро устранялось. Становилось ясно, что пора набирать клиентскую базу.

Сообщения некоторым знакомым, а также владельцам неизвестных серверов и у нас есть клиенты! Хорошие и плохие..

* * *

# "Че ты мне тут втираешь?"

Я ненавижу общаться с владельцами гмод серверов (конечно же, не со всеми). Это просто толпа народа, каждый член которой живет на своем острове и не хочет принимать ничье мнение, кроме своего. «Я тут главный. Я лучше знаю, что мне нужно»

Навскидку 80% тех, кому я писал насчет автодоната сразу или не сразу грубо или деликатно, но посылали меня на@@й. Я уже [писал об этом здесь]( __GHOST_URL__ /chelovecheskaya-glupost/), поэтому не буду повторяться.

Очень трудно (невозможно) найти общий язык с многими из них, а те, с кем удалось — исключение из исключений. Эти «исключения» готовы доверить нам свои деньги и платить за повышение личной прибыли и сокращение временных расходов на обслуживание донатеров, но пока на таких наткнешься, то на голове уже не останется волос.

В первое время это очень сильно разряжало и дизморалило. После попыток привлечения новых владельцев серверов просто не хватало энергии ни на что, кроме как на залип в потолок с меланхолией в наушниках. Затем я просто решил, что это естественный отбор и им не суждено заработать. Перестал им писать и моя жизнь наладилась.

* * *

# Эпилог

Скоро наш автодонат будет праздновать свой первый День Рождения.

За этот год было проделано не мало работы и решено не мало конфликтов, включая личные. Мы успели сделать порядка 1800 выплат на общую сумму, превышающую несколько миллионов рублей и ни разу никто не обвинил нас в обмане или снижении прибыли.

Пока [другие принимают платежи вручную]( __GHOST_URL__ /chelovecheskaya-glupost/), тратя свои силы и время на общения с донатерами, наши клиенты радуются повышенной доходности и полной автоматизации. Для этого был создан gm-donate.ru и с задачей он справляется лучше всех

<!--kg-card-end: markdown-->