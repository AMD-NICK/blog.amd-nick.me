import {aliasedSitePathToRelativePath, resolveMarkdownLinkPathname} from '@docusaurus/utils';
import fs from 'fs-extra';
import path from 'path';

module.exports = function() {
	return {
		name: 'docusaurus-plugin-backlinks',

		async postBuild({plugins, outDir}) {
			const allContent = await getBlogAndDocsContent(plugins) // [post1, post2, ..., doc1, doc2, ...]
			const backlinksMap = await getBacklinksMap(allContent)
			await saveToFile(backlinksMap, path.join(outDir, 'backlinks.json'))
		}
	};
};

async function getBlogAndDocsContent(plugins) {
	const blogPlugin = plugins.find(plugin => plugin.name === 'docusaurus-plugin-content-blog')
	const docsPlugin = plugins.find(plugin => plugin.name === 'docusaurus-plugin-content-docs')

	const blogPosts = blogPlugin?.content?.blogPosts || []
	const docItems  = docsPlugin?.content?.loadedVersions[0]?.docs || []

	return [
		...blogPosts.map(post => ({
			content: post.content,
			metadata: post.metadata
		})),
		...docItems.map(doc => ({
			content: fs.readFileSync(aliasedSitePathToRelativePath(doc.source), 'utf8'),
			metadata: {
				source: doc.source,
				permalink: doc.permalink,
				description: doc.description
			}
		}))
	]
}

function getMarkdownLinkResolver(pages_with_metadata) {
	function createResolverContext(file_permalink_dict) {
		return {
			siteDir: ".",
			contentPaths: {
				contentPath: 'blog',
				contentPathLocalized: 'docs',
			},
			sourceToPermalink: new Map(Object.entries(file_permalink_dict)),
		}
	}

	function createSourceToPermalinkDict(pages_with_metadata) {
		const dict = {}
		for (const {metadata} of pages_with_metadata) {
			dict[metadata.source] = metadata.permalink
		}
		return dict
	}

	const sourceToPermalinkDict = createSourceToPermalinkDict(pages_with_metadata)
	const resolverContext = createResolverContext(sourceToPermalinkDict)
	const registeredRoutes = new Set(Object.values(sourceToPermalinkDict))
	return (url, sourceFilePath) => {
		resolverContext.sourceFilePath = aliasedSitePathToRelativePath(sourceFilePath)
		return resolveMarkdownLinkPathname(url, resolverContext) ||
			(registeredRoutes.has(url) ? url : null)
	}
}

// Do not report this routes as unresolved
const ignoreRoutes = new Set(['/about', 'about'])
function isIgnoredUrl(url) {
	return url.startsWith('http') || url.startsWith('/tags/') ||
		ignoreRoutes.has(url) || url === '#' || url === '/'
}

async function getBacklinksMap(pages_with_metadata) {
	const resolveMarkdownLink = getMarkdownLinkResolver(pages_with_metadata)

	const backlinksMap = {
		links: {},
		descriptions: {},
	}

	for (const {content, metadata} of pages_with_metadata) {
		if (!content) {
			console.error("[backlinks-plugin] postBuild, content is undefined", metadata.source)
			throw new Error("Content is undefined")
		}

		const links = content.match(/(?<!!)\[([^\]]*)\]\(([^)]+)\)/g) || []

		for (const linkMarkup of links) {
			const [_, title, url] = linkMarkup.match(/(?<!!)\[([^\]]*)\]\(([^)]+)\)/)

			const resolvedUrl = resolveMarkdownLink(url, metadata.source)

			if (resolvedUrl) {
				addBacklink(backlinksMap, resolvedUrl, metadata.permalink, metadata.description)
			} else if (!isIgnoredUrl(url)) {
				console.warn("🤔 [backlinks-plugin] postBuild hook, NOT resolved Url", url, " in ", metadata.source)
			}
		}
	}

	const links = backlinksMap.links
	for (const key in links) { links[key] = Array.from(links[key]) }

	return backlinksMap
}

// Read as: resolvedUrl is a blog/docs page that $permalink links to with $description
function addBacklink(backlinksMap, resolvedUrl, permalink, description) {
	if (!backlinksMap.descriptions[permalink]) {
		backlinksMap.descriptions[permalink] = description || ''
	}

	if (!backlinksMap.links[resolvedUrl]) {
		backlinksMap.links[resolvedUrl] = new Set()
	}
	backlinksMap.links[resolvedUrl].add(permalink)
}

async function saveToFile(data, filePath) {
	try {
		await fs.outputFile(filePath, JSON.stringify(data, null, 2))
	} catch (err) {
		console.error("[backlinks-plugin] postBuild hook, error writing backlinks.json", err)
		throw err
	}
}

