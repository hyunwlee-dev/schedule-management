'use client';

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

import Sidebar from './commons/sidebar/Sidebar';
import { useSidebarContext } from './commons/sidebar/SidebarProvider';

function ScheduleSidebar() {
  const segment = useSelectedLayoutSegment();
  const { sidebarStyle } = useSidebarContext();

  return (
    <Sidebar className={sidebarStyle}>
      <Sidebar.Group className="font-normal">
        <Sidebar.List>
          <Link href="/">
            <span className={!segment ? 'font-bold' : ''}>일정관리 캘린더</span>
          </Link>
        </Sidebar.List>
        <Sidebar.List>
          <Link href="/live-chatting">
            <span className={segment === 'live-chatting' ? 'font-bold' : ''}>1:1 실시간 채팅</span>
          </Link>
        </Sidebar.List>
      </Sidebar.Group>
    </Sidebar>
  );
}

export default ScheduleSidebar;
