"use server";

import { cacheLife, cacheTag } from "next/cache";

export type AnnouncementProp = {
  id: string;
  content: string;
  createdAt: Date;
  imageUrl: string;
  slug: string;
  subTitle: string;
  title: string;
  updatedAt: Date | null;
};

export async function getAnnouncements() {
  "use cache";
  cacheLife("weeks");
  cacheTag("announcements");

  const res = await fetch(
    "http://localhost:8080/api/visitor/view/announcements",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

  const announcements = (await res.json()) as AnnouncementProp[];
  return announcements;
}

export async function getSlugAnnouncement(slug: string) {
  "use cache";
  cacheLife("weeks");
  cacheTag("slugAnnouncements");

  const res = await fetch(
    `http://localhost:8080/api/visitor/view/announcements/${slug}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

  const announcements = (await res.json()) as AnnouncementProp;
  return announcements;
}
