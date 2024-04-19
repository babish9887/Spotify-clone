"use client";

import Image from "next/image";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types/types";
import usePlayer from "@/hooks/usePlayer";
import { twMerge } from "tailwind-merge";
import { HiVolumeUp } from "react-icons/hi";
import axios from 'axios';
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FaTrash } from "react-icons/fa";
import useDeleteModal from "@/hooks/useDeleteModal";
import { useEffect, useState } from "react";
interface MediaItemProps {
  data: Song;
  onClick?: (id: string) => void;
  isPlayer:boolean
}

const MediaItem: React.FC<MediaItemProps> = ({
  data,
  onClick,
  isPlayer
}) => {
      const router=useRouter();
  const player = usePlayer();
  const imageUrl = useLoadImage(data);
  const deleteModal=useDeleteModal()


  const handleClick = () => {
    if (onClick) {

      return onClick(data.id);
    }
    return player.setId(data.id);
  };

  const handleDeleteSong = async (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
      songPath: string,
      imagePath: string
    ) => {
      e.stopPropagation(); // Prevent event propagation
      deleteModal.setsongId(data.song_path);
      deleteModal.setImageId(data.image_path)
      deleteModal.onOpen(); // Open delete modal
      
      // // Check if the delete modal is open
      // // if (deleteModal.isOpen) {
      //   await deleteSong(songPath, imagePath);
      // // }
    };
    

      async function deleteSong(songPath:string, imagePath:string){
                  deleteModal.onDelete(false)
                  deleteModal.onClose()
                  try {
                      await axios.post('/api/deletesong', { songId:songPath, image: imagePath})
                      .then((res)=>{
                            if(res.data.status){
                                  toast.success('Song Deleted!');
                                  router.refresh()
                                  
                            } else
                                  toast.error('Something went wrong')
                      }).catch((e:any)=>{})
                      } catch (e: any) {
                        toast.error('Something went wrong')
                      console.log(e.message);
                      } finally{
                        data.song_path="";
                        data.image_path="";
                      }
      }


  return ( 
    <div
      onClick={handleClick}
      className="
      relative
        flex 
        items-center 
        gap-x-3 
        cursor-pointer 
        hover:bg-neutral-800/50 
        w-full 
        p-2 
        rounded-md
      "
    >
      <div 
        className="
          relative 
          rounded-md 
          min-h-[48px] 
          min-w-[48px] 
          overflow-hidden
        "
      >
        <Image
          fill
          src={imageUrl || "/images/music-placeholder.png"}
          alt="MediaItem"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className={twMerge("truncate",player.isPlaying && player.activeId===data.id ? "text-emerald-500":"text-white", isPlayer && "text-white")}>{data.title}</p>
        <p className="text-neutral-400 text-sm truncate">
          By {data.author}
        </p>
      </div>
      <div className={twMerge("absolute right-4 text-emerald-500",isPlayer && "hidden")}>{player.isPlaying && player.activeId===data.id ? <HiVolumeUp/>:""}</div>
      {/* <div className={twMerge("absolute right-4 opacity-0 hover:opacity-100 transition duration-200")} onClick={handleDeleteSong}><FiDelete/></div> */}
      <div className={twMerge("absolute sm:bg-transparent lg:bg-stone-900 md:right-4 opacity-0 hover:opacity-100 transition duration-200")} onClick={(e)=>handleDeleteSong(e, data.song_path, data.image_path)}><FaTrash/></div>

    </div>
  );
}
 
export default MediaItem;
