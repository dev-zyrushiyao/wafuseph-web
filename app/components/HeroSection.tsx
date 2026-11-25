import React, { useRef } from "react";
import Carousel from "./Carousel";
import heroBg from "@/public/hero-bg.jpg";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useHeroStore } from "../store/heroStore";

gsap.registerPlugin(SplitText);

export default function HeroSection() {
  const container = useRef<HTMLDivElement | null>(null);

  const hasPlayed = useHeroStore((state) => state.hasPlayed);
  const updateHasPlayed = useHeroStore((state) => state.updateHasPlayed);

  useGSAP(
    () => {
      //FUOC
      gsap.set(container.current, { opacity: 1 });

      //when it update to true this will prevent the animation from executing on next component mount
      if (hasPlayed) return;

      const header = container.current?.querySelector("h1");
      const paragraph = container.current?.querySelector("p");
      if (!header || !paragraph) return;

      const splitHead = SplitText.create(header, { type: "chars" });
      const splitPara = SplitText.create(paragraph, { type: "words" });

      const tl = gsap.timeline({
        id: "elastic-text",
        onComplete: updateHasPlayed,
      });
      tl.from(splitHead.chars, {
        duration: 1,
        stagger: 0.03,
        ease: "elastic(1.5, 0.3)",
        scale: 0,
      });
      tl.from(
        splitPara.words,
        { duration: 1, ease: "power2.inOut", opacity: 0, stagger: 0.05 },
        "<",
      );
      tl.from(paragraph, { duration: 1, y: 100 }, "<");
    },
    { scope: container },
  );

  return (
    <section
      className={`hero  min-h-dvh w-full p-20 relative overflow-hidden lg:block flex flex-col justify-center items-center`}
      style={{
        backgroundImage: `url(${heroBg.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        aspectRatio: "auto",
        backgroundPosition: "center",
      }}
    >
      <div className="filter-div pointer-events-none absolute inset-0 bg-black/40" />
      <Carousel />
      <div
        ref={container}
        className="intro opacity-0 p-10 lg:w-220 w-fit h-auto flex flex-col gap-5 lg:relative lg:top-40 lg:inset-0 z-5"
      >
        <h1 className="text-nowrap w-full text-white">Joseph Waffle</h1>
        <p className="text-white">
          {`A VTuber and gaming content creator sharing cozy vibes, fun streams, and a welcoming space to kick back and hang out.`}
        </p>
      </div>
    </section>
  );
}
