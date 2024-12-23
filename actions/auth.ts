'use server';

import type { AuthError } from '@supabase/auth-js';
import createClient from '@utils/supabase/server';

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
      //TODO: to env environmnet baseURL
      emailRedirectTo: 'http://localhost:3000/sign-up/confirm',
    },
  });

  if (error) handleError(error);

  return data;
};
