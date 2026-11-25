import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { AnnouncementProp, getAnnouncements } from "../service/announcements";
import Image from "next/image";
import { useLineStore } from "../store/carouselStore";

export default function Carousel() {
  const container = useRef<HTMLDivElement | null>(null);
  const [announcements, setAnnouncements] = useState<AnnouncementProp[] | null>(
    null,
  );

  //for Gsap SVG Line element - default value: 0
  //update it insde useGsap when animated with Click action
  const y1Axis = useLineStore((state) => state.y1);
  const y2Axis = useLineStore((state) => state.y2);
  const updateY1aXis = useLineStore((state) => state.updateY1);
  const updateY2aXis = useLineStore((state) => state.updateY2);

  useEffect(() => {
    async function fetchAnnouncements() {
      const data = await getAnnouncements();

      const filteredWithPhoto = data.filter(
        (annon) => annon.imageUrl != null && annon.imageUrl !== "",
      );

      const latestAnnouncements = filteredWithPhoto.slice(0, 4);
      setAnnouncements(latestAnnouncements);
    }

    fetchAnnouncements();
  }, []);

  useGSAP(
    () => {
      //carousell
      const carousel = container.current;
      if (!carousel) return;
      const imageCont = carousel.querySelectorAll(".image-cont");
      if (!imageCont) return;

      //GSAP Injects xPercent / translate to ImageCont so it remembers where the user is left off
      //however the line has hardcoded value before so it start from the top every time the component mounts
      //to fix this I use a zustand state to set a default value as starting point and when I click the line, the animation executes and it saves the value of y1,y2 on the state
      //when the component re-mount the component using carousel it uses the last value (after animation) it saved as its default starting position.

      // if (imageCont.length === 0) return;

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
      //use y1Axis y2Axis zustand starting value as default yAxis
      const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line",
      );
      line.setAttribute("fill", "none");
      line.setAttribute("stroke", "orange");
      line.setAttribute("stroke-linecap", "round");
      line.setAttribute("stroke-width", "16px");
      line.setAttribute("x1", "30");
      line.setAttribute("y1", `${y1Axis}`);
      line.setAttribute("x2", "30");
      line.setAttribute("y2", `${y2Axis}`);

      //circle svg
      //circle as DNA clone - do not append
      //only append it's clone to prevent duplicate of position of the first clone and circle(blueprint)
      const circle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle",
      );
      circle.setAttribute("fill", "white");
      circle.setAttribute("stroke", "gray");
      circle.setAttribute("stroke-width", "2");
      circle.setAttribute("r", "15");
      circle.setAttribute("cx", "30");
      circle.setAttribute("cy", "60");

      if (!announcements) return;

      //i == 1 to prevent first element as 'cy' == 0
      //array.length should be + 1
      //circle array length is maximum of 4 items
      //targetLength should be 5(MAX - 4 items)
      const targetLength =
        announcements.length === 0 ? 5 : announcements.length + 1;

      for (let i = 1; i < targetLength; i++) {
        const slideIndex = i - 1; // this is for the xPercent movement of carousel
        const clone = circle.cloneNode() as SVGCircleElement;
        const yAxis = circle.getAttribute("cy");
        const newAxis = Number(yAxis) * i;

        clone.setAttribute("cy", newAxis.toString());
        clone.style.pointerEvents = "auto";
        clone.style.cursor = "pointer";

        //append the clone circle in SVG
        svg.append(clone);

        //add onClick for each clones
        clone.addEventListener("click", () => {
          const cloneYAxis = clone.getAttribute("cy");
          if (!cloneYAxis || !imageCont) return;

          const targetY = Number(cloneYAxis);
          updateY1aXis(targetY);
          updateY2aXis(targetY);

          const tl = gsap.timeline();
          tl.to(line, { attr: { y2: targetY } });
          tl.to(line, { ease: "bounce", attr: { y1: targetY } });
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
    },
    { scope: container, dependencies: [announcements] },
  );

  return (
    <div
      ref={container}
      className="carousel h-[clamp(250px,300px,40vw)] lg:w-150 md:w-100 w-full border-2 rounded-2xl relative  inset-0 lg:left-full lg:top-50 lg:-translate-x-160 overflow-hidden"
    >
      <div className="image-wrapper flex flex-row h-full w-full">
        {announcements !== null && announcements.length
          ? announcements.map((announ) => {
              return (
                <Link
                  key={announ.id}
                  href={`/announcements/${announ.slug}`}
                  className="shrink-0 h-full w-full cursor-pointer"
                >
                  <div className="image-cont h-75 w-auto bg-gray-300 relative">
                    {/* h-[296px] w-[596px] */}
                    {/* sizes="(max-width: 768px) 100vw, 596px" */}
                    <Image
                      src={announ.imageUrl}
                      alt="announcement image"
                      sizes="596px"
                      fill
                      loading="eager"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </Link>
              );
            })
          : Array.from({ length: 4 }, (_, index) => {
              return (
                <div
                  key={index}
                  className="image-cont shrink-0 h-full w-full bg-gray-300 flex flex-col justify-center items-center text-2xl "
                >
                  image{index + 1}
                </div>
              );
            })}
      </div>
    </div>
  );
}
