import { defineCollection, } from "astro:content";
import { markketplace } from "@/config";
import { strapiLoader } from "@/strapi-loader";

const stores = defineCollection({
  loader: strapiLoader({ contentType: 'store', filter: `slug=${markketplace.store_slug}` })
});

const store = defineCollection({
  loader: strapiLoader({
    contentType: "store",
    filter: `filters[slug][$eq]=${markketplace.store_slug}`,
    populate: 'SEO.socialImage,Logo,URLS,Favicon,Cover'
  }),
});

const pages = defineCollection({
  loader: strapiLoader({
    contentType: "page",
    filter: `filters[store][slug][$eq]=${markketplace.store_slug}`,
    populate: 'SEO.socialImage,albums'
  }),
});

const articles = defineCollection({
  loader: strapiLoader({
    contentType: "article",
    filter: `filters[store][slug][$eq]=${markketplace.store_slug}`,
    populate: 'SEO.socialImage,cover,Tags'
  }),
});

const products = defineCollection({
  loader: strapiLoader({
    contentType: "product",
    filter: `filters[stores][slug][$eq]=${markketplace.store_slug}`,
    populate: 'SEO.socialImage,Slides,PRICES'
  }),
});


export const collections = {
  articles,
  products,
  stores,
  store,
  pages,
};
