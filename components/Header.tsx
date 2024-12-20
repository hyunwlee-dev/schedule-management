'use client';

import { ArrowRightStartOnRectangleIcon, Bars3Icon } from '@heroicons/react/16/solid';

import { useSidebarContext } from './commons/sidebar/SidebarProvider';

function Header() {
  const { handleToggle } = useSidebarContext();

  return (
    <header className="bg-slate-100 flex justify-between md:justify-end px-[16px] pb-[18px] pt-[16px] align-middle">
      <button onClick={handleToggle} className="block md:hidden">
        <Bars3Icon className="text-slate-600 size-6" />
      </button>

      <button>
        <ArrowRightStartOnRectangleIcon className="text-slate-600 size-6" />
      </button>
    </header>
  );
}

export default Header;
