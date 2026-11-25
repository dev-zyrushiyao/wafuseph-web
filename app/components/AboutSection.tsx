"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import React, { useRef } from "react";
import { useAbout } from "../store/aboutStore";
import aboutImg1 from "@/public/assets/about-img-1.png";
import aboutImg2 from "@/public/assets/about-img-2.png";
import Image from "next/image";

type VtuberInfo = { imageSource: string; title: string; description: string };

const vtuberInfo: VtuberInfo[] = [
  {
    imageSource: aboutImg1.src,
    title: "Introduction",
    description:
      "Hey, I’m Joseph Waffle—though you might also know me as Wafuseph! I’m a Filipino indie VTuber who loves hanging out, playing variety games, and bringing cozy, chaotic energy to every stream. Whether I’m grinding matches in TEKKEN 8 and League of Legends or jumping into party collabs with friends, my goal is simple: build a chill space where anyone can drop by, laugh, and have a good time.",
  },
  {
    imageSource: aboutImg2.src,
    title: "Hobbies",
    description:
      "Outside of regular stream hours, you’ll usually find Joseph labbing combos in TEKKEN 8, queuing up for League of Legends on the SEA server, or hopping into Discord for spontaneous party game nights with friends. When he isn't gaming, he enjoys chilling with chat, exploring new indie titles, and fueling up on waffles before the next broadcast.",
  },
];

gsap.registerPlugin(ScrollTrigger);
export default function AboutSection() {
  const container = useRef<HTMLDivElement | null>(null);

  const hasScrolled = useAbout((state) => state.hasScrolled);
  const updateHasScrolled = useAbout((state) => state.updateHasScrolled);

  useGSAP(
    () => {
      //FUOC opacity not used here because elements are outside the DOM

      const content = container.current?.querySelectorAll(".content");
      if (!content) return;

      const matchMedia = gsap.matchMedia();
      const breakPoint = 800;

      const screenSize = {
        isDesktop: `(min-width: ${breakPoint}px)`,
        isMobile: `(max-width: ${breakPoint - 1}px)`,
        reduceMotion: "(prefers-reduced-motion: reduce)",
      };

      matchMedia.add(screenSize, (context) => {
        const { isDesktop, isMobile, reduceMotion } = context.conditions as {
          isDesktop: boolean;
          isMobile: boolean;
          reduceMotion: boolean;
        };

        if (isDesktop) {
          content.forEach((cont, index) => {
            const isIndexEven = index % 2 === 0;
            const elements = cont.querySelectorAll(":scope > div");

            //manual method of removing and injecting a new class
            // if (isIndexEven) {
            //   if (cont.classList.contains("md:flex-row")) {
            //     cont.classList.remove("md:flex-row");
            //     cont.classList.add("md:flex-row-reverse");
            //   }
            // }

            //direcrtly overwrite the default flex direction
            //it will have a conflict on responsive if not put in match media desktop
            //Swap the item on each colum , to index column item is row, if odd row-reverse
            gsap.set(cont, {
              flexDirection: isIndexEven ? "row" : "row-reverse",
            });

            //after finishing the scroll only display the swapped items but does not execute animation
            if (hasScrolled) return;

            //put outside the elements
            //left-item <- [inside] [inside] -> right item
            gsap.set(elements, {
              xPercent: isIndexEven
                ? gsap.utils.wrap([-100, 100])
                : gsap.utils.wrap([100, -100]),
            });

            const tween = gsap.fromTo(
              elements,
              { opacity: 0 },
              {
                id: "display the elements from the outside to inside",
                opacity: 1,
                xPercent: gsap.utils.wrap([0, 0]),
              },
            );

            ScrollTrigger.create({
              trigger: cont,
              once: true,
              start: "50% bottom",
              end: "50% 50%",
              onLeave: () => {
                //true state will trigger on next component mount to prevent the scroll animation from executing
                updateHasScrolled();
              },
              animation: tween,
            });
          });
        }
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="about min-h-dvh w-full bg-surface lg:p-20 p-10 overflow-hidden"
    >
      <div className="flex flex-col lg:gap-10 gap-5 justify-start items-start">
        <div className="title wrapper w-fit">
          <h6 className="text-end text-xl">V-tuber インフォメーション</h6>
          <h3>About me</h3>
        </div>

        {vtuberInfo.map((info) => {
          return (
            <div
              key={info.title}
              className="content lg:p-20 p-5 h-full w-full flex md:flex-row flex-col md:gap-20 gap-5 justify-around items-start"
            >
              <div className="image-cont h-auto w-full flex flex-col items-center">
                <div className="image lg:h-100 lg:w-100 h-80 w-80 bg-gray-300 relative">
                  <Image
                    src={info.imageSource}
                    alt="image"
                    sizes="400"
                    fill
                    className="h-full w-full"
                  />
                </div>
              </div>

              <div className="info-cont w-full h-auto">
                <div className="flex flex-col lg:gap-10 gap-5">
                  <h3>{info.title}</h3>
                  <p>{info.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
