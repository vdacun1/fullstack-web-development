"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LocalProxy({ page }) {
  const router = useRouter();

  useEffect(() => {
    console.log("Redirecting to", page);
    router.push(page);
  }, []);

  return;
}
