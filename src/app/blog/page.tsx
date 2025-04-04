import Link from 'next/link';
import { getSortedPostsData, PostData } from '../lib/posts';

export default function Home() {
  const allPostsData: PostData[] = getSortedPostsData();

  return (
    <section>
      <h2>ブログ記事一覧</h2>
      <ul>
        {allPostsData.map(({ id, date, title }) => (
          <li key={id}>
            <Link href={`/blog/${id}`}>{title}</Link>
            <br />
            <small>{date}</small>
          </li>
        ))}
      </ul>
    </section>
  );
}