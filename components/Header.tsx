'use client';

import { ArrowRightStartOnRectangleIcon, Bars3Icon } from '@heroicons/react/16/solid';
import { useSignOutMutation } from '@queries/useSignOutMutation';

import { useSidebarContext } from './commons/sidebar/SidebarProvider';

function Header({ email }: { email?: string }) {
  const { mutateAsync: signOut, isPending } = useSignOutMutation();
  const { handleToggle } = useSidebarContext();

  return (
    <header className="bg-slate-100 flex justify-between items-center md:justify-end h-12 px-4 align-middle">
      <button onClick={handleToggle} className="block md:hidden">
        <Bars3Icon className="text-slate-600 size-6" />
      </button>

      {email && (
        <>
          <div className="pr-4">{email}</div>
          <button onClick={() => signOut()} disabled={isPending}>
            <ArrowRightStartOnRectangleIcon className="text-slate-600 size-6" />
          </button>
        </>
      )}
    </header>
  );
}

export default Header;
