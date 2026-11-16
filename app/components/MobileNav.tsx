"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

export default function MobileNav() {
  const container = useRef<HTMLDivElement | null>(null);

  const [isClicked, setIsClicked] = useState<boolean>(false);
  const menuTl = useRef<gsap.core.Timeline | null>(null);
  useGSAP(
    () => {
      //FUOC
      gsap.set(container.current, { opacity: 1 });

      const mobileMenu = container.current?.querySelector(".mobile-menu");
      const blackCover = container.current?.querySelector(".black-cover");
      const iconClose = container.current?.querySelector(".icon-close");
      if (!mobileMenu || !blackCover || !iconClose) return;

      //tween
      const menuTween = gsap.to(mobileMenu, { xPercent: -100 });
      const coverTween = gsap.to(blackCover, { autoAlpha: 1 });
      const closeIconTween = gsap.to(iconClose, {
        left: "-340px",
      });

      //timeline to handleClick
      menuTl.current = gsap.timeline({ paused: true });
      menuTl.current.add(menuTween);
      menuTl.current.add(coverTween, "<");
      menuTl.current.add(closeIconTween, "<");
      menuTl.current.set(
        document.documentElement,
        {
          scrollbarGutter: "stable",
        },
        "<",
      );
      menuTl.current.set(document.body, { overflow: "hidden" }, "<");
    },
    { scope: container },
  );

  function handleClick() {
    if (isClicked) {
      menuTl.current?.reverse();
      setIsClicked(!isClicked);
    }

    if (!isClicked) {
      menuTl.current?.play();
      setIsClicked(!isClicked);
    }
  }

  return (
    <div
      ref={container}
      className="sticky flex flex-row opacity-0 inset-0 z-20 overflow-y-visible overflow-x-clip lg:hidden"
    >
      <nav className="w-full shrink-0 h-fit bg-primary flex flex-row justify-end p-10">
        <div
          className="icon-wrapper cursor-pointer bg-secondary p-2 rounded-lg"
          onClick={handleClick}
        >
          <GiHamburgerMenu size={24} className="fill-primary-text" />
        </div>
      </nav>
      <div className="flex flex-row relative">
        <div className="mobile-menu h-dvh w-70 bg-secondary absolute left-full inset-0 p-10 z-20 ">
          <ul className="flex flex-col gap-10 justify-center items-center h-150">
            <li className="">Test</li>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
          </ul>
        </div>
        <div
          className="icon-close cursor-pointer h-20 w-20 rounded-xl p-3 flex flex-col justify-center bg-amber-200   absolute inset-0 top-20 z-10"
          onClick={handleClick}
        >
          <IoClose size={24} />
        </div>
        <div className="black-cover h-dvh w-full bg-black/55 fixed inset-0 invisible "></div>
      </div>
    </div>
  );
}
