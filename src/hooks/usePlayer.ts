import { create } from 'zustand';

interface PlayerStore {
  ids: string[];
  activeId?: string;
  isPlaying: boolean; // Add isPlaying property here
  setId: (id: string) => void;
  setIds: (ids: string[]) => void;
  reset: () => void;
  setIsPlaying: (isPlaying: boolean) => void; // Modify setIsPlaying to accept a boolean parameter
}

const usePlayer = create<PlayerStore>((set) => ({
  ids: [],
  activeId: undefined,
  isPlaying: false, // Initialize isPlaying to false
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying }), // Update setIsPlaying to set the isPlaying state
  setId: (id: string) => set({ activeId: id }),
  setIds: (ids: string[]) => set({ ids }),
  reset: () => set({ ids: [], activeId: undefined, isPlaying: false }) // Reset isPlaying to false when resetting
}));

export default usePlayer;
