import { create } from 'zustand';

type SelectedUserIdState = {
  selectedUserId: string | null;
  setSelectedUserId: (selectedUserId: string | null) => void;
};

const useSelectedUserIdStore = create<SelectedUserIdState>((set) => ({
  selectedUserId: null,
  setSelectedUserId: (selectedUserId: string | null) => set({ selectedUserId }),
}));

export default useSelectedUserIdStore;
