"use client";

import React from "react";

import DOMPurify from "dompurify";

export default function AnnouncementBody({ content }: { content: string }) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(content),
      }}
      className=""
    ></div>
  );
}
