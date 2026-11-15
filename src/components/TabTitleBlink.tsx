"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const BASE_TITLE = "5ee5dev";
const INTERVAL_MS = 2000;

/* Flips the tab title between BASE_TITLE and the current page's title.
   Reads document.title on every tick, so titles set by Next on navigation
   are picked up without any route wiring. The pathname is tracked so a
   page whose title is BASE_TITLE itself (home) isn't mistaken for our own
   flip and replaced by the previous page's title. */
export default function TabTitleBlink() {
  const pathname = usePathname();
  const pathRef = useRef(pathname);

  useEffect(() => {
    pathRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let pageTitle = document.title;
    let capturedPath = pathRef.current;
    const id = window.setInterval(() => {
      const current = document.title;
      if (current !== BASE_TITLE) {
        pageTitle = current;
        capturedPath = pathRef.current;
        document.title = BASE_TITLE;
      } else if (capturedPath !== pathRef.current) {
        pageTitle = BASE_TITLE;
        capturedPath = pathRef.current;
      } else {
        document.title = pageTitle;
      }
    }, INTERVAL_MS);

    return () => {
      window.clearInterval(id);
      if (document.title === BASE_TITLE) document.title = pageTitle;
    };
  }, []);

  return null;
}
