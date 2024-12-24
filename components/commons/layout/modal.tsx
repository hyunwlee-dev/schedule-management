'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { XMarkIcon } from '@heroicons/react/24/solid';

function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleBackdropClick = () => {
    router.back();
  };

  const handleBackdropKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'Escape':
        router.back();
        return;
      default:
        return;
    }
  };

  useEffect(() => {
    document.documentElement.classList.add('overflow-hidden');
    window.addEventListener('keydown', handleBackdropKeyDown);

    return () => {
      document.documentElement.classList.remove('overflow-hidden');
      window.removeEventListener('keydown', handleBackdropKeyDown);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 overflow-hidden">
      <div className="absolute bg-white rounded-xl p-10 w-[50vw] h-[70vh] overflow-auto scrollbar-hide">
        <button className="absolute top-10 right-10" onClick={handleBackdropClick}>
          <XMarkIcon className="text-slate-600 size-6" />
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
