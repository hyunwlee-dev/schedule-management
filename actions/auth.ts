'use server';

import type { AuthError } from '@supabase/auth-js';
import { createClient } from '@utils/supabase/server';

const handleError = (error: AuthError) => {
  console.error(error);
  //TODO: snackbar
  throw new Error(error.message);
};

export const signUp = async ({ email, password }: { email: string; password: string }) => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // TODO: to env environmnet baseURL
      emailRedirectTo: 'http://localhost:3000/sign-up/confirm',
    },
  });

  if (error) handleError(error);

  return data;
};

export const getSession = async () => {
  const supabase = await createClient();

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) handleError(error);

  return session;
};

export const signIn = async ({ email, password }: { email: string; password: string }) => {
  const supabase = await createClient();
  const data = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return data;
};

export const signOut = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
};
