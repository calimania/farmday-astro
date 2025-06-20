import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import AutoImport from "astro-auto-import";
import { defineConfig } from "astro/config";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { tanstackRouter } from '@tanstack/router-plugin/vite';

import { markketplace } from './src/config';

// https://astro.build/config
export default defineConfig({
  site: markketplace.url,
  base: "/",
  trailingSlash: "ignore",
  prefetch: {
    prefetchAll: true
  },
  vite: {
    plugins: [
      // tailwindcss(),
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true,
        verboseFileRoutes: false,
        routesDirectory: "./src/routes",
        generatedRouteTree: "./src/routes/routeTree.gen.ts",
        routeFileIgnorePrefix: "-",
      }),
    ]
  },
  integrations: [react(), sitemap(), tailwind({
    config: {
      applyBaseStyles: false
    }
  }), AutoImport({
    imports: ["@components/common/Button.astro", "@shortcodes/Accordion", "@shortcodes/Notice", "@shortcodes/Youtube", "@shortcodes/Tabs", "@shortcodes/Tab"]
  }), mdx()],
  markdown: {
    remarkPlugins: [remarkToc, [remarkCollapse, {
      test: "Table of contents"
    }], remarkMath],
    rehypePlugins: [[rehypeKatex, {}]],
    shikiConfig: {
      themes: { // https://shiki.style/themes
        light: "light-plus",
        dark: "dark-plus",
      }
    },
    extendDefaultPlugins: true
  },
});