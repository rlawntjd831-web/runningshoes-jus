import {
  WEATHER_LOCATION,
  compareYmd,
  formatWeatherLabel,
  formatWeatherNote,
  getKstParts,
  ymd,
} from "@/lib/weather";

const BASE_URL = "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0";

function pad2(value) {
  return String(value).padStart(2, "0");
}

function asItems(payload) {
  const raw = payload?.response?.body?.items?.item;
  if (!raw) return [];
  return Array.isArray(raw) ? raw : [raw];
}

function resultCode(payload) {
  return String(payload?.response?.header?.resultCode ?? "");
}

async function fetchKma(path, params) {
  const serviceKey = process.env.KMA_SERVICE_KEY;
  if (!serviceKey) {
    throw new Error("missing-key");
  }

  const url = new URL(`${BASE_URL}/${path}`);
  url.searchParams.set("serviceKey", serviceKey);
  url.searchParams.set("pageNo", "1");
  url.searchParams.set("numOfRows", params.numOfRows ?? "1000");
  url.searchParams.set("dataType", "JSON");
  url.searchParams.set("base_date", params.base_date);
  url.searchParams.set("base_time", params.base_time);
  url.searchParams.set("nx", String(WEATHER_LOCATION.nx));
  url.searchParams.set("ny", String(WEATHER_LOCATION.ny));

  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error("http");
  }

  const payload = await response.json();
  const code = resultCode(payload);
  if (code !== "00" && code !== "0") {
    const error = new Error(payload?.response?.header?.resultMsg ?? "kma");
    error.code = code;
    throw error;
  }

  return asItems(payload);
}

function kstDate(parts) {
  return new Date(
    `${parts.year}-${pad2(parts.month)}-${pad2(parts.day)}T${pad2(parts.hour)}:${pad2(parts.minute)}:00+09:00`,
  );
}

function shiftHour(parts, delta) {
  const date = kstDate(parts);
  date.setTime(date.getTime() + delta * 60 * 60 * 1000);
  return getKstParts(date);
}

export function ncstBase(now = new Date()) {
  let parts = getKstParts(now);
  if (parts.minute < 10) {
    parts = shiftHour(parts, -1);
  }
  return {
    base_date: ymd(parts),
    base_time: `${pad2(parts.hour)}00`,
  };
}

export function ultraFcstBase(now = new Date()) {
  let parts = getKstParts(now);
  if (parts.minute < 45) {
    parts = shiftHour(parts, -1);
  }
  return {
    base_date: ymd(parts),
    base_time: `${pad2(parts.hour)}30`,
  };
}

const VILAGE_HOURS = [2, 5, 8, 11, 14, 17, 20, 23];

export function vilageBase(now = new Date()) {
  const parts = getKstParts(now);
  const minutes = parts.hour * 60 + parts.minute;
  let chosen = null;

  for (const hour of VILAGE_HOURS) {
    const available = hour * 60 + 10;
    if (minutes >= available) {
      chosen = hour;
    }
  }

  if (chosen == null) {
    const yesterday = shiftHour({ ...parts, hour: 0, minute: 0 }, -1);
    return { base_date: ymd(yesterday), base_time: "2300" };
  }

  return {
    base_date: ymd(parts),
    base_time: `${pad2(chosen)}00`,
  };
}

function pickCategory(items, category, extra = () => true) {
  return items.find((item) => item.category === category && extra(item));
}

export async function getWeatherForDate(year, month, day, now = new Date()) {
  const today = getKstParts(now);
  const target = { year, month, day, hour: 0, minute: 0 };
  const diff = compareYmd(target, today);

  if (diff < 0) {
    return { ok: false, code: "past", location: WEATHER_LOCATION.name };
  }

  if (diff === 0) {
    const [ncst, ultra] = await Promise.all([
      fetchKma("getUltraSrtNcst", { ...ncstBase(now), numOfRows: "20" }),
      fetchKma("getUltraSrtFcst", { ...ultraFcstBase(now), numOfRows: "100" }),
    ]);

    const temp = pickCategory(ncst, "T1H")?.obsrValue;
    const pty = pickCategory(ncst, "PTY")?.obsrValue;
    const wind = pickCategory(ncst, "WSD")?.obsrValue;
    const sky =
      pickCategory(ultra, "SKY", (item) => item.fcstDate === ymd(today))?.fcstValue ?? "1";

    return {
      ok: true,
      location: WEATHER_LOCATION.name,
      source: "초단기실황",
      label: formatWeatherLabel({ sky, pty, temp }),
      note: formatWeatherNote({ sky, pty, temp, wind }),
      pty,
      sky,
      temp,
      rainy: Number(pty) > 0,
    };
  }

  const maxDate = shiftHour({ ...today, hour: 12, minute: 0 }, 24 * 4);
  if (compareYmd(target, getKstParts(maxDate)) > 0) {
    return { ok: false, code: "range", location: WEATHER_LOCATION.name };
  }

  const items = await fetchKma("getVilageFcst", { ...vilageBase(now), numOfRows: "1000" });
  const dayKey = ymd(target);
  const dayItems = items.filter((item) => item.fcstDate === dayKey);

  if (!dayItems.length) {
    return { ok: false, code: "range", location: WEATHER_LOCATION.name };
  }

  const noon = dayItems.find((item) => item.fcstTime === "1200") ?? dayItems[0];
  const sky = pickCategory(dayItems, "SKY", (item) => item.fcstTime === noon.fcstTime)?.fcstValue;
  const temp =
    pickCategory(dayItems, "TMP", (item) => item.fcstTime === noon.fcstTime)?.fcstValue ??
    pickCategory(dayItems, "TMX")?.fcstValue;
  const pty = pickCategory(dayItems, "PTY", (item) => item.fcstTime === noon.fcstTime)?.fcstValue;
  const pop = pickCategory(dayItems, "POP", (item) => item.fcstTime === noon.fcstTime)?.fcstValue;
  const wind = pickCategory(dayItems, "WSD", (item) => item.fcstTime === noon.fcstTime)?.fcstValue;

  return {
    ok: true,
    location: WEATHER_LOCATION.name,
    source: "단기예보",
    label: formatWeatherLabel({ sky, pty, temp }),
    note: formatWeatherNote({ sky, pty, temp, pop, wind }),
    pty,
    sky,
    temp,
    rainy: Number(pty) > 0,
  };
}
