"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
import { useRef, useState } from "react";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ScheduleSection from "./components/ScheduleSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

import { GiHamburgerMenu } from "react-icons/gi";
import MobileNav from "./components/MobileNav";
import DesktopNav from "./components/DesktopNav";

gsap.registerPlugin(Flip, ScrambleTextPlugin, useGSAP);

//vise-versa color distribution (flip state animation)
const primaryColor: string = "black";
const secondaryColor: string = "gray";

export default function Home() {
  //state
  const [loading, setLoading] = useState<boolean>(true);

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

      const tl = gsap.timeline({
        delay: 1,
        onComplete: () => {
          setTimeout(async () => {
            gsap.to(vtuberName, { autoAlpha: 0, display: "none" });

            await gsap.from(document.body, {
              backgroundColor: "white",
            });

            await setLoading(false);
          }, 1000);
        },
      });

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
    { scope: container },
  );

  useGSAP(
    () => {
      if (loading) return;

      console.log("fade in animation");
      //fade-in animation
      gsap.from(document.body, {
        duration: 0.5,
        opacity: 0,
        backgroundColor: "transparent",
        ease: "power1.inOut",
      });
    },
    { scope: container, dependencies: [loading] },
  );

  return (
    <div
      ref={container}
      className=" flex flex-col justify-center items-center opacity-0"
    >
      {loading && (
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

      {!loading && (
        <main className="content h-full w-full">
          {/* added Navibar inside the home page - to avoid appearing while the intro animation is playing*/}
          <DesktopNav />
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
