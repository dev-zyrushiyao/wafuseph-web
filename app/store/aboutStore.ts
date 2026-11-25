import { create } from "zustand";

type State = {
  hasScrolled: boolean;
};

type Action = {
  updateHasScrolled: () => void;
};

export const useAbout = create<State & Action>()((set) => ({
  hasScrolled: false,
  updateHasScrolled: () => set(() => ({ hasScrolled: true })),
}));
