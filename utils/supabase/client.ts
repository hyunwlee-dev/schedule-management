import { createBrowserClient } from '@supabase/ssr';

/**
 * @description RCC에서 supabase에 접근하기 위해 브라우저에서, 실행되어야 할 initilize
 */
const createClient = () =>
  createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default createClient;
