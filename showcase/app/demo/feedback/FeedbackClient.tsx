"use client";

import dynamic from "next/dynamic";

export const FeedbackClient = dynamic(
  () => import("./FeedbackShowcase").then((m) => m.FeedbackShowcase),
  { ssr: false }
);
