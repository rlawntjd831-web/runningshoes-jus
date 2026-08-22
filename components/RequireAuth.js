"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function RequireAuth({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace(`/login?next=${encodeURIComponent(pathname)}`);
        return;
      }
      setReady(true);
    });
  }, [pathname, router]);

  if (!ready) {
    return (
      <main className="flex min-h-full flex-1 items-center justify-center text-zinc-400">
        불러오는 중...
      </main>
    );
  }

  return children;
}
