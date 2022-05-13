// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Блог _AMD_",
  tagline: "Блог _AMD_",
  url: "https://duco.amd-nick.me",
  baseUrl: "/",
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: "img/favicon.ico",
  organizationName: "AMD-NICK", // Usually your GitHub org/user name.
  projectName: "docusaurustest", // Usually your repo name.

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          routeBasePath: "/",
          // Please change this to your repo.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        // blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        respectPrefersColorScheme: true,
        disableSwitch: true,
      },
      navbar: {
        title: "Блог блять _AMD_",
        logo: {
          alt: "Лого сайта",
          src: "img/logo.svg",
        },
        items: [
          {
            href: "https://www.instagram.com/amd_nick/",
            position: "right",
            label: "📷",
          },
          {
            href: "https://twitter.com/amd_nick",
            position: "right",
            label: "🐦",
          },
          {
            href: "https://github.com/AMD-NICK",
            position: "right",
            label: "🐙",
          },
          {
            href: "https://vk.com/amd_nick",
            position: "right",
            label: "🏡",
          },
          {
            href: "https://github.com/AMD-NICK/docusaurustest",
            position: "right",
            className: "header-github-link",
            "aria-label": "GitHub repository",
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    //   algolia: {
    //     // Application ID provided by Algolia
    //     appId: "VZMWVWCY2I",
    //     // Public API key
    //     apiKey: "8f34bfba01b4422d26cce783e7792f75",
    //     indexName: "nikiv",
    //   },
    }),
};

module.exports = config;