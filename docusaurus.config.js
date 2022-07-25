// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: 'Блог _AMD_',
	tagline: 'Всякое гиковское',
	url: 'https://blog.amd-nick.me',
	baseUrl: '/',
	onBrokenLinks: 'throw',
	// onBrokenMarkdownLinks: 'warn',
	onBrokenMarkdownLinks: 'throw',
	favicon: 'img/favicon.ico',

	// GitHub pages deployment config.
	// If you aren't using GitHub pages, you don't need these.
	organizationName: 'AMD-NICK', // Usually your GitHub org/user name.
	projectName: 'docusaurustest', // Usually your repo name.

	// Even if you don't use internalization, you can use this field to set useful
	// metadata like html lang. For example, if your site is Chinese, you may want
	// to replace "en" with "zh-Hans".
	i18n: {
		defaultLocale: 'ru',
		locales: ['ru'],
	},

	plugins: [
		[
			'docusaurus-plugin-yandex-metrica',
			{
				counterID: '49559035',
			},
		],
	],

	presets: [
		[
			'classic',
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: {
					sidebarPath: require.resolve('./sidebars.js'),
					routeBasePath: "/docs",
					// Remove this to remove the "edit this page" links.
					editUrl: 'https://github.com/AMD-NICK/docusaurustest/tree/main/',
				},

				blog: {
					showReadingTime: true,
					routeBasePath: '/',
					blogSidebarCount: 'ALL',
					blogSidebarTitle: 'Другие посты',
					// Remove this to remove the "edit this page" links.
					// editUrl: 'https://github.com/AMD-NICK/docusaurustest/tree/main/',
				},

				theme: {
					customCss: require.resolve('./src/css/custom.css'),
				},

				gtag: {
					trackingID: 'G-SXVYQX65GD',
					anonymizeIP: true,
				},
			}),
		],
	],

	themeConfig:
		/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
		({
			navbar: {
				title: '@amd_nick',
				logo: {
					alt: 'Лого',
					src: 'https://i.imgur.com/FEwbyUh.png',
				},
				items: [
					{
						type: 'dropdown',
						label: '✍️ Блог',
						position: 'left',
						items: [
						  {
							label: 'Главная',
							to: '/',
						  },
						  {
							label: 'Обо мне',
							to: 'about',
						  },
						  {
							label: 'Telegram боты',
							to: '/docs/telegram/bots',
						  },
						  {
							label: 'Все по годам',
							to: 'archive',
						  },
						],
					},
					// {to: '/', label: 'Блог', position: 'left'},
					{
						type: 'doc',
						docId: 'intro',
						position: 'left',
						label: '📦 Штуки',
					},
					{
						href: "https://www.instagram.com/amd_nick",
						position: "right",
						label: "📷 Instagram",
					},
					{
						href: "https://vk.com/amd_nick",
						position: "right",
						label: "👥 VK",
					},
					{
						href: "https://t.me/amd_nick",
						position: "right",
						label: "💬 Telegram",
					},
					{
						href: "https://github.com/AMD-NICK/blog.amd-nick.me",
						position: "right",
						className: "header-github-link",
						"aria-label": "GitHub repository",
					},
				],
			},
			prism: {
				theme: lightCodeTheme,
				darkTheme: darkCodeTheme,
				additionalLanguages: ['lua'],
			},
			algolia: {
				appId: "03RIRS86OT",
				apiKey: "a74f58efb237f210291f299f0c7e8769",
				indexName: "amd-nick",
			},
		}),
};

module.exports = config;
