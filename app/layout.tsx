import type { Metadata } from 'next';

import { getSession } from '@actions/auth';
import Header from '@components/Header';
import ResponsiveSidebar from '@components/ResponsiveSidebar';
import { SidebarProvider } from '@components/commons/sidebar/SidebarProvider';
import QueryProvider from '@components/providers/QueryProvider';
import { pretendardFont } from '@styles/font';
import '@styles/globals.css';
import cn from '@utils/cn';

import AuthProvider from '@/components/providers/AuthProvider';

export const metadata: Metadata = {
  title: 'schedule management',
  description: '일정관리 캘린더, 실시간 채팅 개인 프로젝트',
};

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const session = await getSession();
  return (
    <html lang="ko">
      <body className={cn('flex min-h-screen', pretendardFont.className)}>
        <QueryProvider>
          <SidebarProvider>
            <AuthProvider accessToken={session?.access_token}>
              <ResponsiveSidebar />
              <div className="flex flex-auto flex-col">
                <Header email={session?.user.email} />
                <main className="flex-auto flex justify-center">
                  {children}
                  {modal}
                </main>
              </div>
            </AuthProvider>
          </SidebarProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
