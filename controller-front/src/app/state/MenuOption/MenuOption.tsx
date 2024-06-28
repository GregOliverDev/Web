import { create } from "zustand";

interface MenuOptionState {
  menuOptionComp: number;
  alter: (by: number) => void;
}

export const useMenuOptionStore = create<MenuOptionState>()((set) => ({
    menuOptionComp: 0,
  alter: (by) => set(() => ({ menuOptionComp: by })),
}));
