"use client";

import React from 'react';
import Modal from './Modal';
import useDeleteModal from '@/hooks/useDeleteModal';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

const DeleteModal = () => {
  const deleteModal = useDeleteModal();
  const router=useRouter()

  const onChange = (open: boolean) => {
    if (!open) {
      deleteModal.onClose();
    }
  }


  const handleDelete=async()=>{
     deleteModal.onDelete(true);
     deleteModal.onDelete(false)
     deleteModal.onClose()
     try {
         await axios.post('/api/deletesong', { songId:deleteModal.songId, image: deleteModal.imageId})
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
        
         }
  }

  return (
    <Modal
      title="Are you Sure to Delete?"
      description=""
      isOpen={deleteModal.isOpen}
      onChange={onChange}
    >
      <div className='flex justify-end items-center gap-4'>

      <button className='px-4 py-2 hover:cursor-pointer' onClick={()=>{deleteModal.onClose()}}>cancel</button>
      <button className='px-4 py-2 bg-red-600 rounded-full hover:cursor-pointer hover:bg-red-500' onClick={handleDelete}>Delete</button>
      </div>

    </Modal>
  );
}

export default DeleteModal;