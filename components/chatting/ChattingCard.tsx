import Link from 'next/link';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/commons/card/card';
import { LinkIcon } from '@heroicons/react/16/solid';
import { PhoneIcon } from '@heroicons/react/24/solid';
import cn from '@utils/cn';
import { VariantProps, cva } from 'class-variance-authority';

const DEFAULT_TYPE = 0;

type ChattingCardProps = {
  msg: string;
  msg2?: string | null;
  url?: string | null;
  tel?: string | null;
  className?: string;
} & VariantProps<typeof chattingCardCardVarinats>;

const chattingCardCardVarinats = cva('mx-4 my-2', {
  variants: {
    type: {
      0: 'ml-auto bg-blue-500 text-white',
      1: 'mr-auto bg-gray-100 text-slate-900',
    },
  },
});

function ChattingCard({ type = DEFAULT_TYPE, msg, msg2, url, tel, className }: ChattingCardProps) {
  return (
    <Card className={cn(chattingCardCardVarinats({ type }), className)}>
      <CardHeader>
        <CardTitle>{msg}</CardTitle>
        {msg2 && (
          <CardDescription className={cn('text-white', [{ 'text-slate-900': type === 1 }])}>{msg2}</CardDescription>
        )}
      </CardHeader>
      {(url || tel) && (
        <CardContent className="flex flex-col  gap-1">
          {url && (
            <div className="flex items-center gap-1">
              <LinkIcon className="size-4" />
              <Link href={url} target="_blank">
                {url}
              </Link>
            </div>
          )}
          {tel && (
            <div className="flex items-center gap-1">
              <PhoneIcon className="size-4" />
              {tel}
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}

export default ChattingCard;
