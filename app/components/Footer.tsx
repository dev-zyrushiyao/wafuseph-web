import React from "react";
import { PiTwitchLogoFill } from "react-icons/pi";
import { ImFacebook2 } from "react-icons/im";
import { TbBrandYoutubeFilled } from "react-icons/tb";
import { FaTwitter } from "react-icons/fa6";

import Link from "next/link";

type SocialLink = {
  twitch: string;
  facebook: string;
  youtube: string;
  twitter: string;
};

const wafuSocial: SocialLink = {
  twitch: "https://www.twitch.tv/JosephWaffleVT",
  facebook: "https://www.facebook.com/JosephWaffleVT",
  youtube: "https://www.youtube.com/@josephwafflevt",
  twitter: "https://x.com/JosephWaffleVT",
};

const developer = {
  name: "Zyrus Hiyao.",
  link: "https://zyrushiyao.vercel.app/",
};

export default function Footer() {
  return (
    <div className="bg-primary-text  overflow-clip">
      <div className="p-10 flex lg:flex-row flex-col gap-5 justify-between">
        <div className="flex flex-col gap-5">
          <h4 className="text-white!">Joseph Waffle</h4>

          <ul>
            <li className="text-white! text-sm">Waffle City</li>
            <li className="text-white!">V-Tuber</li>
          </ul>
        </div>

        <div className="icons-wrapper lg:w-120 w-full flex flex-col lg:items-center items-start justify-end gap-2 ">
          <span className="text-white text-2xl">Follow me</span>
          <div className="flex flex-row gap-5 items-center text-white">
            <Link href={wafuSocial.twitch} target="_blank">
              <div className="hover:bg-[#9146ff] p-2 rounded-xs">
                <PiTwitchLogoFill
                  fill="white"
                  stroke="black"
                  strokeWidth={13}
                  size={48}
                  title="twitch"
                />
              </div>
            </Link>

            <Link href={wafuSocial.facebook} target="_blank">
              <div className="hover:bg-[#dfe3ee] p-2 rounded-xs relative">
                <ImFacebook2
                  size={48}
                  fill="#3b5998"
                  title="facebook"
                  className="relative z-5"
                />
                <div className="box-background bg-[#dfe3ee] h-10 w-6 absolute inset-0 left-6 top-4 z-0" />
              </div>
            </Link>

            <Link href={wafuSocial.twitter} target="_blank">
              <div className="hover:bg-[#1DA1F2] p-2 rounded-xs relative">
                <FaTwitter size={40} />
                {/* <div className="box-background bg-[#dfe3ee] h-10 w-6 absolute inset-0 left-5 top-2 z-0" /> */}
              </div>
            </Link>

            <Link href={wafuSocial.youtube} target="_blank">
              <div className="hover:bg-[#eeeeee] p-2 rounded-xs relative">
                <TbBrandYoutubeFilled
                  size={48}
                  title="youtube"
                  fill="#e31010"
                  className="relative z-5"
                />
                <div className="box-background bg-[#eeeeee] h-5 w-5 absolute inset-0 left-5.5 top-5.5 z-0" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="credit-wrapper bg-gray-500">
        <p className="text-sm text-white px-10">
          Website platform and CMS designed, animated, and developed by{` `}
          <Link href={developer.link}>
            <span className="font-bold hover:text-secondary">
              {developer.name}
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
