import { create } from 'zustand';

interface SubscribeModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  delete:boolean;
  onDelete:(prop:boolean)=>void;
}

const useDeleteModal = create<SubscribeModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  delete:false,
  onDelete:(prop)=>set({delete:prop})
}));

export default useDeleteModal;
