"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    signOut(auth).finally(() => {
      router.replace("/login");
    });
  }, [router]);

  return (
    <main className="flex min-h-full flex-1 items-center justify-center text-zinc-400">
      로그아웃 중...
    </main>
  );
}
