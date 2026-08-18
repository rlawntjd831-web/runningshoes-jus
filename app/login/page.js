"use client";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  function handleGoogleLogin() {
    router.push("/detail");
  }

  return (
    <main className="flex min-h-full flex-1 flex-col items-center justify-center px-6 py-16">
      <p className="text-sm font-medium text-zinc-400">로그인</p>
      <h1 className="mt-3 text-3xl font-extrabold text-white">구글 로그인</h1>
      <p className="mt-4 text-center text-zinc-400">
        실제 구글 로그인은 나중에 연결할 예정입니다.
      </p>
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="mt-10 rounded-full border border-white/15 bg-white px-8 py-4 text-base font-bold text-zinc-900 transition hover:bg-zinc-100"
      >
        Google로 로그인
      </button>
    </main>
  );
}
