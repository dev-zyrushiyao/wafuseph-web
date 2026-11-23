import { create } from "zustand";

type IntroAnimationState = {
  hasPlayedIntro: boolean;
  updateHasPlayedIntroState: () => void;
  hasFadedInContent: boolean;
  updateHasFadedInContentState: () => void;
};

export const useIntroStore = create<IntroAnimationState>((set) => ({
  hasPlayedIntro: false,
  updateHasPlayedIntroState: () => set(() => ({ hasPlayedIntro: true })),
  hasFadedInContent: false,
  updateHasFadedInContentState: () =>
    set(() => ({ hasFadedInContent: true })),
}));
