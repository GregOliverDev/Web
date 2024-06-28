import { create } from "zustand";

interface CadProductState {
  cadProduct: boolean;
  newCad: boolean;
  selectOrder: boolean;
  alter: (by: boolean) => void;
  alterNewCad: (by: boolean) => void;
  alterSelectOrder: (by: boolean) => void;
}

export const useCadProductStore = create<CadProductState>()((set) => ({
  cadProduct: false,
  newCad: true,
  selectOrder: false,
  alter: (by) => set(() => ({ cadProduct: by })),
  alterNewCad: (by) => set(() => ({ newCad: by })),
  alterSelectOrder: (by) => set(() => ({ selectOrder: by })),
}));
