import React from "react";
import { navMenu } from "../constants/navMenu";
import Link from "next/link";

export default function DesktopHomeNav() {
  return (
    <nav className="bg-yellow-100 border-5 border-border-color text-primary-text opacity-85 lg:w-fit h-fit px-10 py-5 rounded-xl fixed inset-0 top-10 left-full -translate-x-250 z-10 lg:visible invisible ">
      <ul className="flex flex-row justify-center items-center lg:gap-20 gap-10 ">
        {navMenu.map((navigation) => {
          return (
            <Link href={navigation.link} key={navigation.title}>
              <li className="lg:text-2xl md:text-xl text-base">
                {navigation.title}
              </li>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
}
