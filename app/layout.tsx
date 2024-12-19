import type { Metadata } from 'next';
import { pretendardFont } from '@styles/font';
import '@styles/globals.css';

export const metadata: Metadata = {
  title: 'schedule management',
  description: '일정관리 캘린더, 실시간 채팅 개인 프로젝트',
};

export default function RootLayout({
  modal,
  children,
}: Readonly<{
  modal: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={pretendardFont.className}>
        {modal}
        {children}
      </body>
    </html>
  );
}
