// import { usePluginData } from '@docusaurus/core';
// import { parseMarkdownString } from '@docusaurus/utils';

import {aliasedSitePathToRelativePath, resolveMarkdownLinkPathname} from '@docusaurus/utils';
import fs from 'fs-extra';
import path from 'path';

// Do not report this routes as unresolved
// http*, /tags/*, "#" and / ignored by default
const ignoreRoutes = new Set([
	'/about',
	'about',
])

module.exports = function (context) {
	return {
		name: 'docusaurus-backlinks-plugin',

		// https://docusaurus.io/docs/api/plugin-methods/lifecycle-apis#postBuild
		async postBuild(props) {
			// console.log("[backlinks-plugin] postBuild hook", props) // много интересного (роуты, исходники постов в .md, полностью загруженные данные всех плагинов, siteDir, siteConfig и т.д.). Демо: https://file.def.pm/rlGTzVv6.jpg
			const {plugins, outDir} = props
			// console.log("[backlinks-plugin] postBuild hook, plugins", plugins)

			const blogPlugin = plugins.find(plugin => plugin.name === 'docusaurus-plugin-content-blog')
			const docsPlugin = plugins.find(plugin => plugin.name === 'docusaurus-plugin-content-docs')

			const blogPosts = blogPlugin?.content?.blogPosts || []
			const docItems = docsPlugin?.content?.loadedVersions[0]?.docs || []

			const allContent = [
				...blogPosts.map(post => ({
					content: post.content,
					metadata: post.metadata
				})),
				...docItems.map(doc => ({
					// #todo быстрый фикс. Почему в docs нет content?
					content: fs.readFileSync(aliasedSitePathToRelativePath(doc.source), 'utf8'),
					metadata: {
						source: doc.source,
						permalink: doc.permalink,
						description: doc.description
					}
				}))
			]

			// Создаем словарь source -> permalink
			const sourceToPermalinkDict = {}
			for (const {metadata} of allContent) {
				sourceToPermalinkDict[metadata.source] = metadata.permalink
			}

			// Костыль, чтобы дать второй шанс Unresolved ссылкам, которые ссылаются с /docs на ссылки блога и наоборот
			// В docusaurus НЕТ нормального роутинга между блогами и доками. И да, я хорошо искал. Они в разных вселенных.
			const registeredRoutes = new Set()
			for (const {metadata} of allContent) {
				registeredRoutes.add(metadata.permalink)
			}

			const resolverContext = {
				siteDir: ".", // try siteConfig.url == "https://example.com" ?
				// sourceFilePath: 'override me', // Это файл, относительно которого будет ресолвиться ссылка.
				contentPaths: {
					contentPath: 'blog',
					contentPathLocalized: 'docs', // без этого внешние ссылки не ресолвятся и выдает ошибку из-за undefined первым элементом в getContentPathList
				},
				sourceToPermalink: new Map(
					Object.entries(sourceToPermalinkDict)
				),
			}

			const backlinks_map = {}
			for (const {content, metadata} of allContent) {
				// console.log("[backlinks-plugin] postBuild, 📁", metadata.source)
				if (!content) {
					console.error("[backlinks-plugin] postBuild, content is undefined", metadata.source)
					throw new Error("Content is undefined")
				}

				const links = content.match(/(?<!!)\[([^\]]*)\]\(([^)]+)\)/g) || [];
				// console.log("[backlinks-plugin] postBuild, 🔗", links)

				for (const link_markup of links) {
					const [_, title, url] = link_markup.match(/(?<!!)\[([^\]]*)\]\(([^)]+)\)/)
					// console.log("[backlinks-plugin] postBuild hook, url, title", url, title)

					// Функция делает просто .replace('@site/', ''),
					// так как инпуты такие: @site/blog/2015-03-06-sozdanie-poddomena-ispmanager.md
					resolverContext.sourceFilePath = aliasedSitePathToRelativePath(metadata.source)
					const resolvedUrl = resolveMarkdownLinkPathname(url, resolverContext) || (registeredRoutes.has(url) ? url : null)
					// console.log("[backlinks-plugin] postBuild hook, resolvedUrl", resolvedUrl)

					if (resolvedUrl) {
						if (!backlinks_map[resolvedUrl]) backlinks_map[resolvedUrl] = {}
						backlinks_map[resolvedUrl][metadata.permalink] = metadata.description || ''

					// #todo fix hardcoded shit
					} else if (!(url.startsWith('http') || ignoreRoutes.has(url) || url == '#' || url == '/' || url.startsWith('/tags/'))) {
						console.warn("🤔 [backlinks-plugin] postBuild hook, NOT resolved Url", url, " in ", metadata.source)
					}
				}
			}
			// console.log("[backlinks-plugin] backlinks_map:", backlinks_map)

			const backlinksPath = path.join(outDir, 'backlinks.json');
			try {
				await fs.outputFile(backlinksPath, JSON.stringify(backlinks_map, null, 2));
			} catch (err) {
				console.error("[backlinks-plugin] postBuild hook, error writing backlinks.json", err)
				throw err
			}
		}
	};
};

