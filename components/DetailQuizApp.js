"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  DETAIL_QUIZ_LENGTH,
  getDetailQuizQuestions,
  getRunnerLevel,
  recommendDetailShoes,
} from "@/lib/quiz";
import { buildSurveyResults, saveSurveySession } from "@/lib/profile";
import QuestionFlow from "@/components/QuestionFlow";
import ShoeResult from "@/components/ShoeResult";

export default function DetailQuizApp() {
  const router = useRouter();
  const [answers, setAnswers] = useState(null);

  function goHome(selectedShoe = null) {
    const shoes = recommendDetailShoes(answers);
    saveSurveySession({
      survey: buildSurveyResults(getDetailQuizQuestions(answers), answers),
      shoes,
      selectedShoe,
    });
    router.push("/mypage");
  }

  if (!answers) {
    return (
      <QuestionFlow
        getQuestions={getDetailQuizQuestions}
        totalCount={DETAIL_QUIZ_LENGTH}
        onComplete={setAnswers}
        onBackFromFirst={() => router.push("/login")}
      />
    );
  }

  const level = getRunnerLevel(answers);

  return (
    <ShoeResult
      eyebrow="상세 추천 결과"
      title={`당신은 ${level} 이시군요!`}
      subtitle="당신에게 딱 맞는 신발을 추천해 드릴게요!"
      shoes={recommendDetailShoes(answers)}
      onGoHome={(shoe) => goHome(shoe)}
      action={
        <button
          type="button"
          onClick={() => goHome()}
          className="rounded-full bg-lime-400 px-8 py-4 text-base font-bold text-zinc-950 transition hover:bg-lime-300"
        >
          마이페이지로
        </button>
      }
    />
  );
}
