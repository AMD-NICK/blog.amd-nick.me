import React, { useEffect, useRef } from "react";
import OriginalBlogPostItem from "@theme-original/BlogPostItem";
// @ts-expect-error internal code
import { useBlogPost } from "@docusaurus/theme-common/internal";
import { useColorMode } from "@docusaurus/theme-common";

function BlogPostItem(props) {
  const { colorMode } = useColorMode();
  const { isBlogPostPage } = useBlogPost();
  const widgetTheme = colorMode === "dark" ? "dark_dimmed" : "light";
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isBlogPostPage) return;

    const createGisqusEl = () => {
      const script = document.createElement("script");

      script.src = "https://giscus.app/client.js";
      script.setAttribute("data-repo", "AMD-NICK/blog.amd-nick.me");
      script.setAttribute("data-repo-id", "R_kgDOHVBfKA");
      script.setAttribute("data-category", "Announcements");
      script.setAttribute("data-category-id", "DIC_kwDOHVBfKM4CRnCI");
      script.setAttribute("data-mapping", "pathname");
      script.setAttribute("data-strict", "0");
      script.setAttribute("data-reactions-enabled", "1");
      script.setAttribute("data-emit-metadata", "0");
      script.setAttribute("data-input-position", "top");
      script.setAttribute("data-theme", widgetTheme);
      script.setAttribute("data-lang", "ru");
      script.setAttribute("data-loading", "lazy");

      script.crossOrigin = "anonymous";
      script.async = true;

      containerRef.current.appendChild(script);
    };

	function getGisqusEl() {
		return document.querySelector<HTMLIFrameElement>('iframe.giscus-frame') || createGisqusEl();
	}

	function sendMessage<T>(message: T) {
		const iframe = getGisqusEl();
		if (iframe) {
			iframe.contentWindow.postMessage({ giscus: message }, 'https://giscus.app');
		}
	}

	sendMessage({
		setConfig: {
			theme: 'https://giscus.app/themes/' + widgetTheme + '.css',
		//   reactionsEnabled: false,
		}
	});

  }, [widgetTheme]);

  return (
    <>
      <OriginalBlogPostItem {...props} />
      {isBlogPostPage && <div ref={containerRef} />}
    </>
  );
}

export default BlogPostItem;
