import { create } from "zustand";

interface UserState {
  userComp: boolean;
  alter: (by: boolean) => void;
}

export const useUserStore = create<UserState>()((set) => ({
    userComp: false,
  alter: (by) => set(() => ({ userComp: by })),
}));
