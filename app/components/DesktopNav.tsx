import React from "react";

export default function DesktopNav() {
  return (
    <nav className="bg-yellow-100 border-5 border-border-color text-primary-text opacity-85 lg:w-fit h-fit px-10 py-5 rounded-xl fixed inset-0 top-10 left-full -translate-x-180 z-10 lg:block hidden ">
      <ul className="flex flex-row justify-center items-center lg:gap-20 gap-10 ">
        <li className="lg:text-2xl md:text-xl text-base">Home</li>
        <li className="lg:text-2xl md:text-xl text-base">About</li>
        <li className="lg:text-2xl md:text-xl text-base">Schedule</li>
        <li className="lg:text-2xl md:text-xl text-base">Contact</li>
      </ul>
    </nav>
  );
}
