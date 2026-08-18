"use client";

import { useState } from "react";

export default function QuestionFlow({
  questions,
  getQuestions,
  getTotal,
  totalCount,
  onComplete,
  onBackFromFirst,
}) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [draft, setDraft] = useState([]);

  const resolvedQuestions = getQuestions ? getQuestions(answers) : questions;
  const question = resolvedQuestions[questionIndex];
  const total = getTotal?.(answers) ?? totalCount ?? resolvedQuestions.length;
  const progress = ((questionIndex + 1) / total) * 100;
  const isMultiple = Boolean(question.multiple);

  function goToNext(nextAnswers) {
    if (questionIndex + 1 < (getQuestions ? getQuestions(nextAnswers) : questions).length) {
      setQuestionIndex(questionIndex + 1);
      setDraft([]);
      return;
    }

    onComplete(nextAnswers);
  }

  function selectOption(optionId) {
    if (isMultiple) {
      toggleMultiple(optionId);
      return;
    }

    const nextAnswers = [...answers, optionId];
    setAnswers(nextAnswers);
    goToNext(nextAnswers);
  }

  function toggleMultiple(optionId) {
    const exclusiveId = question.exclusiveOptionId;

    setDraft((current) => {
      if (exclusiveId && optionId === exclusiveId) {
        return current.includes(optionId) ? [] : [optionId];
      }

      const withoutExclusive = exclusiveId
        ? current.filter((id) => id !== exclusiveId)
        : current;

      if (withoutExclusive.includes(optionId)) {
        return withoutExclusive.filter((id) => id !== optionId);
      }

      return [...withoutExclusive, optionId];
    });
  }

  function confirmMultiple() {
    const nextAnswers = [...answers, draft];
    setAnswers(nextAnswers);
    goToNext(nextAnswers);
  }

  function goBack() {
    if (questionIndex === 0) {
      onBackFromFirst();
      return;
    }

    setAnswers(answers.slice(0, -1));
    setQuestionIndex(questionIndex - 1);
    setDraft([]);
  }

  return (
    <main className="mx-auto flex min-h-full w-full max-w-xl flex-1 flex-col justify-center px-6 py-16">
      <p className="text-sm font-medium text-zinc-400">
        {question.stepLabel ?? `${questionIndex + 1} / ${total}`}
      </p>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-lime-400 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      <h1 className="mt-8 text-2xl font-bold leading-snug text-white sm:text-3xl">
        {question.text}
      </h1>
      <div className="mt-8 flex flex-col gap-3">
        {question.options.map((option) => {
          const selected = isMultiple && draft.includes(option.id);

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => selectOption(option.id)}
              className={`rounded-2xl border px-5 py-4 text-left text-lg font-medium transition ${
                selected
                  ? "border-lime-400 bg-lime-400/10 text-white"
                  : "border-white/10 bg-white/5 text-white hover:border-lime-400 hover:bg-white/10"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
      {isMultiple ? (
        <button
          type="button"
          onClick={confirmMultiple}
          disabled={draft.length === 0}
          className="mt-8 rounded-full bg-lime-400 px-8 py-4 text-base font-bold text-zinc-950 transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:bg-zinc-600 disabled:text-zinc-300"
        >
          다음
        </button>
      ) : null}
      <button
        type="button"
        onClick={goBack}
        className="mt-8 self-start text-sm text-zinc-400 transition hover:text-white"
      >
        이전
      </button>
    </main>
  );
}
