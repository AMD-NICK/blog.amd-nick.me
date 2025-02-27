// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer').themes.nightOwlLight;
const darkCodeTheme = require('prism-react-renderer').themes.nightOwl;

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: 'Блог _AMD_',
	favicon: 'img/favicon.ico',
	// tagline: 'Всякое гиковское',
	trailingSlash: false, // если README.md в доках внутри папки, то создается / в конце url. Отвратительно
	url: 'https://blog.amd-nick.me',
	baseUrl: '/',

	onBrokenLinks: 'throw',
	// onBrokenMarkdownLinks: 'warn',
	onBrokenMarkdownLinks: 'throw',

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
		'docusaurus-plugin-backlinks',
		[
			'docusaurus-plugin-yandex-metrica', {
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
					routeBasePath: "/docs",
					sidebarPath: require.resolve('./sidebars.js'),
					editUrl: 'https://github.com/AMD-NICK/docusaurustest/tree/main/',
					showLastUpdateTime: true,
				},

				blog: {
					routeBasePath: '/',
					showReadingTime: true,
					blogSidebarCount: 'ALL',
					blogSidebarTitle: 'Другие посты',
					// Remove this to remove the "edit this page" links.
					// editUrl: 'https://github.com/AMD-NICK/docusaurustest/tree/main/',
					// processBlogPosts: async ({blogPosts}) => {
					// 	console.log("[Docusaurus config] processBlogPosts blogPosts", blogPosts)
					// }
				},

				theme: {
					customCss: [
						// not my styles. Taken from here:
						// https://github.com/vendure-ecommerce/vendure/blob/cc4826dfb7c1a2f4e6ed8daa13eb017090d8bd9a/docs/src/css/custom.css
						require.resolve('./src/css/custom.css'),
						require.resolve('./src/css/layout.css'),
						require.resolve('./src/css/overrides.css'),
						// require.resolve('./src/css/code-blocks.css'),
					],
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
			colorMode: {
                defaultMode: 'dark',
                disableSwitch: false,
                respectPrefersColorScheme: true,
            },

			navbar: {
				title: '',
				logo: {
					alt: 'Лого',
					src: 'img/logo.png', // todo webp
				},
				items: [
					{
						type: 'dropdown',
						label: '✍️ Блог',
						position: 'left',
						items: [
							{label: 'Главная', to: '/'},
							{label: 'Все по годам', to: 'archive'},
						],
					},
					{
						type: 'dropdown',
						label: '📦 Ресурсы',
						position: 'left',
						items: [
							{label: '🧠 База знаний', type: 'doc', docId: 'root'},
							{label: '👤 Обо мне', to: 'about'},
							{label: '✈️ TG Боты', to: 'docs/telegram/bots'},
						],
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
				additionalLanguages: ['lua', 'bash', 'json'],
			},
			algolia: {
				appId: "03RIRS86OT",
				apiKey: "a74f58efb237f210291f299f0c7e8769",
				indexName: "amd-nick",
			},
		}),
};

module.exports = config;
