// based on:
// https://github.com/IceWhaleTech/ZimaDocs/blob/7ddfa8360dcab96126ca49ce6c2fa87394f20b63/src/theme/DocPaginator/index.js
// deleted comments front matter option and i18n

import React from "react";
import DocPaginator from "@theme-original/DocPaginator";
import { useColorMode } from "@docusaurus/theme-common";
import Giscus from "@giscus/react";

export default function DocPaginatorWrapper(props) {
  const { colorMode } = useColorMode();

  return (
    <>
      <DocPaginator {...props} />
      {(
        <div className="docusaurus-mt-lg">
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
            theme={ colorMode === "dark" ? "dark_dimmed" : "light" }
            lang={ 'ru' }
            loading="lazy"
          />
        </div>
      )}
    </>
  );
}
