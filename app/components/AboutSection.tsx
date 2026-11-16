"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
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
            gsap.set(cont, {
              flexDirection: isIndexEven ? "row" : "row-reverse",
            });

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
              { opacity: 1, xPercent: gsap.utils.wrap([0, 0]) },
            );

            ScrollTrigger.create({
              once: true,
              trigger: cont,
              start: "50% bottom",
              end: "50% 50%",
              markers: true,
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

        {Array.from({ length: 2 }, (_, index) => {
          return (
            <div
              key={index}
              className="content lg:p-20 p-5 h-full w-full flex md:flex-row flex-col md:gap-20 gap-5 justify-around items-start"
            >
              <div className="image-cont h-auto w-full flex flex-col items-center">
                <div className="image lg:h-100 lg:w-100 h-80 w-80 bg-gray-300 "></div>
              </div>

              <div className="info-cont w-full h-auto">
                <div className="flex flex-col lg:gap-10 gap-5">
                  <h3>Introduction</h3>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Aperiam natus velit nostrum autem architecto iure illum,
                    voluptatum hic veritatis eaque, exercitationem magni vero
                    quibusdam fugiat id maxime corporis ducimus blanditiis.
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Aperiam natus velit nostrum autem architecto iure illum,
                    voluptatum hic veritatis eaque, exercitationem magni vero
                    quibusdam fugiat id maxime corporis ducimus blanditiis.
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
