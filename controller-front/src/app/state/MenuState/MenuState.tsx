import { create } from "zustand";

interface MenuState {
  menuComp: boolean;
  alter: (by: boolean) => void;
}

export const useMenuStore = create<MenuState>()((set) => ({
    menuComp: false,
  alter: (by) => set(() => ({ menuComp: by })),
}));
