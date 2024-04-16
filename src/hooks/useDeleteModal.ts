import { create } from 'zustand';

interface DeleteModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  delete:boolean;
  onDelete:(prop:boolean)=>void;
}

const useDeleteModal = create<DeleteModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  delete:false,
  onDelete:(prop)=>set({delete:prop})
}));

export default useDeleteModal;
