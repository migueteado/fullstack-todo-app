import { UserObject } from "@/lib/types";
import { create } from "zustand";

type Store = {
  authUser: UserObject | null;
  requestLoading: boolean;
  token: string | null;
  setToken: (token: string | null) => void;
  setAuthUser: (user: UserObject | null) => void;
  setRequestLoading: (isLoading: boolean) => void;
  reset: () => void;
};

const useStore = create<Store>((set) => ({
  authUser: null,
  requestLoading: false,
  token: null,
  setToken: (token) => set((state) => ({ ...state, token })),
  setAuthUser: (user) => set((state) => ({ ...state, authUser: user })),
  setRequestLoading: (isLoading) =>
    set((state) => ({ ...state, requestLoading: isLoading })),
  reset: () => set({ authUser: null, requestLoading: false, token: null }),
}));

export default useStore;
