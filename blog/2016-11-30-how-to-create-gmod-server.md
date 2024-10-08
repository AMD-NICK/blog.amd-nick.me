---
title: "Как создать Garry's Mod сервер. История trigon.im"
date: '2016-11-30 14:24:00'
slug: how-to-create-gmod-server
tags: [garrysmod, trigon]
---

:::note UPD 2022.09.27
Пост написан очень давно и за некоторые слова здесь мне даже стыдно. Как, впрочем, и за многие посты того времени, поэтому я немного его подредачил. Пост до редакции можно найти [тут. Клик](https://github.com/AMD-NICK/blog.amd-nick.me/blob/da8026486ff80172c1bd4ff95b9c193ed5905da8/blog/2016-11-30-how-to-create-gmod-server.md)
:::

Сейчас будет немного занудства и что-то вроде руководства, но не стоит воспринимать его как единственный правильный путь. Я пишу максимально сжато, но так, чтобы ты мог попытаться прочувствовать то же, что и я. Попробуй нарисовать в голове общую картину того, как я относился к идее создания и самому проекту в последующем.

<!--truncate-->

![Лучшее богатство - отсутствие жадности](https://s3.amd-nick.me/2018/07/luchshee-bogatstvo-otsutstvie-zadnosti.jpg)

Можно сделать проект ради денег. Я не осуждаю, особенно, если вы четко для себя понимаете, что это так и есть и не врете сами себе, что это "ради опыта" либо "потому что хочу подарить этому миру что-то действительно достойное, когда все другие сервера говно". Если вы так считаете, то скорее всего, наебали сами себя.

> Ради денег проект можно клепать в течении 1-3 недель

Рецепт прост: находите сборку сервера в интернете, либо платите 1000 рублей тому, кто знает где искать, покупаете хостинг (не берите нищебродский. Скупой платит дважды), добавляете туда пару ворованных (слитых) аддонов с форумов, пускаете агрессивный спам по ЛС игроков конкурентов, обещая им золотые горы и **через месяц после вычета расходов вы в плюсе на 10 тыс руб** (это грустная реальность, но так действительно сработает)

Победителей не судят, так сказать, но я выбрал путь Иисуса и хотел быть максимально правильным, из-за чего потерял кучу времени, денег и сил, зато обрел опыт, который в долгосрочной перспективе помог мне сделать комплекс серверов, вошедший в топ-3 рейтинга мира по GameTracker (в 2016 году).

## Путь Иисуса

> Вообще, я не Иисус, но мне показалось это название прикольным. Ниже о том, как делал я

[Среди тысяч Garry’s mod серверов](http://www.gametracker.com/search/garrysmod/?searchipp=50) владельцы примерно 90-95% ничего не умеют и не желают делать. Я ничуть не преувеличиваю, почти за 3 года в этой сфере (на момент написания первой версии поста) я успел сделать адекватные выводы.

Но это не помешало им сделать сервера, которые ПО ФАКТУ (по РЕАЛЬНЫМ цифрам и реальному онлайну) являются топовыми. Потому что серверов много, а игрокам лень бегать по ним и искать, где действительно годнота, а где поносная струя.

Большинство называют или называли такие сервера "донат помойками", а владельцев "чсв мудаками". Я тоже так делал, но потом протер глаза, осознав, что они просто делают то, что нравится БОЛЬШИНСТВУ. Значит делают правильно. Как я уже говорил выше, **победителей не судят**. Гмод – это тоже бизнес, а цель бизнеса – делать деньги (или умирать).

Мой путь был немного печальнее. Я хотел сделать все сам, сделать "уникально" и эта мысль заменяла мне дрочку.

![Вчера я снова лег сегодня](https://s3.amd-nick.me/2018/07/vchera-ya-snova-leg-segodnya.png)

Сначала я купил блокнот и выписал в нем то, каким я хочу видеть проект. Что я хочу туда добавить и что мне не нравится в других.

1. Проект должен быть правильным (не идти по головам, не гадить на других без дела ради личной выгоды, не воровать у других и т.д.)
2. Он должен быть таким, чтобы мне не было стыдно показать его никому. Ни другу, ни родителю, ни любому другому человеку
3. Он будет выделяться красивым не бомжарским доменом с зеленым ключиком (SSL, HTTPS. В будущем это был [httpS://trigon.im](httpS://trigon.im)) **(в 2016 году это было КРУТО. Сейчас это норма post-factum)**
4. В связи с вышеуказанным, должен быть чистый модерируемый форум, соответствующий 2 пункту (без рачья, матов и троллей), где также можно почитать новости (в будущем они переехали в сообщество ВК), при чем новости должны быть обновляемыми. **(сейчас, в 2022 могу сказать, что для проекта форум не обязателен. Хоть это и было весело, но это не влияло на онлайн или доход с проекта. Только тратило кучу времени и сил на поддержание)**
5. Название должно иметь скрытый смысл, быть универсальным и не иметь связанных с деятельностью приставок (гмод, рп, гейм, прожект и т.п)
6. Логотип будет узнаваемым и соответствовать 5 пункту (до этого момента было 2 лого. Первое было сложным, поэтому переделано)
7. Пунктов было 9, но еще 3 я не помню

> Все пункты были **абстрактыми** и вообще не понять как проверить, что какой-то из них можно вычеркнуть как "завершенный".

Затем следовала планировка старта и несколько резервных планов на случай, если предыдущий не сработает. Это включало сам план по развертыванию серверов и их популяризации, а также поиск инвестиций на случай если не отобью аренду сервера (но на деле в первое время за аренду я не платил), да и резервные планы не пригодились.

Как только я начал этим заниматься, так [сразу нарушил 1 пункт и ‘своровал’ почти все, что имел](https://leakforums.net/) на то время. Это форум, некоторые платные дополнения для него, а так как еще не имел опыта программирования на lua (язык, используемый для написания дополнений к игре), да и денег в кармане чуть ли ни гроша, так что пришлось воровать и скрипты для сервера. Чтобы смягчить удар по карме), я оставил копирайты на всем, что имел незаконно. А где их не было — дописал сам, [даже отдельную темку на форуме сделал](https://trigon.im/index.php?posts/40808/). К настоящему моменту почти все легально куплено или написано собственноручно. Я не пожалел денег ради соблюдения принципа (а это свыше 10000 руб), хотя это было вовсе не обязательно.

Но с самого начала, как я уже говорил, у меня не было опыта в луа, но именно за счет того, что я хотел выделяться, я случайно (методом тыка) его немного и подучил. Тогда я изменил позиции элементов HUD (информ панель на экране), а вскоре и выпустил свою первую разработку — компенсацию денег за купленные принтеры, если вдруг нужно уйти с сервера. Этого не было нигде, за что я был горд и рад.

![Первый HUD проекта](https://s3.amd-nick.me/2018/07/trigon-hud-alpha.png)

Я уже был начитан о том, что код должен быть оптимизированным, понятным и с комментариями, но я не знал как это правильно сделать. Желание выделяться помогло переступить отсутствие интереса к чтению и я нырнул в литературу, которая в будущем рассказала мне каким должен быть код. И не зря. Это научило меня многим вещам и хотелось с нетерпением их использовать. Примерно на этом этапе я почти полностью отказался от чужих работ, которые уже казались мне низкосортными и тяжелыми, хотя не понимал, что тогда я писал не намного лучше, [а порой и хуже](https://vk.com/wall-95087107_304).

О, еще читаешь?

> — Ассистент! 3 кубика дизморали внутривенно
> — Уже бегу!
> — Ну что там?
> — Минуту, еще не подействовало

Окей, о чем это я? Ах, да… Давай я расскажу тебе о проблематике. Начнем с пустяка.

Когда я только начинал писать новости — игроков то и не было даже. Я их писал и грустил от осознания, что они никому, кроме меня не нужны и куча потраченного на тексты времени уходит в никуда. [Изменения?](https://trigon.im/index.php?posts/58/) — всем насрать. Конкурс? — и че? Опрос — пофиг. Сам себе король, сам себе судья…
 ![rollingstone](https://s3.amd-nick.me/2018/07/rollingstone.jpg)

Но это пол беды. Вторая часть похожа на пощечину самому себе. Это когда ты в сообществе, где и так не очень большая активность дополнительно включаешь фильтр мата и вручную удаляешь срачи и оффтоп. [Вот имею я группу](https://vk.com/club95087107). 1500 человек. Смотрю на нее — перекати поле. Смотрю на ‘соседей’ — 300 человек, но 20+ комментов к постам. И пофиг, что чел пишет по слову на комментарий. Пофиг, что 15 из 20 комментариев — срач 2х школьников. Группа выглядит живее. Иногда хочется взять и закрыть глаза на весь мусор в комментах, но принцип правильности въелся и я его не трогаю.

Ну и еще дикий геммор этим всем буквально в одиночку заниматься. Помимо пролетающих от усталости мыслей о том, не бросить ли все это и просто рубить бабло, по крышке гроба приятного дня еще бьют личности, которые убивают его всего 1 маааленьким разговорчиком о том, что ‘админ обленился, обнов нет’.

> Вот видишь эту толпу из десятков тысяч игроков, которые когда-либо заходили на проект? Так вот если тот, кого ты из этой толпы выберешь сможет хотя бы приближенно рассказать о том, что такое поддержание проекта в деле — получишь 100$

![Админ обленился - обнов нет](https://s3.amd-nick.me/2018/07/admin-oblenilsa-obnov-net.png)

Твой труд [никто не замечает и не может оценить по достоинству](https://vk.com/wall-95087107_110). Когда я только начинал заниматься проектом — я пихал на сервер чужие разработки и хвастался большим [ченджлогом](https://trigon.im/index.php?posts/77/). Теперь, когда почти все разработки свои, а сильные изменения в ченджлоге раз в неделю/месяц — находится толпа тех, кто говорит, что проект скатился и обнов нет. Читая это, тебе, наверное, трудно понять что я в такие моменты чувствую, но представь, что ты делаешь какую-то конкурсную работу год-два, тщательно все планируешь, приносишь и показываешь что-то новое, уникальное, хотя почему-то сыроватое, а победителем выбирают Васю с стыренной из сети работой, над которой тот посидел всего денек-второй. ОО, РАЙСКОЕ НАСЛАЖДЕНИЕ. А потом попробуй объяснить людям почему ты такой злой мудак.

И, пожалуй, последнее. Армия хейтеров. Это может быть кто угодно. Школьник, получивший ‘бан ни за что'(а на самом деле просто тупой даун, который даже не понял, что он нарушил, потому что на других НАРМАЛЬНЫХ ПРАЭКТАХ ЭТА НЕ НАРУШЕНИЕ) или же обиженный на твой успех конкурент, количество которых со временем только растет и может измеряться десятками, да это может быть даже какой-то левый тип, который для проверки своей игрушки случайно выделил твой ип. Я говорю о [DDoS атаках](https://vk.com/wall-95087107_7154). Это доставляет дискомфорт тебе и тешит самолюбие инициатору, до которого как-то не доходит, что несмотря на его атаки онлайн проекта спокойно восстанавливается в течении недели и уж вряд ли как-то нанесет финансовый ущерб хорошему овнеру, у которого есть средства на эти случаи. Некоторые еще и деньги требуют за прекращение атаки. Хах.

Эй, парень. Все хорошо?

> — Ассистент, мой слушатель странно выглядит. Он говорит, что все хорошо и дизмораль не повлияла, но я ему не верю
> — Колоть мотивин?
> — Да, лишним не будет
> — Вооот. Готово

Но не все так плохо. Старания вознаграждаются не только в сказках.

За счет моего курса на правильность я обрел гору опыта, которую не придется тянуть за собой. Это исключительно полезные знания и решение создать свой проект хорошим изменило мою жизнь целиком и полностью. Сейчас я легко могу зарабатывать на копирайтинге, маркетинге, графическом дизайне, луа программистом, стафф менеджменте и пассивных продажах. Кроме того я заработал деньги на обучение в частном учебном заведении и учусь на разработчика ПО — инвестировал в себя. Этого всего не было бы, если бы я выбрал изи вэй, чисто рубя зелень.

И помнишь, я говорил, что не могу назвать свое детище отличным (или как еще модно говорить — идеальным)? Не возникал вопрос почему? Ведь некоторые так называют свои проекты, сделанные ‘на коленке’ за недельку-месяц. Все дело в том, что я максималист. В том, чем мне нравится заниматься нет предела совершенству.

Действуй не только в своих интересах, иди против шерсти, делай то, что нужно, даже если не хочется. Иди до конца даже если руки опускаются. Не ищи оправдания отсутствию обновлений (атаки, другая работа) — кто хочет, тот ищет решение. Кто не хочет — ищет причину. Любя свою работу и полностью отдав себя ей ты обязательно добьешься успеха.
