import { create } from "zustand";

interface VendProdState {
  vendProd: boolean;
  alter: (by: boolean) => void;
}

export const useVendProdStore = create<VendProdState>()((set) => ({
  vendProd: false,
  alter: (by) => set(() => ({ vendProd: by })),
}));
