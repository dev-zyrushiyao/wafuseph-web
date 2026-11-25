"use client";

import React from "react";

import DOMPurify from "isomorphic-dompurify";
import { AnnouncementProp } from "../service/announcements";
import Link from "next/link";
import { IoArrowBackCircle } from "react-icons/io5";
import { formatDate } from "../utils/dateUtils";
import Image from "next/image";

export default function AnnouncementBody({
  announcement,
}: {
  announcement: AnnouncementProp;
}) {
  return (
    <main className="p-10">
      <div className="text-xl italic flex flex-row gap-3 p-5 text-gray-400">
        <Link href={"/"}>
          <span className="hover:text-secondary">Home</span>
        </Link>
        <span>{"/"}</span>
        <Link href={"/announcements"}>
          <span className="hover:text-secondary">Announcements</span>
        </Link>
        <span>{"/"}</span>
        <span className="lg:line-clamp-1 lg:block hidden">
          {announcement.title}
        </span>
        <span className="lg:hidden">
          {announcement.title.length > 10
            ? `${announcement.title.slice(0, 10)}...`
            : announcement.title}
        </span>
      </div>

      <article>
        <div className="post-title flex flex-row gap-10 lg:sticky static top-0 z-10 bg-white">
          <Link href={"/announcements"}>
            <div className="relative inset-0 top-13">
              <IoArrowBackCircle size={64} />
            </div>
          </Link>

          <div className="text-primary-text border-b border-b-primary-text py-3 h-fit w-full flex flex-col">
            <span className="text-2xl">
              {formatDate(announcement.createdAt)}
            </span>
            <h3 className="break-all min-w-0">{announcement.title}</h3>
            <div className="flex flex-row items-center gap-5">
              {announcement.subTitle && (
                <span className="text-2xl font-semibold">
                  {announcement.subTitle}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="lg:px-25 lg:py-5 flex flex-col lg:gap-5">
          {announcement.imageUrl !== null && announcement.imageUrl !== "" && (
            <div className="h-75 w-auto relative">
              <Image
                src={announcement.imageUrl}
                alt="announcement image"
                sizes="596px"
                fill
                loading="eager"
                className="h-full w-full object-contain"
              />
            </div>
          )}

          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(announcement.content, {
                USE_PROFILES: { html: true },
              }),
            }}
            className=""
          />
        </div>
      </article>
    </main>
  );
}
