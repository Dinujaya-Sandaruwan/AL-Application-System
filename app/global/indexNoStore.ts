import { create } from "zustand";

interface IndexState {
  indexNo: string;
  setIndexNo: (indexNo: string) => void;
}

const useIndexNoStore = create<IndexState>((set) => ({
  indexNo: "",
  setIndexNo: (indexNo) => set({ indexNo }),
}));

export default useIndexNoStore;
