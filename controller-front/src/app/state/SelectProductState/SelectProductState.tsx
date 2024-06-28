import { create } from "zustand";

interface SelectProductState {
  showProducts: boolean;
  alter: (by: boolean) => void;
}

export const useSelectProductStore = create<SelectProductState>()((set) => ({
  showProducts: false,
  alter: (by) => set(() => ({ showProducts: by })),
}));
