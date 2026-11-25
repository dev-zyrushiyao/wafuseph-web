import AnnouncementBody from "@/app/components/AnnouncementBody";
import DesktopMainNav from "@/app/components/DesktopMainNav";
import MobileNav from "@/app/components/MobileNav";
import { getSlugAnnouncement } from "@/app/service/announcements";
import { formatDate } from "@/app/utils/dateUtils";
import Image from "next/image";
import React, { Suspense } from "react";
import { IoArrowBackCircle } from "react-icons/io5";

async function SlugDetails({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const announcement = await getSlugAnnouncement(slug);

  if (!announcement) return;

  return (
    <main className="p-10">
      <div className="text-xl italic flex flex-row gap-3 p-5 text-gray-400 bg-pink-200">
        <span className="hover:text-secondary">Announcements</span>
        <span>{"/"}</span>
        <span className="line-clamp-1">{announcement.title}</span>
      </div>

      <article>
        <div className="post-title flex flex-row gap-10 relative">
          <div className="relative inset-0 top-13">
            <IoArrowBackCircle size={64} />
          </div>
          <div className="text-primary-text border-b border-b-primary-text py-3 h-fit w-full flex flex-col">
            <span className="text-2xl">
              {formatDate(announcement.createdAt)}
            </span>
            <h3>{announcement.title}</h3>
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
          <div className="h-75 w-auto relative">
            <Image
              src={announcement.imageUrl}
              alt="announcement image"
              sizes="596px"
              fill
              loading="eager"
              className="h-full w-full object-contain"
            ></Image>
          </div>
          <AnnouncementBody content={announcement.content} />
        </div>
      </article>
    </main>
  );
}

export default function AnnouncementContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <div>
      <MobileNav />

      <DesktopMainNav />

      <Suspense fallback={<div>loading...</div>}>
        <SlugDetails params={params} />
      </Suspense>
    </div>
  );
}
