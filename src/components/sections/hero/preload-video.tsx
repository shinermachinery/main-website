"use client";

import ReactDOM from "react-dom";

export function PreloadVideo({ src }: { src: string }) {
  ReactDOM.preload(src, { as: "video", fetchPriority: "high" });
  return null;
}
