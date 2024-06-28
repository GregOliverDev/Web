import { create } from "zustand";

interface NewCadState {
  newCad: boolean;
  typeCad: string;
  alter: (by: boolean) => void;
  alterType: (by: string) => void;
}

export const useNewCadStore = create<NewCadState>()((set) => ({
  newCad: false,
  typeCad: "Adicionar",
  alter: (by) => set(() => ({ newCad: by })),
  alterType: (by) => set(() => ({ typeCad: by })),
}));
