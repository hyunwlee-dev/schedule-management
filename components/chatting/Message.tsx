import cn from '@utils/cn';

type MessageProps = {
  isFromMe: boolean;
  message: string;
};

function Message({ isFromMe, message }: MessageProps) {
  return (
    <div
      className={cn('py-2 px-3 rounded-md end w-fit', [
        { 'ml-auto bg-blue-500 text-white': isFromMe },
        { 'mr-auto bg-gray-100 text-black': !isFromMe },
      ])}
    >
      <p>{message}</p>
    </div>
  );
}

export default Message;
