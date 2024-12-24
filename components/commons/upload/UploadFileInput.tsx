import React, { Dispatch, SetStateAction, useState } from 'react';

import cn from '@/utils/cn';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';
import { VariantProps, cva } from 'class-variance-authority';
import { type Accept, FileRejection, useDropzone } from 'react-dropzone';

type SupportedFileExtensions = Array<'JPG' | 'PNG' | 'JPEG' | 'PDF' | 'DOCX' | 'HWP' | 'DOC' | 'ICO'>;

type UploadFileInputProps = {
  setFile: (file: File | null) => void;
  maxFileSize: number;
  supportedFileExtensions: SupportedFileExtensions;
  setUploadState: Dispatch<SetStateAction<'enabled' | 'hover' | 'loading' | 'error'>>;
  acceptFileType: (fileType: SupportedFileExtensions) => Accept;
} & React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof uploadFileInputVariants>;

const uploadFileInputVariants = cva(
  'cursor-pointer w-full h-24 flex flex-col items-center justify-center border-[1px] rounded-lg text-slate-600 gap-1',
  {
    variants: {
      uploadState: {
        enabled: 'bg-[#F1F3F8] border-slate-300',
        hover: 'bg-slate-200 border-slate-300',
        loading: 'bg-slate-200 border-slate-300',
        error: 'bg-red-50 border-red-500 text-red-500',
      },
    },
  },
);

function UploadFileInput({
  uploadState,
  setFile,
  setUploadState,
  className,
  maxFileSize,
  supportedFileExtensions,
  acceptFileType,
  ...props
}: UploadFileInputProps) {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const onDropFile = (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    setFile(acceptedFiles[0]!);
  };

  const onDropRejected = (fileRejections: FileRejection[]) => {
    const errorCode = fileRejections[0]?.errors[0]?.code;

    if (errorCode === 'file-invalid-type') {
      setErrorMessage('지원하지 않는 파일 형식입니다.');
      setUploadState('error');
    }

    if (errorCode === 'file-too-large') {
      setErrorMessage('파일이 너무 큽니다.');
      setUploadState('error');
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted: onDropFile,
    onDropRejected,
    accept: acceptFileType(supportedFileExtensions),
    maxSize: maxFileSize * 1024 * 1024, // MB
  });

  if (uploadState === 'loading') {
    return (
      <div {...getRootProps()} className={cn(uploadFileInputVariants({ uploadState }), className)} {...props}>
        <div className="mt-[14px] text-[14px] font-medium text-slate-600">{`1개의 파일 업로드 중..`}</div>
      </div>
    );
  }

  return (
    <div {...getRootProps()} className={cn(uploadFileInputVariants({ uploadState }), className)} {...props}>
      <span className="flex gap-[10px]">
        <CloudArrowUpIcon
          className={cn('size-6', [
            { 'text-slate-300': uploadState === 'enabled' },
            { 'text-slate-400': uploadState === 'hover' },
            { 'text-red-200': uploadState === 'error' },
          ])}
        />
        <div className={cn('text-sm font-semibold')}>파일을 업로드해 주세요.</div>
      </span>
      <div className={cn('font-medium text-slate-400', [{ 'text-red-400': uploadState === 'error' }])}>
        {errorMessage ? errorMessage : `파일 최대 용량 : ${maxFileSize}MB (${supportedFileExtensions.join(', ')} 가능)`}
      </div>
      <input {...getInputProps()} className="hidden" />
    </div>
  );
}

export default UploadFileInput;
