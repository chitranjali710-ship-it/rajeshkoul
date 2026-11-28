"use client";
import { useEffect } from "react";

/* Sets the browser tab title on pages that can't export metadata (e.g. the 404 page). */
export function DocumentTitle({ title }: { title: string }) {
  useEffect(() => { document.title = title; }, [title]);
  return null;
}
