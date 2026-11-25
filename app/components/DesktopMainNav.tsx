import React from "react";
import { navMenu } from "../constants/navMenu";
import Link from "next/link";

export default function DesktopMainNav() {
  return (
    <nav className="bg-primary p-10 lg:flex flex-row justify-end hidden">
      <ul className="flex flex-row justify-end items-center lg:gap-20 gap-10 w-fit rounded-2xl bg-secondary p-5 ">
        {navMenu.map((navigation) => {
          return (
            <Link href={navigation.link} key={navigation.title}>
              <li
                key={navigation.title}
                className="lg:text-2xl md:text-xl text-base text-primary-text"
              >
                {navigation.title}
              </li>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
}
