"use client";

import { useState } from "react";
import {
  TRAINING_MONTH,
  getLogsForMonth,
  getMonthGrid,
  getMonthMileage,
  getRaceDDay,
  shiftMonth,
  formatKm,
} from "@/lib/training";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

export default function MonthTraining({ selected, onSelect, actualLogs }) {
  const [view, setView] = useState({
    year: TRAINING_MONTH.year,
    month: TRAINING_MONTH.month,
  });
  const logs = getLogsForMonth(view.year, view.month, actualLogs);
  const cells = getMonthGrid(view.year, view.month);
  const dDay = getRaceDDay({
    year: selected.year,
    month: selected.month,
    today: selected.day,
  });
  const mileage = getMonthMileage(logs);
  const dDayLabel = dDay > 0 ? `D-${dDay}` : "D-Day";

  function goMonth(delta) {
    setView((current) => shiftMonth(current.year, current.month, delta));
  }

  return (
    <article className="flex min-h-0 flex-1 flex-col rounded-2xl border border-white/10 bg-white/5 p-5">
      <p className="text-sm text-zinc-400">이달의 훈련</p>
      <div className="mt-2 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => goMonth(-1)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-xl text-zinc-400 transition hover:bg-white/10 hover:text-white"
            aria-label="이전 달"
          >
            ‹
          </button>
          <h3 className="min-w-36 text-center text-2xl font-extrabold text-white">
            {view.year}년 {view.month}월
          </h3>
          <button
            type="button"
            onClick={() => goMonth(1)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-xl text-zinc-400 transition hover:bg-white/10 hover:text-white"
            aria-label="다음 달"
          >
            ›
          </button>
        </div>
        <div className="flex items-center gap-6">
          {dDay >= 0 ? (
            <p className="text-2xl font-extrabold text-lime-400">
              {TRAINING_MONTH.raceName} {dDayLabel}
            </p>
          ) : null}
          <p className="text-2xl font-extrabold text-white">이번달 {mileage}km</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs font-medium text-zinc-500">
        {WEEKDAYS.map((day) => (
          <div key={day} className="py-1">
            {day}
          </div>
        ))}
      </div>
      <div className="mt-1 grid flex-1 grid-cols-7 grid-rows-6 gap-1">
        {cells.map((day, index) => {
          if (!day) {
            return <div key={`empty-${index}`} />;
          }

          const log = logs[day];
          const isSelected =
            view.year === selected.year &&
            view.month === selected.month &&
            day === selected.day;
          const isRace =
            view.year === TRAINING_MONTH.year &&
            view.month === TRAINING_MONTH.month &&
            day === TRAINING_MONTH.raceDay;
          const isFuture =
            view.year > TRAINING_MONTH.year ||
            (view.year === TRAINING_MONTH.year && view.month > TRAINING_MONTH.month) ||
            (view.year === TRAINING_MONTH.year &&
              view.month === TRAINING_MONTH.month &&
              day > TRAINING_MONTH.today);
          const done = Boolean(log?.done);
          const planned = Boolean(log?.planned) || (isFuture && log?.actual && log?.type);

          return (
            <button
              key={day}
              type="button"
              onClick={() =>
                onSelect({ year: view.year, month: view.month, day })
              }
              className={`flex min-h-20 flex-col rounded-lg px-1.5 py-1.5 text-left ${
                isRace
                  ? "bg-lime-400 text-zinc-950"
                  : planned
                    ? "border-2 border-dashed border-lime-400 bg-lime-400/10 text-lime-200"
                    : isFuture
                      ? "text-zinc-600"
                      : done
                        ? "bg-lime-400/15 text-lime-300"
                        : "bg-white/5 text-zinc-400"
              } ${isSelected && !isRace && !planned ? "ring-1 ring-lime-400" : ""}`}
            >
              <span className="text-xs font-semibold">{day}</span>
              {isRace || ((done || planned) && log?.type) ? (
                <>
                  <span className="mt-1 text-sm font-semibold leading-tight">
                    {log.type}
                  </span>
                  <span className="text-sm leading-tight">{formatKm(log.km)}</span>
                </>
              ) : null}
            </button>
          );
        })}
      </div>
    </article>
  );
}
