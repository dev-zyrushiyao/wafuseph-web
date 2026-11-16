import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import React, { useRef } from "react";

export default function Carousel() {
  const container = useRef<HTMLDivElement | null>(null);
  useGSAP(() => {
    //carousell
    const carousel = container.current;
    if (!carousel) return;
    const imageCont = carousel.querySelectorAll(".image-cont");
    if (!imageCont) return;

    //svg elem
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 60 300");
    svg.setAttribute("width", "60");
    svg.setAttribute("height", "100%");
    svg.setAttribute("fill", "none");
    svg.classList.add("carousel-dot-svg");
    svg.style.position = "absolute";
    svg.style.top = "0";
    svg.style.right = "0";
    svg.style.zIndex = "5";
    // svg.style.backgroundColor = "#999920";
    svg.style.backdropFilter = "blur(3px)";
    // svg.style.opacity = "100";
    // svg.style.pointerEvents = "none";
    // svg.style.border = "2px solid red";

    //line svg
    //base position of line is the first circle-clone element
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("fill", "none");
    line.setAttribute("stroke", "orange");
    line.setAttribute("stroke-linecap", "round");
    line.setAttribute("stroke-width", "16px");
    line.setAttribute("x1", "30");
    line.setAttribute("y1", "60");
    line.setAttribute("x2", "30");
    line.setAttribute("y2", "60");

    //circle svg
    //circle as DNA clone - do not append
    //only append it's clone to prevent duplicate of position of the first clone and circle(blueprint)
    const circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle",
    );
    circle.setAttribute("fill", "white");
    circle.setAttribute("r", "15");
    circle.setAttribute("cx", "30");
    circle.setAttribute("cy", "60");

    //i == 1 to prevent first element as 'cy' == 0
    //circle array length is maximum of 4
    for (let i = 1; i < 5; i++) {
      const slideIndex = i - 1;
      const clone = circle.cloneNode() as SVGCircleElement;
      const yAxis = circle.getAttribute("cy");
      const newAxis = Number(yAxis) * i;
      clone.setAttribute("cy", newAxis.toString());
      clone.style.pointerEvents = "auto";
      clone.style.cursor = "pointer";

      svg.append(clone);

      clone.addEventListener("click", () => {
        const cloneXaxis = clone.getAttribute("cy");
        if (!cloneXaxis || !imageCont) return;

        const tl = gsap.timeline();
        tl.to(line, { attr: { y2: cloneXaxis } });
        tl.to(line, { ease: "bounce", attr: { y1: cloneXaxis } });
        tl.to(
          imageCont,
          {
            xPercent: -100 * slideIndex,
          },
          "<",
        );
      });
    }

    svg.append(line);
    carousel.prepend(svg);

    return () => {
      svg.remove();
    };
  });

  return (
    <div
      ref={container}
      className="carousel h-[clamp(200px,300px,20vw)] lg:w-150 min-w-75 w-full border-2 rounded-2xl relative  inset-0 lg:left-full lg:top-50 lg:-translate-x-160 overflow-hidden"
    >
      <div className="image-wrapper flex flex-row h-full w-full">
        {Array.from({ length: 4 }, (_, index) => {
          return (
            <Link
              key={index}
              href="/dadad"
              className="shrink-0 h-full w-full cursor-pointer"
            >
              <div
                className="image-cont h-full w-full bg-gray-300 flex flex-col justify-center items-center text-2xl "
                // onClick={() => {
                //   console.log("test");
                // }}
              >
                image{index + 1}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
