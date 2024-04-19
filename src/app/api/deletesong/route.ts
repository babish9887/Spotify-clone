
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request){
      try{

      const supabase = createServerComponentClient({
            cookies: cookies
          });
          const {
            data: { user },
          } = await supabase.auth.getUser();
          const {songId, image}=await request.json();

          let {data, error:songError}=await supabase
          .from('songs')
          .select('id').eq('song_path',songId);

          console.log(data)
          if(data){
            let { data: liked_songs, error:likedsongerror } = await supabase
            .from('liked_songs')
            .select('song_id')
            .eq('song_id',data[0].id)

            if(liked_songs){
                  const { error:likedError} = await supabase
                  .from('liked_songs')
                  .delete()
                  .eq('song_id',data[0].id )

                  if(likedError )
                        return NextResponse.json({status:false},{status:400});
                  }

            if(likedsongerror )
                  return NextResponse.json({status:false},{status:400});

          const { error} = await supabase
          .from('songs')
          .delete()
          .eq('song_path',songId )

            const { error:songError } = await supabase
            .storage
            .from('songs')
            .remove([songId])

            const { error:imageError } = await supabase
            .storage
            .from('images')
            .remove([image])

            if(error || songError || imageError)
                  return NextResponse.json({status:false},{status:400});
            
                  
          return NextResponse.json({status:true},{status:200});
      }
      return NextResponse.json({status:false},{status:400});

      }catch(e:any){
            console.log(e.message);
            return new NextResponse('Internal Error', {status:500})
      }
}