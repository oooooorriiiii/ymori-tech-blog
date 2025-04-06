// src/app/blog/[slug]/page.tsx

import Image from 'next/image';
import { getAllPostIds, getPostData, PostContent, TocEntry } from '../../lib/posts';

interface PostProps {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const paths = getAllPostIds();
  return paths.map(({ params }) => ({ slug: params.slug }));
}

const TableOfContents = ({ toc }: { toc: TocEntry[] }) => {
  if (!toc || toc.length === 0) return null;

  return (
    <nav className='mb-8 p4 border border-gray-200 dark:border-zinc-800 rounded-lg bg-gray-50 dark:bg-zinc-800'>
      <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-zinc-100">Contents</h2>
      <ul className='space-y-1'>
        {toc.map(({ level, text, slug }) => (
          <li key={slug} style={{ marginLeft: `${(level - 1) * 1}rem` }}> {/* インデント */}
            <a href={`#${slug}`} className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default async function PostPage({ params }: PostProps) {
  const resolvedParams = await params;
  const postData: PostContent = await getPostData(resolvedParams.slug);

  return (
    <article>
      {postData.image && (
        <div className='relative w-full h-60 md:h-80 mb-8 rounded-lg overflow-hidden bg-gray-100 dark:bg-zinc-800'>
          <Image 
            src={postData.image}
            alt={postData.title}
            fill
            style={{ objectFit: 'cover' }}
            unoptimized
            priority
          />
        </div>
      )}

      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-gray-50">{postData.title}</h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{postData.date}</p>
        {postData.tags && postData.tags.length > 0 && (
          <div className='flex flex-wrap gap-2 justify-center'>
            {postData.tags.map((tag) => (
              <span key={tag} className='bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded text-xs'>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      
      {/* 目次 */}
      <TableOfContents toc={postData.toc} />

      {/* 本文 */}
      <div
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
      />
    </article>
  );
}