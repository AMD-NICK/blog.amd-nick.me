// import { usePluginData } from '@docusaurus/core';
// import { parseMarkdownString } from '@docusaurus/utils';

import {aliasedSitePathToRelativePath, resolveMarkdownLinkPathname} from '@docusaurus/utils';
import fs from 'fs-extra';
import path from 'path';

module.exports = function (context) {
	return {
		name: 'docusaurus-backlinks-plugin',

		// https://docusaurus.io/docs/api/plugin-methods/lifecycle-apis#postBuild
		async postBuild(props) {
			// console.log("[backlinks-plugin] postBuild hook", props) // много интересного (роуты, исходники постов в .md, полностью загруженные данные всех плагинов, siteDir, siteConfig и т.д.). Демо: https://file.def.pm/rlGTzVv6.jpg
			const {plugins, outDir} = props
			// console.log("[backlinks-plugin] postBuild hook, plugins", plugins)

			const blogPlugin = plugins.find(plugin => plugin.name === 'docusaurus-plugin-content-blog')
			const blogPosts  = blogPlugin.content.blogPosts
			// console.log("[backlinks-plugin] postBuild hook, blogPosts", blogPosts)
			// console.log("[backlinks-plugin] postBuild hook, blogPosts 👆")

			const sourceToPermalinkDict = {}
			for (const {metadata} of blogPosts) {
				sourceToPermalinkDict[metadata.source] = metadata.permalink
			}

			const resolverContext = {
				siteDir: ".", // try siteConfig.url == "https://example.com" ?
				// sourceFilePath: 'override me', // Это файл, относительно которого будет ресолвиться ссылка.
				contentPaths: {
					contentPath: 'blog',
					contentPathLocalized: 'blablabla', // без этого внешние ссылки не ресолвятся и выдает ошибку из-за undefined первым элементом в getContentPathList
				},
				sourceToPermalink: new Map(
					Object.entries(sourceToPermalinkDict)
				),
			}

			const backlinks_map = {}
			for (const {content, metadata} of blogPosts) {
				const links = content.match(/(?<!!)\[([^\]]*)\]\(([^)]+)\)/g) || [];
				// console.log("[backlinks-plugin] postBuild hook, links", links)

				for (const link_markup of links) {
					const [_, title, url] = link_markup.match(/(?<!!)\[([^\]]*)\]\(([^)]+)\)/)
					// console.log("[backlinks-plugin] postBuild hook, url, title", url, title)

					// Функция делает просто .replace('@site/', ''),
					// так как инпуты такие: @site/blog/2015-03-06-sozdanie-poddomena-ispmanager.md
					resolverContext.sourceFilePath = aliasedSitePathToRelativePath(metadata.source)
					const resolvedUrl = resolveMarkdownLinkPathname(url, resolverContext)
					// console.log("[backlinks-plugin] postBuild hook, resolvedUrl", resolvedUrl)

					if (resolvedUrl) {
						if (!backlinks_map[resolvedUrl]) {
							backlinks_map[resolvedUrl] = {}
						}

						backlinks_map[resolvedUrl][metadata.permalink] = metadata.description || ''
					}
					// else if (!url.startsWith('http')) { // tags, tg://, pages, /, временно /docs (нет в индексе) и таки пара аномалий
					// 	console.log("🤔 [backlinks-plugin] postBuild hook, NOT resolved Url", url, " in ", metadata.source)
					// }
				}
			}
			// console.log("[backlinks-plugin] backlinks_map:", backlinks_map)

			const backlinksPath = path.join(outDir, 'backlinks.json');
			await fs.outputFile(backlinksPath, JSON.stringify(backlinks_map, null, 2));
		}
	};
};
