import React from "react";
import { PiTwitchLogoFill } from "react-icons/pi";
import { ImFacebook2 } from "react-icons/im";
import { TbBrandYoutubeFilled } from "react-icons/tb";

export default function Footer() {
  return (
    <div className="bg-primary-text p-10 overflow-clip flex flex-row justify-between">
      <div className="flex flex-col gap-10">
        <h4 className="text-white!">Joseph Waffle</h4>
        <div className="flex flex-row justify-between">
          <ul>
            <li className="text-white!">Waffle City</li>
            <li className="text-white!">V-Tuber</li>
          </ul>
        </div>
      </div>

      <div className="icons-wrapper w-100 flex flex-col items-center justify-end gap-2">
        <span className="text-white text-2xl">Follow me</span>
        <div className="flex flex-row gap-5 items-center text-white">
          <div className="hover:bg-[#9146ff] p-2 rounded-xs">
            <PiTwitchLogoFill
              fill="white"
              stroke="black"
              strokeWidth={13}
              size={48}
              title="twitch"
            />
          </div>
          <div className="hover:bg-[#dfe3ee] p-2 rounded-xs relative">
            <ImFacebook2
              size={40}
              fill="#3b5998"
              title="facebook"
              className="relative z-5"
            />
            <div className="box-background bg-[#dfe3ee] h-10 w-6 absolute inset-0 left-5 top-2 z-0" />
          </div>
          <div className="hover:bg-[#eeeeee] p-2 rounded-xs relative">
            <TbBrandYoutubeFilled
              size={48}
              title="youtube"
              fill="#e31010"
              className="relative z-5"
            />
            <div className="box-background bg-[#eeeeee] h-5 w-5 absolute inset-0 left-5.5 top-5.5 z-0" />
          </div>
        </div>
      </div>
    </div>
  );
}
