import type { Metadata } from 'next';

import Header from '@components/Header';
import ResponsiveSidebar from '@components/ResponsiveSidebar';
import { SidebarProvider } from '@components/commons/sidebar/SidebarProvider';
import QueryProvider from '@components/providers/QueryProvider';
import { pretendardFont } from '@styles/font';
import '@styles/globals.css';
import cn from '@utils/cn';

export const metadata: Metadata = {
  title: 'schedule management',
  description: '일정관리 캘린더, 실시간 채팅 개인 프로젝트',
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={cn('flex min-h-screen', pretendardFont.className)}>
        <QueryProvider>
          <SidebarProvider>
            <ResponsiveSidebar />
            <div className="flex flex-auto flex-col">
              <Header />
              <main className="flex-auto flex justify-center mt-20">
                {children}
                {modal}
              </main>
            </div>
          </SidebarProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
