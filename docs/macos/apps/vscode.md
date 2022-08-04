# VSCode Editor

Почему [VSCode](https://code.visualstudio.com)

1. Notepad++ казался раем, когда я нашел его после блокнота где-то в 2012
2. Когда я нашел SublimeText где-то в 2016, я думал, что лучше уже не будет и пользовался им 6 лет до 2022.
3. Когда я с 10й попытки наконец перешел на VSCode, то.. в общем, он лучше всего.

После SublimeText было реально трудно привыкнуть, но оно того стоило. Поддержка сообщества огромна. В GitHub есть встроенная веб версия VSCode с синхронизацией настроек. Каждый Changelog читаю, словно в GTA Online 😄

## Плагины:

- [GitHub Copilot](https://copilot.github.com) – нейронка, которая умеет сама писать код. Часто пишет целые функции вместо меня
- [SFTP](https://marketplace.visualstudio.com/items?itemName=liximomo.sftp) – изменяет remo **t** e (удаленные) файлы при изменении локальных. Для удобной разработки на отдаленных хостах, держа файлы локально
- [Markdown Preview Enchanced](https://marketplace.visualstudio.com/items?itemName=shd101wyy.markdown-preview-enhanced) – предпросмотр .MD файлов. Этот пост я тоже пишу в VSCode и справа вижу как он будет выглядеть
- [Markdown All In One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one) – все для .md, кроме превью
- [GitHub Theme](https://marketplace.visualstudio.com/items?itemName=GitHub.github-vscode-theme) – самая красивая тема для VSC
- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) – прямо в редакторе легко увидеть историю файла или даже определенной строки. Круто, когда думаешь "да кто и нахера написал это говно?", а потом понимаешь, что это был ты сам
- [Code Time](https://marketplace.visualstudio.com/items?itemName=softwaredotcom.swdc-vscode) – подсчет времени активного кодинга
- [Thunder Client](https://www.thunderclient.com) – по сути Postman прямо в VSCode. Минималистичный. простой
- ANSI Colors, GistPad, glua, gmod luadev...

## Настройки:

Здесь не все, а только некоторые особые настройки

```json
{
	// Откл. подтверждение удалений и перемещений файлов
	"explorer.confirmDelete" : false,
	"explorer.confirmDragAndDrop": false,

	// Тема
	"workbench.colorTheme" : "GitHub Dark",

	"editor.minimap.enabled": false, // Прячет мини-карту
	"editor.selectionHighlight": false,
	"editor.scrollBeyondLastLine": false,
	"editor.cursorBlinking": "smooth",
	"editor.insertSpaces": false,
	"editor.detectIndentation": false,

	// Новые [CMD + N] файлы будут восприняты как lua
	"files.associations": {
		"untitled-*": "glua",
		"*.lua": "glua"
	},
	"files.trimTrailingWhitespace": true, // при сохранении файла будут удалены концевые пробелы
	"files.insertFinalNewline": true,
	"files.eol": "\n",

	// На маке на англ может работать сочетание, а на рус уже нет. Это фикс
	"keyboard.dispatch": "keyCode"
}
```

Сочетание клавиш, которое открывает Diff панель файла, сравнивая изменения с сохраненной копией

```json
[
	{
		"key": "shift+cmd+d",
		"command": "workbench.files.action.compareWithSaved"
	},
]
```
