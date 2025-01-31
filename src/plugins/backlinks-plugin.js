const { resolveMarkdownLinkPathname, normalizeUrl, parseURLPath, parseLocalURLPath, fileToPath } = require('@docusaurus/utils');
// const visit = require('unist-util-visit');
// const path = require('path');

// import { usePluginData } from '@docusaurus/core';
// import { parseMarkdownString } from '@docusaurus/utils';

import {aliasedSitePathToRelativePath} from '@docusaurus/utils';
import fs from 'fs-extra';
import path from 'path';

module.exports = function (context) {
	return {
		name: 'docusaurus-backlinks-plugin',
		async loadContent() {
			// console.log('[backlinks-plugin] loadContent hook');
			//// return 1 + Math.floor(Math.random() * 10);
			return 'SDASDASDASDASD';
		},

		async contentLoaded({ content, actions }) {
			// console.log("[backlinks-plugin] contentLoaded hook")
			//// console.log('actions', actions); // addRoute, createData, setGlobalData
			//// console.log('[backlinks-plugin] context', context); // site config, version, REGISTERED PLUGINS, etc.
			// console.log('[backlinks-plugin] context.siteConfig.plugins', context.siteConfig.plugins);
			//// console.log('content', content); // SDASDASDASDASD
			actions.setGlobalData({"some": "shit"});
		},

		// https://docusaurus.io/docs/api/plugin-methods/lifecycle-apis#postBuild
		async postBuild(props) {
			// console.log("[backlinks-plugin] postBuild hook", props) // много интересного (роуты, исходники постов в .md, полностью загруженные данные всех плагинов, siteDir, siteConfig и т.д.). Демо: https://file.def.pm/rlGTzVv6.jpg
			const {plugins, siteConfig, outDir} = props
			//// console.log("[backlinks-plugin] postBuild hook, plugins", plugins)

			const blogPlugin = plugins.find(plugin => plugin.name === 'docusaurus-plugin-content-blog')
			const blogPosts  = blogPlugin.content.blogPosts
			// console.log("[backlinks-plugin] postBuild hook, blogPosts", blogPosts)
			// console.log("[backlinks-plugin] postBuild hook, blogPosts 👆")

			//// const url = "https://example.com/"
			//// console.log("[backlinks-plugin] postBuild hook, url", url)
			//// console.log("[backlinks-plugin] postBuild hook, normalizeUrl(url)", normalizeUrl([url]))
			//// console.log("[backlinks-plugin] postBuild hook, parseURLPath(url)", parseURLPath(url))
			//// console.log("[backlinks-plugin] postBuild hook, parseLocalURLPath(url)", parseLocalURLPath(url))
			//// console.log("[backlinks-plugin] postBuild hook, fileToPath(url)", fileToPath(url))

			//// const context = {
			//// 	siteDir: '.',
			//// 	sourceFilePath: 'docsdd/intro.md', // docs/intro.md
			//// 	contentPaths: {
			//// 		contentPath: 'docsdd',
			//// 		// contentPathLocalized: 'i18n/docs-localized',
			//// 	},
			//// 	sourceToPermalink: new Map(
			//// 		Object.entries({
			//// 			'@site/docsdd/intro.md': '/docs/intro',
			//// 			'@site/docsdd/foo.md': '/doc/foo',
			//// 			'@site/docsdd/bar/baz.md': '/doc/baz',
			//// 			'@site/docsdd/http.foo.md': '/doc/http',
			//// 		})
			//// 	),
			//// }

			//// console.log("aaaa", resolveMarkdownLinkPathname("./bar/baz.md", context))
			//// console.log("aaaa", resolveMarkdownLinkPathname("./2014-12-14-renter-otziv.md", context))
			//// console.log("resolveMarkdownLinkPathname('https://example.com/', context)", resolveMarkdownLinkPathname("https://example.com/", context))
			//// console.log("resolveMarkdownLinkPathname('../../2014-12-14-renter-otziv.md', context)", resolveMarkdownLinkPathname("../../2014-12-14-renter-otziv.md", context))


			const sourceToPermalinkDict = {}
			for (const {metadata} of blogPosts) {
				sourceToPermalinkDict[metadata.source] = metadata.permalink
			}

			const backlinks_map = {}
			for (const {content, metadata} of blogPosts) {

				// const sourceFilePath = metadata.source // example: @site/blog/2015-03-06-sozdanie-poddomena-ispmanager.md
				// const sourceToPermalink = metadata.permalink // /2015/04/13/alt-shift-elementary
				//// console.log("[backlinks-plugin] postBuild hook, sourceFilePath", sourceFilePath)
				//// console.log("[backlinks-plugin] postBuild hook, sourceToPermalink", sourceToPermalink)

				// 2014-12-14-renter-otziv.md
				// https://example.com/

				// #todo исключить картинки
				const links = content.match(/(?<!!)\[([^\]]*)\]\(([^)]+)\)/g) || [];

				// console.log("[backlinks-plugin] postBuild hook, links", links)

				for (const link_markup of links) {
					const [_, title, url] = link_markup.match(/(?<!!)\[([^\]]*)\]\(([^)]+)\)/)
					// console.log("[backlinks-plugin] postBuild hook, title", title)
					// console.log("[backlinks-plugin] postBuild hook, url", url)

					//// console.log("[backlinks-plugin] postBuild hook, normalizeUrl(url)", normalizeUrl([url]))
					//// console.log("[backlinks-plugin] postBuild hook, parseURLPath(url)", parseURLPath(url))
					//// console.log("[backlinks-plugin] postBuild hook, parseLocalURLPath(url)", parseLocalURLPath(url))

					// context.sourceFilePath = sourceFilePath

					const context = {
						siteDir: ".", //siteConfig.baseUrl, // baseUrl == "/", url == "https://blog.amd-nick.me"
						sourceFilePath: aliasedSitePathToRelativePath(metadata.source), // Это файл, относительно которого будет ресолвиться ссылка. Функция делает просто .replace('@site/', '')
						contentPaths: {
							contentPath: 'blog',
							contentPathLocalized: 'blablabla', // без этого внешние ссылки не ресолвятся и выдает ошибку из-за undefined первым элементом в getContentPathList
						},
						sourceToPermalink: new Map(
							Object.entries(sourceToPermalinkDict)
						),
					}

					const resolvedUrl = resolveMarkdownLinkPathname(url, context)
					// console.log("[backlinks-plugin] postBuild hook, resolvedUrl", resolvedUrl)

					if (resolvedUrl) {
						if (!backlinks_map[resolvedUrl]) {
							backlinks_map[resolvedUrl] = {}
						}

						backlinks_map[resolvedUrl][metadata.permalink] = metadata.description || ''
					}
				}
			}
			// console.log("[backlinks-plugin] backlinks_map:", backlinks_map)

			const backlinksPath = path.join(outDir, 'backlinks.json');
			await fs.outputFile(backlinksPath, JSON.stringify(backlinks_map, null, 2));
		}
		// injectHtmlTags() {
		// 	return {
		// 		postBodyTags: [`<div> This is post body </div>`],
		// 	}
		// },
	};
};
