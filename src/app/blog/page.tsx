// src/app/blog/page.tsx

import Link from 'next/link';
import Image from 'next/image';
import { getSortedPostsData, PostData } from '../lib/posts';

export default function Home() {
  const allPostsData: PostData[] = getSortedPostsData();

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {allPostsData.map(({ id, date, title, image, tags, excerpt }) => (
          <Link href={`/blog/${id}`} key={id} className="block border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-shadow duration-300">
            {image && (
              <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-800">
                <Image
                  src={image}
                  alt={title}
                  fill
                  style={{ objectFit: 'cover' }}
                  unoptimized
                />
              </div>
            )}
            {/* Card */}
            <div className='p-4'>
              <h3 className='text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100'>{title}</h3>
              <p className='text-gray-500 dark:text-gray-400 text-sm mb-2'>{date}</p>
              {excerpt && <p className='text-gray-600 dark:text-gray-400 text-sm mb-3'>{excerpt}</p>}
              {tags && tags.length > 0 && (
                <div className='flex flex-wrap gap-2'>
                  {tags.map((tag) => (
                    <span key={tag} className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}