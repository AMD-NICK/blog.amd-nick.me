import React from "react";
import BlogPostItem from "@theme-original/BlogPostItem";
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import { useColorMode } from "@docusaurus/theme-common";
import Giscus from "@giscus/react";
import Backlink from "docusaurus-plugin-backlinks/src/components/Backlink";

export default function BlogPostItemWrapper(props) {
	const { colorMode } = useColorMode();
	const { metadata, isBlogPostPage } = useBlogPost();
	if (!isBlogPostPage) {
		return <BlogPostItem {...props} />;
	}

	return (<>
		<BlogPostItem {...props} />
		<Backlink documentPath={metadata.permalink} />
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
	</>);
}
