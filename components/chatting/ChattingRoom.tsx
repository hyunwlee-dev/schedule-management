'use client';

import React, { useEffect, useRef, useState } from 'react';

import { Attachment } from '@/types/file';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useSupabaseRealtime } from '@hooks/useSupabaseRealtime';
import { useGetAllMessagesQuery } from '@queries/useGetAllMessagesQuery';
import { useGetUserByIdQuery } from '@queries/useGetUserByIdQuery';
import useSelectedUserIdStore from '@stores/useSelectedUserIdStore';

import ChattingMessageForm from './ChattingMessageForm';
import Message from './Message';
import Person from './Person';

function ChattingRoom() {
  const { selectedUserId } = useSelectedUserIdStore();
  const user = useGetUserByIdQuery(selectedUserId);
  const messages = useGetAllMessagesQuery(selectedUserId);
  useSupabaseRealtime(selectedUserId);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) container.scrollTop = container.scrollHeight;
  }, [messages]);

  if (selectedUserId === null) return null;

  if (user.data === null) return null;

  const handleFocus = () => {
    setIsFormVisible(true);
  };

  const handleBlur = () => {
    setIsFormVisible(false);
  };

  return (
    <div className="w-full h-[calc(100vh-48px)] flex flex-col">
      <Person name={user.data?.email?.split('@')[0] ?? ''} onChattingRoom isActive={false} />
      <div ref={containerRef} className="w-full flex-1 flex flex-col p-4 gap-3 overflow-y-scroll">
        {messages.data?.map((message) => (
          <Message
            key={message.id}
            msg={message.msg}
            msg2={message.msg2}
            url={message.url}
            tel={message.tel}
            file={message.file as Attachment | null}
            isFromMe={message.receiver === selectedUserId}
          />
        ))}
      </div>
      <div className="flex">
        {!isFormVisible ? (
          <input
            className="p-4 w-full border border-slate-400 rounded-lg m-4"
            placeholder="메세지를 입력해주세요."
            onFocus={handleFocus}
          />
        ) : (
          <div className="relative flex flex-row w-full">
            <ChattingMessageForm className="p-4 w-full border border-slate-400 rounded-lg m-4" />
            <button onClick={handleBlur} type="button" className="absolute right-8 top-7">
              <XMarkIcon className="size-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChattingRoom;
