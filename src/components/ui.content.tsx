import { markketplace } from "../config";
import React from 'react';
import type { Page, ContentBlock , Album, AlbumTrack, Article } from "../markket/index.d";


const Title = ({ order = 1, children, className = "" }: { order: 1 | 2 | 3 | 4 | 5 | 6, children: React.ReactNode, className?: string }) => {

  const baseStyle = "font-bold bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent";
  const sizeStyles = {
    1: "text-4xl md:text-5xl mb-8",
    2: "text-3xl md:text-4xl mb-6",
    3: "text-2xl md:text-3xl mb-5",
    4: "text-xl md:text-2xl mb-4",
    5: "text-lg md:text-xl mb-3",
    6: "text-base md:text-lg mb-2"
  }[order];

  switch (order) {
    case 1:
      return <h1 className={`${baseStyle} ${sizeStyles} ${className}`}>{children}</h1>;
    case 2:
      return <h2 className={`${baseStyle} ${sizeStyles} ${className}`}>{children}</h2>;
    case 3:
      return <h3 className={`${baseStyle} ${sizeStyles} ${className}`}>{children}</h3>;
    case 4:
      return <h4 className={`${baseStyle} ${sizeStyles} ${className}`}>{children}</h4>;
    case 5:
      return <h5 className={`${baseStyle} ${sizeStyles} ${className}`}>{children}</h5>;
    case 6:
      return <h6 className={`${baseStyle} ${sizeStyles} ${className}`}>{children}</h6>;
    default:
      return <h2 className={`${baseStyle} ${sizeStyles} ${className}`}>{children}</h2>;
  };
};

const CodeHighlight = ({ code, language = "typescript", copyLabel = "Copy" }: { code: string, language?: string, copyLabel?: string }) => {
  return (
    <div className="relative group rounded-lg overflow-hidden bg-gray-900 my-6">
      <pre className={`language-${language} p-4 overflow-x-auto`}>
        <code className={`language-${language}`}>{code}</code>
      </pre>
      <button
        onClick={() => navigator.clipboard.writeText(code)}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white text-sm"
      >
        {copyLabel}
      </button>
    </div>
  );
};

interface PageContentProps {
  params: {
    page?: Page;
    post?: Article;
    album?: Album;
    track?: AlbumTrack;
  };
};

/**
 * Component designed to render Content Blocks from Strapi
 * Stores, Pages & Articles store their .content attribute in this format
 * @param props - PageContentProps
 * @returns { JSX.Element }
 */
export default function PageContent({ params, }: PageContentProps) {
  const content = params?.page?.Content || params?.post?.Content || params?.album?.content || params?.track?.content;
  const renderedImages = new Set<string>();

  if (!content?.length) {
    return null;
  }


  const renderImage = (node: ContentBlock['image'], key: number) => {
    if (!node?.url || renderedImages.has(node.url)) return null;

    renderedImages.add(node.url);

    return (
      <figure key={key} className="my-8 group">
        <a
          href={node.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block overflow-hidden rounded-xl"
        >
          <img
            src={node.url}
            alt={node?.alternativeText}
            className="w-full transition duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </a>
        {node?.alternativeText && (
          <figcaption className="mt-3 text-sm text-center text-gray-600 italic">
            {node?.alternativeText}
          </figcaption>
        )}
      </figure>
    );
  };

  const renderInline = (node: ContentBlock['children'][0], key: number) => {
    if (node.code) {
      return (
        <code key={key} className="px-1.5 py-0.5 bg-gray-100 rounded text-pink-600 text-sm font-mono">
          {node.text}
        </code>
      );
    }

    if (node.type === 'link') {
      const isImage = node.url?.match(/\.(jpg|jpeg|png|gif|webp)$/i);
      if (isImage && renderedImages.has(node.url as string)) return null;

      const isExternal = !node.url?.startsWith(markketplace.url);

      return (
        <a
          key={key}
          href={!isExternal ? node.url?.replace(markketplace.url, '') : node.url}
          target={isExternal ? '_blank' : '_self'}
          rel={isExternal ? "noopener noreferrer" : ''}
          className={`${isExternal ? 'text-blue-600' : 'text-blue-700'} hover:text-pink-600 transition-colors underline decoration-2 decoration-blue-200 hover:decoration-pink-200`}
        >
          {node.children?.[0]?.text}
        </a>
      );
    }

    if (node.bold) {
      return <strong key={key} className="font-semibold text-gray-900">{node.text}</strong>;
    }

    return <span key={key}>{node.text}</span>;
  };

  const renderListItem = (node: ContentBlock['children'][0], key: number) => {
    if (node.type !== 'list-item') return null;

    return (
      <li key={key} className="relative pl-6 mb-3 before:absolute before:left-0 before:top-[0.6em] before:w-2 before:h-2 before:rounded-full before:bg-gradient-to-r before:from-blue-600 before:to-pink-600">
        {node.children?.map((child, i) => renderInline(child, i))}
      </li>
    );
  };

  const renderBlock = (block: ContentBlock) => {
    switch (block.type) {
      case 'paragraph':
        return (
          <p className="text-inherit leading-relaxed mb-6">
            {block.children.map((child, i) => renderInline(child, i))}
          </p>
        );

      case 'heading':
        return (
          <Title order={(block.level || 1) as 1 | 2 | 3 | 4 | 5 | 6}>
            {block.children.map((child, i) => renderInline(child, i))}
          </Title>
        );

      case 'quote':
        return (
          <blockquote className="pl-6 my-8 border-l-4 border-gradient-to-b from-blue-600 to-pink-600">
            <p className="italic text-gray-600">
              {block.children.map((child, i) => renderInline(child, i))}
            </p>
          </blockquote>
        );

      case 'list':
        return (
          <ul className="space-y-2 my-6">
            {block.children
              .filter(child => child.type === 'list-item')
              .map((child, i) => renderListItem(child, i))}
          </ul>
        );

      case 'code':
        return (
          <div className="code-block-wrapper">
            <CodeHighlight
              code={block.children
                .map(child => child.code ? child.text : '')
                .filter(Boolean)
                .join('\n')}
              language="tsx"
              copyLabel="Copy code"
            />
          </div>
        );

      case 'image':
        return renderImage(block.image, 0);

      default:
        return null;
    }
  };

  return (
    <div className='blocks-content'>
      {content.map((block: ContentBlock, index: number) => (
        <div key={index}>{renderBlock(block)}</div>
      ))}
    </div>
  );
};
