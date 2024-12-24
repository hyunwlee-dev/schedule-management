import { useState } from 'react';

import { uploadFile } from '@actions/chatting';
import UploadFileInput from '@components/commons/upload/UploadFileInput';
import type { Accept } from 'react-dropzone';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

import UploadFileCard from '../commons/upload/UploadFileCard';

export type SupportedFileExtensions = Array<'JPG' | 'PNG' | 'JPEG' | 'PDF' | 'DOCX' | 'HWP' | 'DOC' | 'ICO'>;

export const acceptFileType = (fileType: SupportedFileExtensions): Accept => {
  const acceptType: Record<string, string[]> = {};

  if (fileType.includes('JPG') || fileType.includes('JPEG') || fileType.includes('PNG')) {
    acceptType['image/*'] = ['.png', '.gif', '.jpeg', '.jpg'];
  }

  if (fileType.includes('PDF')) {
    acceptType['application/pdf'] = ['.pdf'];
  }

  if (fileType.includes('DOCX')) {
    acceptType['application/vnd.openxmlformats-officedocument.wordprocessingml.document'] = ['.docx'];
  }

  if (fileType.includes('HWP')) {
    acceptType['application/x-hwp'] = ['.hwp'];
  }

  if (fileType.includes('DOC')) {
    acceptType['application/msword'] = ['.doc'];
  }

  if (fileType.includes('ICO')) {
    acceptType['image/x-icon'] = ['.ico'];
  }

  return acceptType;
};

type UploadFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  imageSize?: 'L' | 'M';
  maxFileSizeMB: number;
  supportedFileExtensions: SupportedFileExtensions;
  required?: boolean;
};

export function UploadField<TFieldValues extends FieldValues>({
  control,
  name,
  maxFileSizeMB,
  supportedFileExtensions,
  // required,
}: UploadFieldProps<TFieldValues>) {
  // const { mutateAsync: uploadFile, progress } = useFileUpload(uploadFileToS3WithProgress);
  const { field } = useController({
    name,
    control,
  });
  const [uploadState, setUploadState] = useState<'enabled' | 'hover' | 'loading' | 'error'>('enabled');

  const uploadThumbnail = async (file: File | null) => {
    setUploadState('loading');
    if (!file) {
      field.onChange(null);
      setUploadState('enabled');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const result = await uploadFile(formData);

    if (!result) return;

    field.onChange(result);
    setUploadState('enabled');
  };

  const handleMouseEnter = () => {
    if (uploadState === 'enabled') setUploadState('hover');
  };

  const handleMouseLeave = () => {
    if (uploadState === 'hover') setUploadState('enabled');
  };

  const renderInput = () => {
    return (
      <UploadFileInput
        uploadState={uploadState}
        setUploadState={setUploadState}
        setFile={(file) => uploadThumbnail(file)}
        supportedFileExtensions={supportedFileExtensions}
        acceptFileType={acceptFileType}
        maxFileSize={maxFileSizeMB}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    );
  };

  const renderCard = () => {
    return (
      <UploadFileCard
        uploadState={uploadState}
        file={{
          id: field.value.id,
          path: field.value.path,
          fullPath: field.value.fullPath,
        }}
        deleteFile={() => uploadThumbnail(null)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    );
  };

  return <div>{!field.value ? renderInput() : renderCard()}</div>;
}
