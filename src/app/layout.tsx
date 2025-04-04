import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'My Tech Blog',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        {/* KaTeX CSS を読み込み */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"
          integrity="sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1tBCyoUmBO0/wiMpcYLNrg+EFN7f"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
        <div className="max-w-3xl mx-auto px-4 py-10"> {/* コンテナ */}
          <header className="mb-10">
            <h1 className="text-4xl font-bold mb-2">
              <Link href="/">My Tech Blog</Link>
            </h1>
            <nav>
              {/* ナビゲーションリンクなど */}
              <Link href="/blog" className="mr-4 hover:underline">Blog Home</Link>
              {/* <Link href="/about" className="hover:underline">About</Link> */}
            </nav>
          </header>
          <main>{children}</main> {/* メインコンテンツ */}
          <footer className="mt-10 pt-5 border-t border-gray-300 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} My Tech Blog
          </footer>
        </div>
      </body>
    </html>
  );
}
