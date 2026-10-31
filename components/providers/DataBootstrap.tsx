"use client";

import { useEffect } from "react";
import { ensureSeeded } from "@/lib/storage";

export function DataBootstrap() {
  useEffect(() => {
    ensureSeeded();
  }, []);
  return null;
}
