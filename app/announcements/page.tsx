import React from "react";
import MobileNav from "../components/MobileNav";
import DesktopMainNav from "../components/DesktopMainNav";
import Link from "next/link";
import { getAnnouncements } from "../service/announcements";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { IoArrowBackCircle } from "react-icons/io5";
import { formatDate, formatShortDate } from "../utils/dateUtils";

export default async function AnnouncementPage() {
  const announcements = await getAnnouncements();

  //display only 20 updated announcements
  announcements.slice(0, 20);

  return (
    <div>
      <MobileNav />
      <DesktopMainNav />

      <div>
        <main className="p-10">
          <div className="text-xl italic flex flex-row gap-3 p-5 text-gray-400">
            <Link href={"/"}>
              <span className="hover:text-secondary">Home</span>
            </Link>
            <span>{"/"}</span>

            <span>Announcements</span>

            <span>{"/"}</span>
          </div>

          <div>
            <div className="flex flex-row gap-5">
              <Link href={"/"}>
                <div className="">
                  <IoArrowBackCircle size={64} />
                </div>
              </Link>
              <h3>Latest Announcements</h3>
            </div>
            <div className="px-5 py-3 flex flex-col gap-3">
              {announcements.length === 0 ? (
                <div className="h-100 w-full">
                  <p className="text-2xl text-gray-300">No data to display</p>
                </div>
              ) : (
                announcements.map((announ) => {
                  return (
                    <Link
                      href={`/announcements/${announ.slug}`}
                      key={announ.id}
                    >
                      <div
                        className="hover:bg-secondary/50"
                        title={formatDate(announ.createdAt)}
                      >
                        <div className="flex flex-row justify-start items-center gap-5">
                          <MdOutlineArrowForwardIos />
                          <p>
                            <span>{formatShortDate(announ.createdAt)}</span>
                            {" - "}
                            {announ.title}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
