import { Song } from "@/types/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getLikedSongs = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase 
    .from('liked_songs')
    .select('*, songs(*)')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false })

  if (!data) return [];

  return data.map((item) => ({
    ...item.songs
  }))
};

export default getLikedSongs;
