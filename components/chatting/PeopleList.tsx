'use client';

import { useGetAllUsersQuery } from '@queries/useGetAllUsersQuery';
import useSelectedUserIdStore from '@stores/useSelectedUserIdStore';
import type { User } from '@supabase/auth-js';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

import Person from './Person';

dayjs.locale('ko');

function PeopleList({ loggedInUser }: { loggedInUser: User }) {
  const { selectedUserId, setSelectedUserId } = useSelectedUserIdStore();
  const users = useGetAllUsersQuery();

  const filteredUsers = users.data?.filter((user) => user.id !== loggedInUser.id);

  return (
    <div className="min-w-60 h-[calc(100vh-48px)] flex flex-col bg-gray-50">
      {filteredUsers?.map((user) => (
        <Person
          key={user.id}
          name={user.email!.split('@')[0]}
          onChattingRoom={false}
          isActive={selectedUserId === user.id}
          onClick={() => {
            setSelectedUserId(user.id);
          }}
        />
      ))}
    </div>
  );
}

export default PeopleList;
