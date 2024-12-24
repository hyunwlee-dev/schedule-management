import Image from 'next/image';

import { TrashIcon } from '@heroicons/react/24/solid';
import cn from '@utils/cn';
import getImageUrlFromStoarge from '@utils/getImageUrlFromStorage';
import { resolveFileIconOrImage } from '@utils/resolveFileIconOrImage';
import { cva } from 'class-variance-authority';

type UploadFileCardProps = {
  uploadState: 'enabled' | 'hover' | 'loading' | 'error';
  file: {
    id: string;
    path: string;
    fullPath: string;
  };
  downloadable?: boolean;
  deleteFile?: () => void;
} & React.HTMLAttributes<HTMLAnchorElement>;

const uploadImageVariants = cva(
  'flex h-10 w-full flex-row items-center justify-between rounded-lg border-[1px]  px-[18px] text-sm text-slate-600',
  {
    variants: {
      uploadState: {
        enabled: 'bg-slate-50 border-slate-200',
        hover: 'bg-slate-100 border-slate-300',
        loading: 'bg-slate-50 opacity-40',
        error: 'bg-white border-red-500',
      },
    },
  },
);

function UploadFileCard({ uploadState, file, deleteFile, ...props }: UploadFileCardProps) {
  const resolvedFileIconOfImage = resolveFileIconOrImage(getImageUrlFromStoarge(file.path));
  return (
    <a
      href={getImageUrlFromStoarge(file.path)}
      target="_blank"
      className={cn(uploadImageVariants({ uploadState }))}
      {...props}
    >
      <div className="flex">
        <div className="relative h-7 w-6 overflow-hidden">
          <Image
            fill
            src={resolvedFileIconOfImage}
            alt={file.path}
            className={cn('absolute inset-0 h-full w-full object-cover')}
          />
        </div>
        <div className="pl-3 text-[14px] font-medium text-slate-800">{file.path}</div>
      </div>
      <button
        type="button"
        className="z-10"
        onClick={(e) => {
          e.preventDefault();
          deleteFile?.();
        }}
      >
        <TrashIcon
          className={cn('h-4', [
            { 'text-slate-400': uploadState !== 'error' },
            { 'text-red-500': uploadState === 'error' },
          ])}
        />
      </button>
    </a>
  );
}

export default UploadFileCard;
