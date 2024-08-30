// based on:
// https://github.com/IceWhaleTech/ZimaDocs/blob/7ddfa8360dcab96126ca49ce6c2fa87394f20b63/src/theme/DocPaginator/index.js
// deleted comments front matter option and i18n

import React from "react";
import BlogPostItem from "@theme-original/BlogPostItem";
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import { useColorMode } from "@docusaurus/theme-common";
import Giscus from "@giscus/react";

export default function BlogPostItemWrapper(props) {
	const { colorMode } = useColorMode();
	const { isBlogPostPage } = useBlogPost();
	if (!isBlogPostPage) {
		return <BlogPostItem {...props} />;
	}

	return (
		<>
			<BlogPostItem {...props} />
			{(
				<div className="docusaurus-blog-comments">
					<Giscus
						id="blog_comments"
						repo="AMD-NICK/blog.amd-nick.me"
						repoId="R_kgDOHVBfKA"
						category="Blog comments"
						categoryId="DIC_kwDOHVBfKM4CRnM9"
						mapping="pathname"
						reactionsEnabled="1"
						emitMetadata="0"
						inputPosition="top"
						theme={colorMode === "dark" ? "transparent_dark" : "light"}
						lang={'ru'}
						loading="lazy"
					/>
				</div>
			)}
		</>
	);
}
