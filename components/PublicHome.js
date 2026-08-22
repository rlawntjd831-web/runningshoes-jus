import Image from "next/image";
import Link from "next/link";
import { HOME_RACES, HOME_SHOES, HOME_TIPS } from "@/lib/homeFeed";

export default function PublicHome() {
  return (
    <main className="mx-auto flex min-h-full w-full max-w-5xl flex-1 flex-col px-6 py-10">
      <header className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-zinc-400">홈</p>
          <h1 className="mt-1 text-3xl font-extrabold text-zinc-950">러닝 정보를 한곳에</h1>
        </div>
        <nav className="flex flex-wrap items-center justify-end gap-3">
          <Link
            href="/quiz"
            className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:border-lime-400 hover:text-lime-400"
          >
            설문하기
          </Link>
          <Link
            href="/mypage"
            className="rounded-full bg-lime-400 px-4 py-2 text-sm font-bold text-zinc-950 transition hover:bg-lime-300"
          >
            마이페이지
          </Link>
        </nav>
      </header>

      <section className="mt-10">
        <h2 className="text-xl font-extrabold text-lime-400">여러 신발들</h2>
        <p className="mt-2 text-sm text-zinc-400">
          안정화, 쿠션화, 슈퍼 트레이너, 레이싱화를 한눈에 볼 수 있습니다.
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {HOME_SHOES.map((shoe) => (
            <li
              key={shoe.id}
              className="rounded-2xl border border-zinc-200 bg-zinc-100 p-5"
            >
              <div className="relative mx-auto h-28 w-full">
                <Image
                  src={shoe.image}
                  alt={shoe.name}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 50vw, 240px"
                  className="object-contain"
                />
              </div>
              <p className="mt-4 text-xs font-medium text-lime-400">{shoe.kind}</p>
              <h3 className="mt-1 text-lg font-bold text-zinc-950">{shoe.name}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-400">{shoe.summary}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-extrabold text-lime-400">대회 일정</h2>
        <p className="mt-2 text-sm text-zinc-400">2026년 국내 주요 마라톤입니다.</p>
        <ul className="mt-6 divide-y divide-zinc-200 rounded-2xl border border-zinc-200 bg-zinc-100">
          {HOME_RACES.map((race) => (
            <li
              key={`${race.date}-${race.name}`}
              className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold text-zinc-950">{race.name}</p>
                <p className="mt-1 text-sm text-zinc-400">
                  {race.place} · {race.distance}
                </p>
              </div>
              <p className="text-sm font-medium text-lime-400">{race.date}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 pb-8">
        <h2 className="text-xl font-extrabold text-lime-400">러닝 훈련 꿀팁</h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {HOME_TIPS.map((tip) => (
            <li
              key={tip.title}
              className="rounded-2xl border border-zinc-200 bg-zinc-100 p-5"
            >
              <h3 className="font-bold text-zinc-950">{tip.title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-400">{tip.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
