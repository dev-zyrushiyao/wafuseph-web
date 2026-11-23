import { create } from "zustand";

type LineState = {
  y1: number;
  y2: number;
};

type LineAction = {
  updateY1: (y1: LineState["y1"]) => void;
  updateY2: (y2: LineState["y2"]) => void;
};

//use the 60 as starting point of carousel
//updates the state when animated in GSAP via onClick
//the timeline doesn't remember the state, only its beginning value so when it mounts on the page again it remembers its beginning value which was the last executed animation
export const useLineStore = create<LineState & LineAction>()((set) => ({
  y1: 60,
  y2: 60,
  updateY1: (y1) => set(() => ({ y1: y1 })),
  updateY2: (y2) => set(() => ({ y2: y2 })),
}));
