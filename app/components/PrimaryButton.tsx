"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

type ButtonProps = { label: string; disabled?: boolean; onClick?: () => void };

export default function PrimaryButton({
  label,
  disabled = false,
  onClick,
}: ButtonProps) {
  const container = useRef<HTMLDivElement | null>(null);
  useGSAP(() => {
    gsap.set(container.current, { opacity: 1 });

    const hoverBox = container.current?.querySelector(".hover-box");
    const buttonLabel = container.current?.querySelector(".button-label");
    if (!hoverBox || !buttonLabel) return;

    const tl = gsap.timeline({ paused: true });
    tl.from(hoverBox, { duration: 0.5, scale: 0, ease: "power2" });
    tl.to(hoverBox, { y: -80, ease: "power4" }, "<");
    tl.to(buttonLabel, { color: "white" }, "<");

    const button = container.current?.querySelector("button");
    button?.addEventListener("mouseenter", () => {
      tl.play();
    });
    button?.addEventListener("mouseleave", () => {
      tl.reverse();
    });
  });

  return (
    <div ref={container} className="opacity-0">
      <button
        type="submit"
        disabled={disabled}
        className="border-2 h-20 w-50 border-border-color md:text-black md:bg-transparent bg-primary-hover rounded-lg bg-none relative overflow-hidden cursor-pointer"
        onClick={onClick}
      >
        <span className="button-label text-xl md:text-primary-text text-white z-10 relative">
          {label}
        </span>
        <div className="hover-box h-20 w-full rounded-4xl bg-primary-hover absolute inset-0 top-full scale-120 lg:block hidden"></div>
      </button>
    </div>
  );
}
