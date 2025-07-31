import { create } from "zustand";

const useMessageStore = create((set) => ({
  message: null,
  setMessage: (msg) => set({ message: msg }),
  clearMessage: () => set({ message: null }),
}));

export default useMessageStore;