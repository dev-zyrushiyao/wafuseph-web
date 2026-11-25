"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";

import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ScheduleSection from "./components/ScheduleSection";
import ContactSection from "./components/ContactSection";

import MobileNav from "./components/MobileNav";
import DesktopHomeNav from "./components/DesktopHomeNav";
import { useIntroStore } from "./store/introStore";
import { useRef } from "react";
import Footer from "./components/Footer";

gsap.registerPlugin(Flip, ScrambleTextPlugin, useGSAP);

export default function Home() {
  //state-store default: false
  const hasPlayedIntro = useIntroStore((state) => state.hasPlayedIntro);
  const updateHasPlayedIntroState = useIntroStore(
    (state) => state.updateHasPlayedIntroState,
  );
  const hasFadedInContent = useIntroStore((state) => state.hasFadedInContent);
  const updateHasFadedInContentState = useIntroStore(
    (state) => state.updateHasFadedInContentState,
  );

  //animation
  const container = useRef<HTMLDivElement | null>(null);
  useGSAP(
    () => {
      // requestAnimationFrame(() => {});

      gsap.set(container.current, { opacity: 1 });
      const vtuberName = container.current?.querySelector(".vtuber-name");
      if (!vtuberName) return;
      const charChild = vtuberName.querySelectorAll('div[class*="char-"]');
      if (!charChild.length) return;

      //cancel the rest of the animation so it won't replay again but leave the opacity 1 to load the container
      if (hasPlayedIntro) return;

      const tl = gsap.timeline({
        id: "Flip and ScrambleText , fade-in animation",
        delay: 1,
        onComplete: () => {
          setTimeout(async () => {
            //fade in animation
            //do not auto alpha the document.body or container.current (scaffold) to prevent fade not executing
            //hide - fade the vtuberName
            await gsap.timeline().to([vtuberName], {
              duration: 0.5,
              autoAlpha: 0,
            });

            updateHasPlayedIntroState();
          }, 1000);
        },
      });

      //Class called here "flex-state" .. etc is manually created in Global.css
      //please refer to @layer components for the tailwind classes applied for each class state
      tl.add(() => {
        const state = Flip.getState([vtuberName, ...charChild]);
        vtuberName.classList.replace("flex-state", "grid-state");
        charChild.forEach((c) => {
          c.classList.replace("flip-inactive", "flip-active");
        });

        return Flip.from(state, {
          duration: 1,
          ease: "power1.inOut",
        });
      });

      tl.add(() => {
        const state = Flip.getState([vtuberName, ...charChild]);
        vtuberName.classList.replace("grid-state", "grid-row-state");

        return Flip.from(state, {
          duration: 1,
          ease: "power1.inOut",
          stagger: 0.01,
          absolute: true,
        });
      }, "+=1.5");

      tl.add(() => {
        const state = Flip.getState([vtuberName, ...charChild]);
        charChild.forEach((c) => {
          c.classList.replace("flip-active", "flip-inactive");
        });

        vtuberName.classList.replace("grid-row-state", "flex-state");

        return Flip.from(state, {
          duration: 1.5,
          ease: "power1.inOut",
          stagger: 0.1,
          absolute: true,
        });
      }, "+=1.5");

      const newText: string[] = ["W", "A", "F", "U", "S", "E", "P", "H"];
      charChild.forEach((elements, index) => {
        tl.to(
          elements,
          {
            duration: 1,
            color: "black",
            scrambleText: {
              text: newText[index],
              chars: "upperCase",
            },
          },
          index === 0 ? "<+=1" : "<",
        );
      });
    },
    {
      scope: container,
      dependencies: [hasPlayedIntro],
    },
  );

  useGSAP(
    () => {
      //this executes after finishing the animation (first useGsap: Timeline id: "Flip and ScrambleText , fade-in animation",)

      //zustard state (introStore.ts) conditional
      //skip this useGsap until the first animation is finished
      if (!hasPlayedIntro) return;
      //once the fade-out finish animating it will flip the hasFadedInContent
      //this is to disable the fade-out animation when the Home component re-mounts
      if (hasFadedInContent) return;

      const mainContent = container.current?.querySelector(".main-content");
      if (!mainContent) return;

      //fade-out animation
      gsap
        .timeline({
          id: "fade-out animation",
          onComplete: () => {
            updateHasFadedInContentState();
          },
        })
        .from(mainContent, {
          autoAlpha: 0,
          duration: 1,
          ease: "power1.inOut",
        });
    },
    {
      scope: container,
      dependencies: [hasPlayedIntro],
    },
  );

  return (
    <div
      ref={container}
      className=" flex flex-col justify-center items-center opacity-0"
    >
      {!hasPlayedIntro && (
        // intro animation
        <div className="vtuber-name h-dvh w-full flex-state font-sans text-5xl bg-amber-300 overflow-hidden">
          <div className="char-w flip-inactive ">W</div>
          <div className="char-a flip-inactive">A</div>
          <div className="char-f flip-inactive">F</div>
          <div className="char-f flip-inactive">F</div>
          <div className="char-l flip-inactive">L</div>
          <div className="char-e flip-inactive">E</div>
          <div className="char-s flip-inactive">S</div>
          <div className="char-exclamation flip-inactive">!</div>
        </div>
      )}

      {hasPlayedIntro && (
        <main className="main-content h-full w-full">
          {/* added Navibar inside the home page - to avoid appearing while the intro animation is playing*/}
          <DesktopHomeNav />
          <MobileNav />

          <HeroSection />
          <AboutSection />
          <ScheduleSection />
          <ContactSection />
          <Footer />
        </main>
      )}
    </div>
  );
}
