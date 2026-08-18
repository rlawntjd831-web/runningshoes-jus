import { getWeatherForDate } from "@/lib/kma";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const { searchParams } = request.nextUrl;
  const year = Number(searchParams.get("year"));
  const month = Number(searchParams.get("month"));
  const day = Number(searchParams.get("day"));

  if (![year, month, day].every(Number.isInteger)) {
    return Response.json({ ok: false, code: "error" }, { status: 400 });
  }

  try {
    const weather = await getWeatherForDate(year, month, day);
    return Response.json(weather);
  } catch {
    return Response.json({ ok: false, code: "error" }, { status: 502 });
  }
}
