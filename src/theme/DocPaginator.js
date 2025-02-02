import React from "react";
import DocPaginator from "@theme-original/DocPaginator";
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { useColorMode } from "@docusaurus/theme-common";
import Giscus from "@giscus/react";
import { Backlink } from "docusaurus-plugin-backlinks";

export default function DocPaginatorWrapper(props) {
	const { colorMode } = useColorMode();
	const { metadata } = useDoc();




	return (<>
		<DocPaginator {...props} />
		<Backlink documentPath={metadata.permalink} />
		{(
			<div className="docusaurus-docs-comments">
				<Giscus
					id="comments"
					repo="AMD-NICK/blog.amd-nick.me"
					repoId="R_kgDOHVBfKA"
					category="Docs comments"
					categoryId="DIC_kwDOHVBfKM4CRnJe"
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
