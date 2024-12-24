export const isImage = (src: string) => /\.(png|jpg|jpeg|ico)$/i.test(src);

/**
 * @description 주어진 경로가 이미지 파일인지 확인합니다.
 */
export const resolveFileIconOrImage = (path: string) => {
  const fileNameInLowercase = path.toLowerCase();

  if (isImage(fileNameInLowercase)) return path;

  if (fileNameInLowercase.includes('pdf')) return '/svgs/pdf.svg';
  if (fileNameInLowercase.includes('xlsx')) return '/svgs/xlsx.svg';
  if (fileNameInLowercase.includes('mov')) return '/svgs/mov.svg';
  if (fileNameInLowercase.includes('avi')) return '/svgs/avi.svg';

  return '/svgs/file.svg';
};
