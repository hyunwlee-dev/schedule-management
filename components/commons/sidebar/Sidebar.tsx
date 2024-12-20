'use client';

import { PropsWithChildren } from 'react';

import Logo from '@components/Logo';
import cn from '@utils/cn';

function Sidebar({ className, children }: PropsWithChildren<{ className: string }>) {
  return (
    <aside className={`${className} bg-slate-100 w-60 border-r-[1px] border-slate-200  px-4 py-6 md:block`}>
      <Logo />
      <nav className="mt-4">{children}</nav>
    </aside>
  );
}

function SidebarGroup({ title, children, className }: PropsWithChildren<{ title?: string; className?: string }>) {
  return (
    <ul className={className}>
      {title && <span className="text-lg py-2 pl-3 pr-2 text-slate-400">{title}</span>}
      <>{children}</>
    </ul>
  );
}

function SidebarList({
  children,
  className,
}: PropsWithChildren<{
  className?: string;
}>) {
  return (
    <li
      className={cn(
        'rounded-md py-2 pl-3 pr-2 text-slate-600 hover:cursor-pointer hover:bg-blue-50 hover:text-blue-500',
        className,
      )}
    >
      <span className="text-lg">{children} </span>
    </li>
  );
}

Sidebar.List = SidebarList;
Sidebar.Group = SidebarGroup;

export default Sidebar;
