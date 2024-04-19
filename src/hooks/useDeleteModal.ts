import { create } from 'zustand';

interface DeleteModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  delete:boolean;
  onDelete:(prop:boolean)=>void;
  songId: string;
  imageId:string;
  setsongId:(prop:string)=>void;
  setImageId:(prop:string)=>void;
}

const useDeleteModal = create<DeleteModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  delete:false,
  onDelete:(prop)=>set({delete:prop}),
  songId:"",
  imageId:"",
  setsongId:(prop)=>set({songId:prop}),
  setImageId:(prop)=>set({imageId:prop}),

}));

export default useDeleteModal;
