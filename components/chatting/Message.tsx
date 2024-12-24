import ChattingCard from './ChattingCard';

type MessageProps = {
  isFromMe: boolean;
  msg: string;
  msg2?: string | null;
  url?: string | null;
  tel?: string | null;
  file?: {
    id: string;
    path: string;
    fullPath: string;
  } | null;
};

function Message({ isFromMe, msg, msg2, url, tel, file }: MessageProps) {
  return (
    <ChattingCard
      className="py-2 px-3 rounded-md end w-fit"
      type={isFromMe ? 0 : 1}
      msg={msg}
      msg2={msg2}
      url={url}
      tel={tel}
      file={file}
    />
  );
}

export default Message;
