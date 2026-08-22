"use client";

import { useState } from "react";
import Image from "next/image";

function ShoeImage({ src, alt, className }) {
  if (!src) return null;

  return (
    <div className={`relative w-full ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized
        sizes="(max-width: 768px) 40vw, 220px"
        className="object-contain"
      />
    </div>
  );
}

export default function ShoeResult({
  eyebrow,
  title,
  subtitle,
  shoes,
  action,
  onGoHome,
}) {
  const [selectedShoe, setSelectedShoe] = useState(null);
  const canOpenDetail = Boolean(onGoHome);

  return (
    <main className="mx-auto flex min-h-full w-full max-w-4xl flex-1 flex-col items-center justify-center px-6 py-16">
      <p className="text-sm font-medium text-lime-400">{eyebrow}</p>
      <h1 className="mt-3 text-center text-3xl font-extrabold text-zinc-950">
        {title}
      </h1>
      {subtitle ? (
        <p className="mt-3 text-center text-lg font-medium text-zinc-600">
          {subtitle}
        </p>
      ) : null}
      <ul className="mt-10 grid w-full max-w-3xl grid-cols-3 gap-8">
        {shoes.map((shoe) => {
          const content = (
            <>
              <ShoeImage src={shoe.image} alt={shoe.name} className="mb-4 h-28" />
              <p className="text-lg font-semibold text-zinc-950">{shoe.name}</p>
              {shoe.keywords?.length ? (
                <ul className="mt-3 flex flex-col items-center gap-3">
                  {shoe.keywords.map((keyword) => (
                    <li
                      key={keyword}
                      className="rounded-full border border-lime-400/30 bg-lime-400/10 px-3 py-1 text-sm font-medium text-lime-300"
                    >
                      {keyword}
                    </li>
                  ))}
                </ul>
              ) : null}
            </>
          );

          return (
            <li key={shoe.id}>
              {canOpenDetail ? (
                <button
                  type="button"
                  onClick={() => setSelectedShoe(shoe)}
                  className="flex min-h-36 w-full flex-col items-center rounded-2xl border border-lime-400 bg-zinc-100 px-3 py-5 text-center transition hover:bg-zinc-50"
                >
                  {content}
                </button>
              ) : (
                <div className="flex min-h-36 flex-col items-center rounded-2xl border border-lime-400 bg-zinc-100 px-3 py-5 text-center">
                  {content}
                </div>
              )}
            </li>
          );
        })}
      </ul>
      {action ? <div className="mt-12">{action}</div> : null}

      {selectedShoe ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="relative w-full max-w-lg rounded-3xl border border-zinc-200 bg-white p-8 shadow-lg">
            <button
              type="button"
              onClick={() => setSelectedShoe(null)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-xl text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-950"
              aria-label="닫기"
            >
              ×
            </button>
            <ShoeImage
              src={selectedShoe.image}
              alt={selectedShoe.name}
              className="mx-auto mb-4 h-40"
            />
            <h2 className="pr-10 text-2xl font-extrabold text-zinc-950">
              {selectedShoe.name}
            </h2>
            {selectedShoe.keywords?.length ? (
              <ul className="mt-5 flex flex-col items-center gap-2">
                {selectedShoe.keywords.map((keyword) => (
                  <li
                    key={keyword}
                    className="rounded-full border border-lime-400/30 bg-lime-400/10 px-3 py-1 text-sm font-medium text-lime-300"
                  >
                    {keyword}
                  </li>
                ))}
              </ul>
            ) : null}
            <p className="mt-6 text-base leading-7 text-zinc-600">
              {selectedShoe.description}
            </p>
            <button
              type="button"
              onClick={() => onGoHome(selectedShoe)}
              className="mt-8 w-full rounded-full bg-lime-400 px-8 py-4 text-base font-bold text-zinc-950 transition hover:bg-lime-300"
            >
              마이페이지로
            </button>
          </div>
        </div>
      ) : null}
    </main>
  );
}
