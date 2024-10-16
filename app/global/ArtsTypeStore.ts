import { create } from "zustand";

// Define the store with explicit types
interface ArtClassTyleState {
  classType: string;
  setClassType: (newType: string) => void;
}

const useArtClassType = create<ArtClassTyleState>((set) => ({
  classType: "",
  setClassType: (newType) => set({ classType: newType }),
}));

export default useArtClassType;
