"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { loadProfile, saveActualTraining } from "@/lib/profile";
import {
  TRAINING_MONTH,
  TRAINING_TYPES,
  dateKey,
  getDayRecord,
  isFutureDate,
  kindFromType,
} from "@/lib/training";

export default function TrainingEditor() {
  const router = useRouter();
  const params = useSearchParams();
  const year = Number(params.get("year")) || TRAINING_MONTH.year;
  const month = Number(params.get("month")) || TRAINING_MONTH.month;
  const day = Number(params.get("day")) || TRAINING_MONTH.today;

  const [ready, setReady] = useState(false);
  const [hasPlan, setHasPlan] = useState(false);
  const [rest, setRest] = useState(false);
  const [type, setType] = useState("이지런");
  const [km, setKm] = useState("8");
  const future = isFutureDate(year, month, day);

  useEffect(() => {
    const saved = loadProfile();
    const logs = saved?.actualLogs ?? {};
    const key = dateKey(year, month, day);
    setHasPlan(Boolean(logs[key]));
    const record = getDayRecord(year, month, day, logs);
    const isRest = record.trainingType === "휴식일" || record.kind === "rest";
    setRest(isRest && record.trainingType !== "예정 없음");
    if (record.trainingType && record.trainingType !== "휴식일" && record.trainingType !== "예정 없음") {
      setType(
        TRAINING_TYPES.includes(record.trainingType)
          ? record.trainingType
          : "이지런",
      );
    }
    if (record.trainingDistance) {
      setKm(String(record.trainingDistance.replace("km", "")));
    }
    setReady(true);
  }, [year, month, day]);

  function removePlan() {
    saveActualTraining(dateKey(year, month, day), null);
    router.push("/mypage");
  }

  function save(event) {
    event.preventDefault();
    const key = dateKey(year, month, day);

    if (rest) {
      saveActualTraining(key, { rest: true, kind: "rest" });
    } else {
      saveActualTraining(key, {
        type,
        km: Number(km),
        kind: kindFromType(type),
        rest: false,
      });
    }

    router.push("/mypage");
  }

  if (!ready) {
    return (
      <main className="flex min-h-full flex-1 items-center justify-center text-zinc-400">
        불러오는 중...
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-full w-full max-w-xl flex-1 flex-col px-6 py-12">
      <p className="text-sm font-medium text-lime-400">훈련 기록</p>
      <h1 className="mt-2 text-3xl font-extrabold text-zinc-950">
        {year}년 {month}월 {day}일
      </h1>
      <p className="mt-2 text-sm text-zinc-400">
        {future
          ? "아직 오지 않은 날입니다. 미리 계획을 세우거나, 마음이 바뀌면 계획을 지울 수 있습니다."
          : "기본값은 추천 훈련입니다. 실제로 한 내용으로 바꿔 저장하세요."}
      </p>

      <form onSubmit={save} className="mt-8 flex flex-col gap-4">
        <label className="flex items-center gap-3 text-zinc-950">
          <input
            type="checkbox"
            checked={rest}
            onChange={(event) => setRest(event.target.checked)}
            className="h-4 w-4 accent-lime-400"
          />
          휴식일로 기록
        </label>

        {rest ? null : (
          <>
            <select
              value={type}
              onChange={(event) => setType(event.target.value)}
              className="rounded-2xl border border-zinc-200 bg-zinc-100 px-4 py-3 text-zinc-950 outline-none focus:border-lime-400"
            >
              {TRAINING_TYPES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <input
              type="number"
              min="0"
              step="0.1"
              value={km}
              onChange={(event) => setKm(event.target.value)}
              placeholder="거리(km)"
              className="rounded-2xl border border-zinc-200 bg-zinc-100 px-4 py-3 text-zinc-950 outline-none placeholder:text-zinc-500 focus:border-lime-400"
            />
          </>
        )}

        <button
          type="submit"
          className="rounded-full bg-lime-400 px-6 py-3 text-base font-bold text-zinc-950 transition hover:bg-lime-300"
        >
          {future ? "계획 저장" : "저장"}
        </button>
      </form>

      {future && hasPlan ? (
        <button
          type="button"
          onClick={removePlan}
          className="mt-4 self-start text-sm text-zinc-400 transition hover:text-zinc-950"
        >
          계획 삭제
        </button>
      ) : null}

      <Link
        href="/mypage"
        className="mt-8 self-start text-sm text-zinc-400 transition hover:text-zinc-950"
      >
        마이페이지로
      </Link>
    </main>
  );
}
