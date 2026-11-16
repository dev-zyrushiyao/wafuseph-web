"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
import { useRef } from "react";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ScheduleSection from "./components/ScheduleSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

gsap.registerPlugin(Flip, ScrambleTextPlugin, useGSAP);

export default function Home() {
  const container = useRef<HTMLDivElement | null>(null);
  useGSAP(
    () => {
      // requestAnimationFrame(() => {});

      gsap.set(container.current, { opacity: 1 });
      // const vtuberName = container.current?.querySelector(".vtuber-name");
      // if (!vtuberName) return;
      // const charChild = vtuberName.querySelectorAll('div[class*="char-"]');
      // if (!charChild.length) return;

      // const tl = gsap.timeline({
      //   delay: 1,
      //   onComplete: () => {
      //     setTimeout(() => {
      //       gsap.to(vtuberName, { autoAlpha: 0, display: "none" });
      //       gsap.to(".content", {
      //         display: "block",
      //       });

      //       gsap.to(".content", {
      //         autoAlpha: 1,
      //         ease: "power1.inOut",
      //       });
      //     }, 1000);
      //   },
      // });

      // tl.add(() => {
      //   const state = Flip.getState([vtuberName, ...charChild]);
      //   vtuberName.classList.replace("flex-state", "grid-state");
      //   charChild.forEach((c) => {
      //     c.classList.replace("flip-inactive", "flip-active");
      //   });

      //   return Flip.from(state, {
      //     duration: 1,
      //     ease: "power1.inOut",
      //   });
      // });

      // tl.add(() => {
      //   const state = Flip.getState([vtuberName, ...charChild]);
      //   vtuberName.classList.replace("grid-state", "grid-row-state");

      //   return Flip.from(state, {
      //     duration: 1,
      //     ease: "power1.inOut",
      //     stagger: 0.01,
      //     absolute: true,
      //   });
      // }, "+=1.5");

      // tl.add(() => {
      //   const state = Flip.getState([vtuberName, ...charChild]);
      //   charChild.forEach((c) => {
      //     c.classList.replace("flip-active", "flip-inactive");
      //   });

      //   vtuberName.classList.replace("grid-row-state", "flex-state");

      //   return Flip.from(state, {
      //     duration: 1.5,
      //     ease: "power1.inOut",
      //     stagger: 0.1,
      //     absolute: true,
      //   });
      // }, "+=1.5");

      // const newText: string[] = ["W", "A", "F", "U", "S", "E", "P", "H"];
      // charChild.forEach((elements, index) => {
      //   tl.to(
      //     elements,
      //     {
      //       duration: 1,
      //       color: "black",

      //       scrambleText: {
      //         text: newText[index],
      //         chars: "upperCase",
      //       },
      //     },
      //     index === 0 ? "<+=1" : "<",
      //   );
      // });
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className=" flex flex-col justify-center items-center opacity-0"
    >
      {/* intro animation */}
      {/* <div className="vtuber-name h-dvh w-full  flex-state font-sans text-5xl bg-amber-300 overflow-hidden">
        <div className="char-w flip-inactive">W</div>
        <div className="char-a flip-inactive">A</div>
        <div className="char-f flip-inactive">F</div>
        <div className="char-f flip-inactive">F</div>
        <div className="char-l flip-inactive">L</div>
        <div className="char-e flip-inactive">E</div>
        <div className="char-s flip-inactive">S</div>
        <div className="char-exclamation flip-inactive">!</div>
      </div> */}

      {/* main content adjust opacity and hidden class name opacity 
          
        }
      } */}
      <main className="content h-full w-full">
        <nav className="bg-yellow-100 border-5 border-border-color text-primary-text opacity-85 lg:h-fit lg:w-fit w-full h-auto px-10 py-5 lg:rounded-xl lg:fixed sticky inset-0 lg:top-10 lg:left-full lg:-translate-x-180  z-10 ">
          <ul className="flex flex-row justify-center items-center lg:gap-20 gap-10 ">
            <li className="lg:text-2xl md:text-xl text-base">Home</li>
            <li className="lg:text-2xl md:text-xl text-base">About</li>
            <li className="lg:text-2xl md:text-xl text-base">Schedule</li>
            <li className="lg:text-2xl md:text-xl text-base">Contact</li>
          </ul>
        </nav>
        <HeroSection />
        <AboutSection />
        <ScheduleSection />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
}
