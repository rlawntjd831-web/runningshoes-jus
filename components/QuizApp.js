"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSimpleQuizQuestions, getSimpleQuizTotal, recommendShoes } from "@/lib/quiz";
import QuestionFlow from "@/components/QuestionFlow";
import ShoeResult from "@/components/ShoeResult";

export default function QuizApp() {
  const router = useRouter();
  const [step, setStep] = useState("quiz");
  const [answers, setAnswers] = useState([]);

  if (step === "quiz") {
    return (
      <QuestionFlow
        getQuestions={getSimpleQuizQuestions}
        getTotal={getSimpleQuizTotal}
        onComplete={(nextAnswers) => {
          setAnswers(nextAnswers);
          setStep("result");
        }}
        onBackFromFirst={() => router.push("/")}
      />
    );
  }

  return (
    <ShoeResult
      eyebrow="추천 결과"
      title="당신에게는 안정화가 어울려요!"
      shoes={recommendShoes(answers)}
      action={
        <div className="flex flex-col items-center gap-4">
          <Link
            href="/login?next=/detail"
            className="rounded-full bg-lime-400 px-8 py-4 text-center text-base font-bold text-zinc-950 transition hover:bg-lime-300"
          >
            로그인하고 더 정확한 추천 받기
          </Link>
          <Link
            href="/"
            className="rounded-full bg-lime-400 px-8 py-4 text-center text-base font-bold text-zinc-950 transition hover:bg-lime-300"
          >
            홈으로 가기
          </Link>
        </div>
      }
    />
  );
}
