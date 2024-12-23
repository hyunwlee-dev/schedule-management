'use client';

import React, { useEffect, useRef, useState } from 'react';

import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { useSupabaseRealtime } from '@hooks/useSupabaseRealtime';
import { useGetAllMessagesQuery } from '@queries/useGetAllMessagesQuery';
import { useGetUserByIdQuery } from '@queries/useGetUserByIdQuery';
import { useSendMessageMutation } from '@queries/useSendMessageMutation';
import useSelectedUserIdStore from '@stores/useSelectedUserIdStore';

import Message from './Message';
import Person from './Person';

function ChattingRoom() {
  const { selectedUserId } = useSelectedUserIdStore();
  const user = useGetUserByIdQuery(selectedUserId);
  const messages = useGetAllMessagesQuery(selectedUserId);
  useSupabaseRealtime(selectedUserId);
  const { mutateAsync: sendMessage, isPending } = useSendMessageMutation();
  const [message, setMessage] = useState('');

  const handleSendMessage = async () => {
    await sendMessage({ message, userId: selectedUserId });
    setMessage('');
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      await handleSendMessage();
    }
  };

  const handleMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) container.scrollTop = container.scrollHeight;
  }, [messages]);

  if (selectedUserId === null) return null;

  if (user.data === null) return null;

  return (
    <div className="w-full h-[calc(100vh-48px)] flex flex-col">
      <Person name={user.data?.email?.split('@')[0] ?? ''} onChattingRoom isActive={false} />
      <div ref={containerRef} className="w-full flex-1 flex flex-col p-4 gap-3 overflow-y-scroll">
        {messages.data?.map((message) => (
          <Message key={message.id} message={message.message} isFromMe={message.receiver === selectedUserId} />
        ))}
      </div>
      <div className="flex">
        <input
          className="p-4 w-full border border-slate-400 rounded-lg m-4"
          placeholder="메세지를 입력해주세요."
          value={message}
          onChange={handleMessage}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSendMessage} className="my-4 mr-4 min-w-20 bg-blue-500 text-white rounded-lg">
          {isPending ? <ArrowPathIcon className="mx-auto animate-spin size-5" /> : '전송'}
        </button>
      </div>
    </div>
  );
}

export default ChattingRoom;
