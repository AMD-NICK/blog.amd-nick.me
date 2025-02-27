# blog.amd-nick.me

- WordPress 2014-2018
- [Ghost CMS](https://github.com/TryGhost/Ghost) 2018-2022
- [Docusaurus](https://docusaurus.io/) 2022-?
- [Fumadocs](https://github.com/fuma-nama/fumadocs) ?-?

Перенос своего [блога](https://blog.amd-nick.me) с Ghost на GitHub.

![Graph блога на 2022-05-21 15:35:51](https://i.imgur.com/zzVv8RJ.png)
_Граф построен при помощи Obsidian_ (не помню когда)

Сайт теперь использует Docusaurus 3 – генератор статичных веб сайтов.

Вопросы и предложения можно оставить в Issues. Исправления ошибок и предложения через Pull Request.

Вдохновлен идеей [Nikita Voloboev – Everything I Know](https://wiki.nikiv.dev) (раньше он был free и испопльзовал docusaurus). 2025 нашел еще безбашенного [cho.sh](https://cho.sh/r/000000), а nikiv создал новый сайт: [клик](https://docs.nikiv.dev) (не запутайтесь)

---

### Как это работает?

Любой коммит запускает Vercel App, а он билдит сайт и бесплатно хостит его на своих серверах. Для красивой ссылки в CloudFlare прописан CNAME, который ссылается на ссылку, что выдал Vercel.

Подробнее я писал [вот тут](./blog/2022/05-17-ghost-vs-docusaurus.md) и [тут](./docs/README.md)






<!--
## "секретные" заметки

### Скачивание всех remote фоток блога на локалку

Использовал, когда хотел сделать блог полностью локализированным, а потом решил, что оно того не стоит

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const https = require('https');

function findImageUrls(dir) {
	const files = fs.readdirSync(dir);
	const imageUrlPattern = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/g;
	let urls = {};

	files.forEach(file => {
		const filePath = path.join(dir, file);
		const stats = fs.statSync(filePath);

		if (stats.isDirectory()) {
			const subUrls = findImageUrls(filePath);
			urls = { ...urls, ...subUrls };
		} else if (stats.isFile() && filePath.toLowerCase().endsWith('.md')) {
			const content = fs.readFileSync(filePath, 'utf-8');
			const matches = content.match(imageUrlPattern);

			if (matches) {
				urls[filePath] = matches;
			}
		}
	});

	return urls;
}

function downloadImage(url) {
    axios({
        url,
        responseType: 'stream',
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
    }).then(
        response =>
		new Promise((resolve, reject) => {
			const encodedUrl = encodeURIComponent(url);
			const filename = path.basename(encodedUrl);
			response.data
				.pipe(fs.createWriteStream("output/" + filename))
				.on('finish', () => resolve())
				.on('error', e => reject(e));
		}),
    );
}

async function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function downloadImages(urls) {
	for (const filePath in urls) {
		const imageUrls = urls[filePath];
		for (const imageUrl of imageUrls) {
			console.log("ℹ️ Downloading image: " + imageUrl);
			try {
				downloadImage(imageUrl);
				console.log(`\t✅ Image downloaded`);
				await sleep(50); // Sleep for 1 second before downloading the next image
			} catch (error) {
				console.error(`\t🆘 Failed to download image`);
			}
		}
	}
}

const urls = findImageUrls('./blog');
console.log(urls);

// console.log( downloadImage('http://dl4.joxi.net/drive/2018/07/08/0002/2400/174432/32/abf2035362.png') )

downloadImages(urls);



-->
