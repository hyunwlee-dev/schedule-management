'use server';

import { createAdmin } from '@utils/supabase/server';

export const getAllUsers = async () => {
  const supabase = await createAdmin();
  const { data, error } = await supabase.auth.admin.listUsers();

  if (error) return [];

  return data.users;
};

export const getUserById = async (userId: string | null) => {
  if (userId === null) return null;

  const supabase = await createAdmin();
  const { data, error } = await supabase.auth.admin.getUserById(userId);

  if (error) return null;

  return data.user;
};

export const sendMessage = async ({ message, userId }: { message: string; userId: string | null }) => {
  if (userId === null) return;

  const supabase = await createAdmin();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session?.user) throw new Error('권한이 없는 유저입니다.');

  const { data, error: sendMessageError } = await supabase.from('message').insert({
    message,
    receiver: userId,
    sender: session.user.id,
    created_at: new Date().toISOString(),
  });

  if (sendMessageError) throw new Error(sendMessageError.message);

  return data;
};

export const getAllMessages = async ({ userId }: { userId: string | null }) => {
  if (userId === null) return [];

  const supabase = await createAdmin();

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session?.user) throw new Error('권한이 없는 유저입니다.');

  const { data, error: getMessagesError } = await supabase
    .from('message')
    .select('*')
    .or(`receiver.eq.${userId},receiver.eq.${session.user.id}`)
    .or(`sender.eq.${userId},sender.eq.${session.user.id}`)
    .order('created_at', { ascending: true });

  if (getMessagesError) return [];

  return data;
};
