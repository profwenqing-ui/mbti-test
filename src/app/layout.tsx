import type { Metadata } from 'next';
import { Inspector } from 'react-dev-inspector';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'MBTI人格测试 - 发现你的性格类型',
    template: '%s | MBTI人格测试',
  },
  description: '通过30道题目，发现你的MBTI人格类型，了解你的性格特征、优势与成长方向。',
  keywords: ['MBTI', '人格测试', '性格测试', '16型人格', '自我认知'],
  openGraph: {
    title: 'MBTI人格测试 - 发现你的性格类型',
    description: '通过30道题目，发现你的MBTI人格类型，了解你的性格特征。',
    locale: 'zh_CN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.COZE_PROJECT_ENV === 'DEV';

  return (
    <html lang="en">
      <body className={`antialiased`}>
        {isDev && <Inspector />}
        {children}
      </body>
    </html>
  );
}
