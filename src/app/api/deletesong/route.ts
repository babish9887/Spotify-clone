
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
          const {songId, image}=await request.json()
        
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

            if(error || songError || imageError){
                  return NextResponse.json({status:false},{status:400});
          }
          return NextResponse.json({status:true},{status:200});
      }catch(e:any){
            console.log(e.message);
            return new NextResponse('Internal Error', {status:500})
      }
}