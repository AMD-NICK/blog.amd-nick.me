// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: 'Блог _AMD_',
	tagline: 'Блог _AMD_',
	url: 'https://duco.amd-nick.me',
	baseUrl: '/',
	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',
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

	presets: [
		[
			'classic',
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: {
					sidebarPath: require.resolve('./sidebars.js'),
					routeBasePath: "/",
					// Remove this to remove the "edit this page" links.
					editUrl:
						'https://github.com/AMD-NICK/docusaurustest/tree/main/',
				},

				blog: false,
				theme: {
					customCss: require.resolve('./src/css/custom.css'),
				},
			}),
		],
	],

	themeConfig:
		/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
		({
			navbar: {
				title: 'Блог _AMD_',
				logo: {
					alt: 'Лого',
					src: 'img/logo.svg',
				},
				items: [
					// {to: '/blog', label: 'Blog', position: 'left'},
					{
						type: 'doc',
						docId: 'intro',
						position: 'left',
						label: 'Кодоштуки',
					},
					{
						href: "https://github.com/AMD-NICK/",
						position: "right",
						className: "header-github-link",
						"aria-label": "GitHub",
					},
				],
			},
			prism: {
				theme: lightCodeTheme,
				darkTheme: darkCodeTheme,
			},
		}),
};

module.exports = config;