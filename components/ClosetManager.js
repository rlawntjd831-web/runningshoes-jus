"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loadProfile, saveCloset } from "@/lib/profile";
import { formatShoeMileage, getShoeMileageMap } from "@/lib/training";

const PURPOSE_OPTIONS = [
  { id: "daily", label: "데일리" },
  { id: "super", label: "슈퍼 트레이너" },
  { id: "racing", label: "레이싱" },
];

export default function ClosetManager() {
  const router = useRouter();
  const [closet, setCloset] = useState(null);
  const [actualLogs, setActualLogs] = useState({});
  const [name, setName] = useState("");
  const [purpose, setPurpose] = useState("daily");

  useEffect(() => {
    const saved = loadProfile();
    if (!saved) {
      router.replace("/");
      return;
    }
    setCloset(saved.closet ?? []);
    setActualLogs(saved.actualLogs ?? {});
  }, [router]);

  function persist(next) {
    setCloset(next);
    saveCloset(next);
  }

  function addShoe(event) {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed || !closet) return;

    persist([
      ...closet,
      {
        id: `${Date.now()}`,
        name: trimmed,
        purpose,
      },
    ]);
    setName("");
    setPurpose("daily");
  }

  function removeShoe(id) {
    persist(closet.filter((shoe) => shoe.id !== id));
  }

  if (!closet) {
    return (
      <main className="flex min-h-full flex-1 items-center justify-center text-zinc-400">
        불러오는 중...
      </main>
    );
  }

  const shoeMileage = getShoeMileageMap(closet, actualLogs);

  return (
    <main className="mx-auto flex min-h-full w-full max-w-xl flex-1 flex-col px-6 py-12">
      <p className="text-sm font-medium text-lime-400">신발장</p>
      <h1 className="mt-2 text-3xl font-extrabold text-white">신발 추가 / 삭제</h1>

      <form onSubmit={addShoe} className="mt-8 flex flex-col gap-3">
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="신발 이름"
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-lime-400"
        />
        <select
          value={purpose}
          onChange={(event) => setPurpose(event.target.value)}
          className="rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-lime-400"
        >
          {PURPOSE_OPTIONS.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-full bg-lime-400 px-6 py-3 text-base font-bold text-zinc-950 transition hover:bg-lime-300"
        >
          추가
        </button>
      </form>

      <ul className="mt-10 flex flex-col gap-3">
        {closet.map((shoe) => (
          <li
            key={shoe.id}
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
          >
            <div>
              <p className="font-semibold text-white">{shoe.name}</p>
              <p className="mt-1 text-sm text-zinc-400">
                {PURPOSE_OPTIONS.find((option) => option.id === shoe.purpose)?.label ??
                  shoe.purpose}
              </p>
              <p className="mt-1 text-sm font-medium text-lime-400">
                {formatShoeMileage(shoeMileage[shoe.id] ?? 0)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => removeShoe(shoe.id)}
              className="text-sm text-zinc-400 transition hover:text-white"
            >
              삭제
            </button>
          </li>
        ))}
      </ul>

      {!closet.length ? (
        <p className="mt-8 text-sm text-zinc-500">아직 등록된 신발이 없습니다.</p>
      ) : null}

      <Link
        href="/home"
        className="mt-10 self-start rounded-full bg-lime-400 px-8 py-3 text-base font-bold text-zinc-950 transition hover:bg-lime-300"
      >
        홈으로
      </Link>
    </main>
  );
}
