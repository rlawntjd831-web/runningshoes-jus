"use client";

import { useState } from "react";
import Link from "next/link";
import { getSimpleQuizQuestions, getSimpleQuizTotal, recommendShoes, recommendShoeType } from "@/lib/quiz";
import QuestionFlow from "@/components/QuestionFlow";
import ShoeResult from "@/components/ShoeResult";

export default function QuizApp() {
  const [step, setStep] = useState("landing");
  const [answers, setAnswers] = useState([]);

  if (step === "landing") {
    return (
      <main className="flex min-h-full flex-1 flex-col items-center justify-center px-6 py-16">
        <div className="text-center text-3xl font-extrabold leading-snug tracking-tight text-white sm:text-4xl">
          <p>쿠션화? 안정화? 슈퍼트레이닝화는 또 뭐야?</p>
          <p className="mt-3 whitespace-nowrap">
            도대체 어떤 러닝화를 신어야 하는거야???
          </p>
        </div>
        <button
          type="button"
          onClick={() => setStep("quiz")}
          className="mt-12 rounded-full bg-lime-400 px-8 py-4 text-base font-bold text-zinc-950 transition hover:bg-lime-300"
        >
          나에게 맞는 러닝화 찾으러 가기!
        </button>
      </main>
    );
  }

  if (step === "quiz") {
    return (
      <QuestionFlow
        getQuestions={getSimpleQuizQuestions}
        getTotal={getSimpleQuizTotal}
        onComplete={(nextAnswers) => {
          setAnswers(nextAnswers);
          setStep("result");
        }}
        onBackFromFirst={() => setStep("landing")}
      />
    );
  }

  return (
    <ShoeResult
      eyebrow="추천 결과"
      title={`당신에게는 ${recommendShoeType(answers)}가 어울려요!`}
      shoes={recommendShoes(answers)}
      action={
        <Link
          href="/login"
          className="rounded-full bg-lime-400 px-8 py-4 text-center text-base font-bold text-zinc-950 transition hover:bg-lime-300"
        >
          더 정확한 신발 추천이 궁금하다면?
        </Link>
      }
    />
  );
}
