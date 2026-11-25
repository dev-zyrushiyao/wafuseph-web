import { create } from "zustand";

type State = {
  hasPlayed: boolean;
};

type Action = {
  updateHasPlayed: () => void;
};

export const useHeroStore = create<State & Action>()((set) => ({
  hasPlayed: false,
  updateHasPlayed: () => set(() => ({ hasPlayed: true })),
}));
