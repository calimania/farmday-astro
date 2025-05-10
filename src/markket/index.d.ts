export interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

export interface MediaFormats {
  large: ImageFormat;
  small: ImageFormat;
  medium: ImageFormat;
  thumbnail: ImageFormat;
}

export interface Media {
  id: number;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: MediaFormats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any | null;
  createdAt: string;
  updatedAt: string;
  documentId: string;
  publishedAt: string;
}

export interface Store {
  id: number;
  title: string;
  Description: string;
  slug: string;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  STRIPE_CUSTOMER_ID: string;
  Cover: Media;
  Logo: {
    url: string;
    formats: {
      small: {
        url: string;
      }
    }
  };
  Favicon: {

    url: string;
  },
  URLS: {
    id: number;
    Label: string;
    URL: string;
  }[],
  SEO: {
    metaDescription: string;
    metaKeywords: string;
    metaTitle: string;
    metaAuthor: string;
    socialImage?: {
      url: string;
    };
  };
}


export interface AlbumTrack {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  description: string;
  content: ContentBlock[];
  media: Media[];
  urls?: {
    id: number;
    Label: string;
    URL: string;
  }[];
  SEO?: SEO;
}

export interface Album {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  content: ContentBlock[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  cover: Media;
  tracks: AlbumTrack[];
  store?: Store;
  displayType: 'grid' | 'list' | 'carousel';
  SEO?: SEO;
}

export interface AlbumResponse {
  data: Album[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      total: number;
      pageCount: number;
    };
  };
}


interface BlockText {
  text: string;
  type?: 'text';
  bold?: boolean;
}

interface BlockLink {
  type: 'link';
  url: string;
  children: BlockText[];
}

type BlockChild = BlockText | BlockLink;

export interface ContentBlock {
  type: 'paragraph' | 'heading' | 'list' | 'list-item' | 'image' | 'link' | 'quote' | 'code';
  level?: number;
  image?: {
    url: string;
    alternativeText?: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
    width: number;
    height: number;
    name: string;
  },
  children: Array<{
    type: string;
    code?: boolean;
    text?: string;
    bold?: boolean;
    url?: string;
    children?: Array<{ text: string; type: string; }>;
  }>;
}

interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: null | string;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

interface ImageData {
  id?: number;
  name?: string;
  alternativeText?: string | null;
  caption?: string | null;
  width?: number;
  height?: number;
  formats?: {
    large?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    thumbnail?: ImageFormat;
  };
  hash?: string;
  ext?: string;
  mime?: string;
  size?: number;
  url: string;
  previewUrl?: string | null;
  provider?: string;
  provider_metadata?: any | null;
  createdAt?: string;
  updatedAt?: string;
  documentId?: string;
  publishedAt?: string;
}

interface SEO {
  id: number;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  metaUrl: string | null;
  metaAuthor: string | null;
  excludeFromSearch: boolean;
  metaDate: string | null;
  socialImage?: ImageData;
}

export interface Page {
  id: number;
  Title: string;
  Content: ContentBlock[];
  Active: boolean;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  menuOrder: number | null;
  documentId: string;
  store?: Store;
  SEO?: SEO;
  albums?: Album[];
}

export interface Event {
  id: number;
  documentId: string;
  Name: string;
  usd_price: number;
  startDate: string;
  Slides: Slide[];
  endDate: string;
  Description: string;
  maxCapacity: number | null;
  amountSold: number | null;
  active: boolean;
  STRIPE_PRODUCT_ID: string | null;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  SEO?: SEO;
  Tag?: Tag[];
  stores?: Store[];
  Thumbnail?: {
    url: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  };
}

export interface PageResponse {
  data: Page[];
}

export type Tag = {
  id: number;
  Label: string;
  Color?: string;
}

export interface Article {
  id: number;
  slug: string;
  Title: string;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Tags?: Tag[];
  Content: any[];
  SEO: SEO,
  cover: {
    url: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
    data: {
      attributes: {
        url: string;
      };
    };
  };
}

interface Price {
  id: number;
  Price: number;
  Currency: string;
  STRIPE_ID: string;
  Description: string;
  Name: string;
}

interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: null | string;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

interface ImageFormats {
  large?: ImageFormat;
  small?: ImageFormat;
  medium?: ImageFormat;
  thumbnail?: ImageFormat;
}

interface Slide {
  id: number;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: ImageFormats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any | null;
  createdAt: string;
  updatedAt: string;
  documentId: string;
  publishedAt: string;
}


export interface Product {
  id: number;
  Name: string;
  usd_price: number | null;
  Description: string | null;
  quantity: number | null;
  active: boolean | null;
  attributes: any | null;
  SKU: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  slug: string;
  documentId: string;
  amountSold: number | null;
  Slides: Slide[];
  SEO?: SEO;
  PRICES?: Price[];
  Thumbnail?: ImageFormat;
  stores?: Store[];
}
