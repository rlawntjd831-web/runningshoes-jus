"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { loadProfile, saveWeatherLog } from "@/lib/profile";
import { auth } from "@/lib/firebase";
import { pickClosetShoe } from "@/lib/today";
import { dateKey, formatShoeMileage, getDayRecord, getShoeMileageMap, TRAINING_MONTH } from "@/lib/training";
import { getMotivation } from "@/lib/motivation";
import { WEATHER_LOCATION, compareYmd, getKstParts } from "@/lib/weather";
import MonthTraining from "@/components/MonthTraining";

export default function HomeDashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState(undefined);
  const [openSurvey, setOpenSurvey] = useState(null);
  const [liveWeather, setLiveWeather] = useState(null);
  const [selected, setSelected] = useState({
    year: TRAINING_MONTH.year,
    month: TRAINING_MONTH.month,
    day: TRAINING_MONTH.today,
  });

  useEffect(() => {
    const saved = loadProfile();
    if (!saved) {
      router.replace("/");
      return;
    }
    setProfile(saved);
  }, [router]);

  useEffect(() => {
    const controller = new AbortController();
    const key = dateKey(selected.year, selected.month, selected.day);
    const today = getKstParts();
    const diff = compareYmd(selected, today);
    const savedLog = loadProfile()?.weatherLogs?.[key];

    if (diff < 0) {
      setLiveWeather(
        savedLog
          ? { ok: true, source: "기록", ...savedLog }
          : { ok: false, code: "past" },
      );
      return undefined;
    }

    setLiveWeather({ status: "loading" });

    fetch(
      `/api/weather?year=${selected.year}&month=${selected.month}&day=${selected.day}`,
      { signal: controller.signal },
    )
      .then((response) => response.json())
      .then((data) => {
        setLiveWeather(data);
        if (data?.ok && diff === 0) {
          saveWeatherLog(key, {
            label: data.label,
            note: data.note,
            pty: data.pty,
            sky: data.sky,
            temp: data.temp,
            rainy: data.rainy,
            location: data.location,
          });
        }
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setLiveWeather({ ok: false, code: "error" });
        }
      });

    return () => controller.abort();
  }, [selected.year, selected.month, selected.day]);

  if (!profile) {
    return (
      <main className="flex min-h-full flex-1 items-center justify-center text-zinc-400">
        불러오는 중...
      </main>
    );
  }

  const surveys = profile.surveys ?? [];
  const closet = profile.closet ?? [];
  const dayRecord = getDayRecord(
    selected.year,
    selected.month,
    selected.day,
    profile.actualLogs,
  );
  const motivation = getMotivation(selected.year, selected.month, selected.day);
  const recommended = pickClosetShoe(closet, dayRecord.kind, {
    rainy: Boolean(liveWeather?.rainy),
  });
  const shoeMileage = getShoeMileageMap(closet, profile.actualLogs);
  const isToday =
    selected.year === TRAINING_MONTH.year &&
    selected.month === TRAINING_MONTH.month &&
    selected.day === TRAINING_MONTH.today;
  const weatherTitle = isToday
    ? "오늘의 날씨"
    : `${selected.month}월 ${selected.day}일 날씨`;
  const weatherLabel = liveWeather?.ok
    ? liveWeather.label
    : liveWeather?.status === "loading"
      ? "불러오는 중..."
      : liveWeather?.code === "past"
        ? "기록 없음"
        : liveWeather?.code === "range"
          ? "예보 없음"
          : liveWeather?.code === "error"
            ? "불러오지 못함"
            : dayRecord.weatherLabel;
  const weatherNote = liveWeather?.ok
    ? liveWeather.note
    : liveWeather?.status === "loading"
      ? "기상청 단기예보를 불러오는 중입니다."
      : liveWeather?.code === "past"
        ? "그날 저장해 둔 날씨 기록이 없습니다."
        : liveWeather?.code === "range"
          ? "아직 예보가 발표되지 않은 날짜입니다."
          : liveWeather?.code === "error"
            ? "기상청에서 날씨를 가져오지 못했습니다."
            : dayRecord.weatherNote;
  const trainingTitle = isToday
    ? "오늘의 훈련"
    : `${selected.month}월 ${selected.day}일 훈련`;

  return (
    <main className="flex min-h-full flex-1">
      <aside className="flex w-60 shrink-0 flex-col border-r border-white/10 bg-zinc-900 px-3 py-6">
        <p className="text-base font-medium text-lime-400">내 설문 결과</p>
        <ul className="mt-4 space-y-2">
          {surveys.map((item) => (
            <li key={item.date}>
              <button
                type="button"
                onClick={() => setOpenSurvey(item)}
                className="w-full rounded-lg px-3 py-2 text-left font-mono text-xl font-semibold text-white transition hover:bg-white/10"
              >
                {item.date}
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => {
            signOut(auth).then(() => router.push("/login"));
          }}
          className="mt-auto pt-6 text-left text-sm text-zinc-500 transition hover:text-white"
        >
          로그아웃
        </button>
      </aside>

      <section className="flex flex-1 flex-col gap-6 p-8">
        <div>
          <p className="text-sm font-medium text-zinc-400">홈</p>
          <h2 className="mt-1 text-3xl font-extrabold text-white">오늘도 가볍게 한 바퀴</h2>
        </div>

        <article className="rounded-2xl border border-lime-400 bg-lime-400 p-5">
          <p className="text-sm font-semibold text-zinc-900">동기부여</p>
          <p className="mt-2 text-xl font-extrabold text-zinc-950">
            {motivation}
          </p>
        </article>

        <div className="flex min-h-0 flex-1 gap-6">
          <MonthTraining
            selected={selected}
            onSelect={setSelected}
            actualLogs={profile.actualLogs}
          />

          <div className="flex w-96 shrink-0 flex-col gap-4">
            <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-zinc-400">{weatherTitle}</p>
              <p className="mt-1 text-xs text-zinc-500">
                {WEATHER_LOCATION.name} ·{" "}
                {liveWeather?.source === "기록"
                  ? "저장된 실황"
                  : liveWeather?.source === "단기예보"
                    ? "단기예보"
                    : "기상청"}
              </p>
              <p className="mt-2 text-2xl font-bold text-white">{weatherLabel}</p>
              <p className="mt-2 text-sm text-zinc-400">{weatherNote}</p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm text-zinc-400">{trainingTitle}</p>
                <Link
                  href={`/training?year=${selected.year}&month=${selected.month}&day=${selected.day}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-lime-400 transition hover:bg-lime-400/10"
                  aria-label="실제 훈련 기록하기"
                >
                  <span className="text-xl leading-none">→</span>
                </Link>
              </div>
              <p className="mt-1 text-xs font-medium text-lime-400">
                {dayRecord.isPlanned
                  ? "미리 세운 계획"
                  : dayRecord.isActual
                    ? "실제 기록"
                    : "추천 훈련"}
              </p>
              <p className="mt-2 text-2xl font-bold text-white">{dayRecord.trainingType}</p>
              {dayRecord.trainingDistance ? (
                <p className="text-2xl font-bold text-white">{dayRecord.trainingDistance}</p>
              ) : null}
              <p className="mt-2 text-sm text-zinc-400">{dayRecord.trainingNote}</p>
            </article>
            <article className="relative flex-1 rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm text-zinc-400">내 신발장</p>
                <Link
                  href="/closet"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-lime-400 transition hover:bg-lime-400/10"
                  aria-label="신발 추가 및 삭제"
                >
                  <span className="text-xl leading-none">→</span>
                </Link>
              </div>
              {closet.length ? (
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {closet.map((shoe) => (
                    <div
                      key={shoe.id}
                      className={`flex min-h-24 flex-col rounded-xl px-3 pt-5 pb-1.5 text-center text-sm font-semibold ${
                        recommended?.id === shoe.id
                          ? "border border-lime-400 bg-lime-400/10 text-lime-300"
                          : "border border-white/10 text-white"
                      }`}
                    >
                      <p>{shoe.name}</p>
                      <p
                        className={`mt-auto text-xs font-medium ${
                          recommended?.id === shoe.id ? "text-lime-300" : "text-zinc-400"
                        }`}
                      >
                        {formatShoeMileage(shoeMileage[shoe.id] ?? 0)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm text-zinc-500">
                  오른쪽 위 화살표에서 신발을 추가해 보세요.
                </p>
              )}
            </article>
          </div>
        </div>
      </section>

      {openSurvey ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-zinc-900 p-8">
            <button
              type="button"
              onClick={() => setOpenSurvey(null)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-xl text-zinc-400 transition hover:bg-white/10 hover:text-white"
              aria-label="닫기"
            >
              ×
            </button>
            <h2 className="pr-10 font-mono text-2xl font-extrabold text-white">
              {openSurvey.date}
            </h2>
            {openSurvey.selectedShoe ? (
              <div className="mt-6 rounded-2xl border border-lime-400/30 bg-lime-400/10 px-4 py-5 text-center text-lg font-semibold text-lime-300">
                {openSurvey.selectedShoe.name}
              </div>
            ) : (
              <ul className="mt-6 grid grid-cols-3 gap-2">
                {(openSurvey.shoes ?? []).map((shoe) => (
                  <li
                    key={shoe.id}
                    className="rounded-xl border border-white/10 bg-white/5 px-2 py-4 text-center text-sm font-semibold text-white"
                  >
                    {shoe.name}
                  </li>
                ))}
              </ul>
            )}
            <ul className="mt-6 max-h-80 space-y-4 overflow-y-auto">
              {openSurvey.survey.map((item) => (
                <li key={item.question}>
                  <p className="text-xs text-zinc-500">{item.question}</p>
                  <p className="mt-1 text-sm font-medium text-white">{item.answer}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </main>
  );
}
