"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

function safeNext(value) {
  if (value && value.startsWith("/") && !value.startsWith("//")) {
    return value;
  }
  return "/mypage";
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = safeNext(searchParams.get("next"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) router.replace(next);
    });
  }, [next, router]);

  async function handleGoogleLogin() {
    setError("");
    setLoading(true);

    try {
      await signInWithPopup(auth, googleProvider);
      router.push(next);
    } catch (loginError) {
      if (
        loginError.code === "auth/popup-closed-by-user" ||
        loginError.code === "auth/cancelled-popup-request"
      ) {
        return;
      }
      if (loginError.code === "auth/unauthorized-domain") {
        setError("이 주소에서는 구글 로그인을 사용할 수 없습니다.");
        return;
      }
      setError("구글 로그인에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-full flex-1 flex-col items-center justify-center px-6 py-16">
      <p className="text-sm font-medium text-zinc-400">구글 로그인</p>
      <h1 className="mt-3 text-3xl font-extrabold text-zinc-950">구글 로그인</h1>
      <p className="mt-4 max-w-md text-center text-zinc-400">
        마이페이지와 심화 설문을 쓰려면 구글 로그인이 필요합니다.
      </p>
      {error ? <p className="mt-4 text-sm text-red-400">{error}</p> : null}
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={loading}
        className="mt-10 rounded-full border border-zinc-300 bg-white px-8 py-4 text-base font-bold text-zinc-900 transition hover:bg-zinc-100 disabled:opacity-60"
      >
        {loading ? "로그인 중..." : "Google로 로그인"}
      </button>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-full flex-1 items-center justify-center text-zinc-400">
          불러오는 중...
        </main>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
