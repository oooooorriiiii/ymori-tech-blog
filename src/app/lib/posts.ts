import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';
import rehypeSlug from 'rehype-slug';
import { visit } from 'unist-util-visit';


const postsDirectory = path.join(process.cwd(), 'posts');

/* eslint @typescript-eslint/no-explicit-any: 0 */
export interface PostData {
  id: string;
  title: string;
  date: string;
  image?: string;
  tags?: string[];
  [key: string]: any;
}

export interface TocEntry {
  level: number;
  text: string;
  slug: string;
}

export interface PostContent extends PostData {
  contentHtml: string;
  toc: TocEntry[];
}

export function getSortedPostsData(): PostData[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map((fileName) => {
      const id = fileName.replace(/\.(md|mdx)$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      return {
        id,
        title: matterResult.data.title || 'Untitled',
        date: matterResult.data.date || 'No date',
        image: matterResult.data.image || null,
        tags: matterResult.data.tags || [],
        except: matterResult.data.except || '',
      };
    });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map((fileName) => {
      return {
        params: {
          slug: fileName.replace(/\.(md|mdx)$/, ''),
        },
      };
    });
}

function extractToc(): (tree: any, file: any) => void {
  return (tree, file) => {
    const toc: TocEntry[] = [];
    visit(tree, 'element', (node) => {
      if (['h1', 'h2', 'h3'].includes(node.tagName)) {
        const level = parseInt(node.tagName.substring(1), 10);
        let text = '';
        visit(node, 'text', (textNode) => {
          text += textNode.value;
        });
        const slug = node.properties?.id || '';

        if (text && slug) {
          toc.push({ level, text, slug });
        }
      }
    });
    file.data.toc = toc;
  }
}

export async function getPostData(id: string): Promise<PostContent> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  const processor = await unified()
    .use(remarkParse)
    .use(remarkMath)
    .use(remarkRehype, {allowDangerousHtml: true})
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(extractToc)
    .use(rehypeKatex)
    .use(rehypePrettyCode, {
        theme: 'monokai',
        keepBackground: false,
    })
    .use(rehypeStringify)
  
  const file = await processor.process(matterResult.content)
  const processedContent = await processor.process(matterResult.content);
  const contentHtml = processedContent.toString();
  const toc = (file.data.toc || []) as TocEntry[];

  return {
    id,
    contentHtml,
    toc,
    title: matterResult.data.title || 'Untitled',
    date: matterResult.data.date || 'No date',
    image: matterResult.data.image || null,
    tags: matterResult.data.tags || [],
    excerpt: matterResult.data.excerpt || '',
  };
}