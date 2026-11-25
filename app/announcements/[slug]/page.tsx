import AnnouncementBody from "@/app/components/AnnouncementBody";
import DesktopMainNav from "@/app/components/DesktopMainNav";
import MobileNav from "@/app/components/MobileNav";
import {
  AnnouncementProp,
  getSlugAnnouncement,
} from "@/app/service/announcements";
import { notFound } from "next/navigation";

import React, { Suspense } from "react";
import Loading from "./loading";

async function SlugDetails({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let announcement: AnnouncementProp | null = null;

  try {
    announcement = await getSlugAnnouncement(slug);
  } catch (error) {
    console.log(`Failed to fetch announcement: ${error}`);
    return (
      <main className="p-10">
        <p className="text-red-600">
          Unable to load this announcement right now. Please try again.
        </p>
      </main>
    );
  }

  if (!announcement) {
    notFound();
  }

  return (
    <div>
      <AnnouncementBody announcement={announcement} />
    </div>
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

      <Suspense fallback={<Loading />}>
        <SlugDetails params={params} />
      </Suspense>
    </div>
  );
}
