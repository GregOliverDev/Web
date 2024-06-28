import Client from "@/app/models/Client";
import { create } from "zustand";

interface ClientState {
  client: Client;
  alter: (by: Client) => void;
}

export const useClientStore = create<ClientState>()((set) => ({
  client: {
    registration: "",
    email: "",
    password: "",
    type: "",
    themeSelect: 0,
  },
  alter: (by) => set(() => ({ client: by })),
}));
