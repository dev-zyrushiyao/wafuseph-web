import { getSlugAnnouncement } from "@/app/service/announcements";
import React, { Suspense } from "react";

async function SlugDetails({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const announcement = await getSlugAnnouncement(slug);

  return <div>{announcement.title}</div>;
}

export default function AnnouncementContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <div>
      Announcement Content
      <Suspense fallback={<div>loading...</div>}>
        <SlugDetails params={params} />
      </Suspense>
    </div>
  );
}
