const getImageUrlFromStoarge = (path: string) => {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/live-chatting/${path}`;
};

export default getImageUrlFromStoarge;
