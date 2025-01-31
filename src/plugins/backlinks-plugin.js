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
		name: 'docusaurus-plugin-backlinks',

		// #todo create blank backlinks.json to avoid browser fetch error in component
		// async contentLoaded({content, actions}) {}

		// https://docusaurus.io/docs/api/plugin-methods/lifecycle-apis#postBuild
		async postBuild({plugins, outDir}) {
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

			const backlinks_map = {
				links: {}, // target -> [source1, source2, ...]
				descriptions: {}, // source -> description
			}

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

					// The function just replaces '@site/' with ''
					// because the input is like this: @site/blog/2015-03-06-sozdanie-poddomena-ispmanager.md
					resolverContext.sourceFilePath = aliasedSitePathToRelativePath(metadata.source)
					const resolvedUrl = resolveMarkdownLinkPathname(url, resolverContext) || (registeredRoutes.has(url) ? url : null)

					if (resolvedUrl) {
						if (!backlinks_map.descriptions[metadata.permalink]) {
							backlinks_map.descriptions[metadata.permalink] = (metadata.description || '')
						}

						if (!backlinks_map.links[resolvedUrl]) {
							backlinks_map.links[resolvedUrl] = new Set()
						}
						backlinks_map.links[resolvedUrl].add(metadata.permalink)

					// #todo fix hardcoded shit
					} else if (!(url.startsWith('http') || ignoreRoutes.has(url) || url == '#' || url == '/' || url.startsWith('/tags/'))) {
						console.warn("🤔 [backlinks-plugin] postBuild hook, NOT resolved Url", url, " in ", metadata.source)
					}
				}
			}

			for (const key in backlinks_map.links) {
				backlinks_map.links[key] = Array.from(backlinks_map.links[key])
			}

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

