import React from "react";
import { navMenu } from "../constants/navMenu";

export default function DesktopMainNav() {
  return (
    <nav className="bg-primary p-10 flex flex-row justify-end">
      <ul className="flex flex-row justify-end items-center lg:gap-20 gap-10 w-fit rounded-2xl bg-secondary p-5 ">
        {navMenu.map((item) => {
          return (
            <li
              key={item.menu}
              className="lg:text-2xl md:text-xl text-base text-primary-text"
            >
              {item.menu}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
