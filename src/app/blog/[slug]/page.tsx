import { getAllPostIds, getPostData, PostContent } from '../../lib/posts'; // 関数をインポート
import { ParsedUrlQuery } from 'querystring';
import { GetStaticPaths, GetStaticProps } from 'next'; // 型定義は参考 (App Router では不要)

interface PostProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths.map(p => ({ slug: p.params.slug }));
}

export default async function Post({ params }: PostProps) {
  const resolvedParams = await params;
  const postData: PostContent = await getPostData(resolvedParams.slug);

  return (
    <article>
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{postData.title}</h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm">{postData.date}</p>
      </div>

      <div
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
      />
    </article>
  );
}