# PHP

Все годы пытался его избегать, чтобы не тратить время и силы на изучение "полуживого языка программирования", но все же пришлось немного покопаться.

Заметки без опыта:

### Упрощенный способ выполнить GET запрос:

```php
$json_body = file_get_contents($url);
$data = json_decode($json_body);
```

### Namespace

**Если правильно понял**, то это чтобы не было коллизий имен в одном проекте. Например, если один класс есть в нескольких местах

В Laravel вроде желательно указывать в каждом файле

```php
namespace App\Services;

// \App\Services\ClassName
class ClassName {
	...
}
```

### use

Можно делать сверху `use App\Project`, затем в коде `Project::blabla`

А можно без use сразу `\App\Project::blabla`

### Traits

"[Кусочки](https://www.develodesign.co.uk/learn/laravel-traits-what-are-traits-and-how-to-create-one)" [кода](https://dev.to/dalelantowork/laravel-8-traits-4ai), которые можно подключить к любому классу.

Позволяет подключать к классу сразу несколько наборов методов.

Воспринимаю как простой инжект функционала.

```php app/Traits/TraitName.php
namespace App\Traits;

trait TraitName {
	private function foo($bla) {
		return $bla;
	}
}
```

```php app/Services/SomeService.php
namespace App\Services;

use App\Traits\TraitName;

class SomeService {
	use TraitName;

	private function bar($bla2) {
		return $this->foo($bla2);
	}
}
```

### Расположение файла

> где разместить файл влияет только на то, что он там размещен или дает файлу какое-то особое свойство?

Вроде особых свойств нет. Т.е. любой файл в теории может быть расположен где угодно в проекте

### public/private static function

- private функции доступны в пределах класса?
- public функции доступны извне
- static говорит, что функцию можно вызвать без new ClassName();, просто через ClassName::functionName();

Но для трейтов это почему-то работает иначе. Наверное, трейты именно передают в классы, где используются функции "как есть"
