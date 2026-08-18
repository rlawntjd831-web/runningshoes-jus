import { pickClosetShoe } from "@/lib/today";

export const TRAINING_MONTH = {
  year: 2026,
  month: 8,
  today: 19,
  raceDay: 31,
  raceName: "가상 마라톤",
};

export const AUGUST_2026_LOGS = {
  1: {
    type: "LSD",
    title: "LSD 18km",
    done: true,
    km: 18,
    kind: "long",
    weatherLabel: "맑음 27°",
    weatherNote: "더웠지만 바람은 적당해서 장거리에 무난했습니다.",
    trainingNote: "편안한 호흡으로 지구력을 쌓는 날.",
  },
  2: {
    done: false,
    kind: "rest",
    weatherLabel: "구름 24°",
    weatherNote: "습도가 조금 높아 쉬어가기 좋은 날이었습니다.",
    trainingNote: "휴식일로 다리를 회복했습니다.",
  },
  3: {
    type: "인터벌",
    title: "인터벌 400m×8",
    done: true,
    km: 3.2,
    kind: "speed",
    weatherLabel: "맑음 28°",
    weatherNote: "햇살이 강해 트랙이 뜨거웠습니다.",
    trainingNote: "짧은 반복으로 스피드를 끌어올린 날.",
  },
  4: {
    done: false,
    kind: "rest",
    weatherLabel: "비 21°",
    weatherNote: "오전에 비가 와서 억지로 나가지 않았습니다.",
    trainingNote: "비 오는 휴식일.",
  },
  5: {
    type: "이지런",
    title: "이지런 8km",
    done: true,
    km: 8,
    kind: "easy",
    weatherLabel: "흐림 22°",
    weatherNote: "구름이 가려줘 달리기 편한 기온이었습니다.",
    trainingNote: "대화가 가능한 페이스로 몸을 풀었습니다.",
  },
  6: {
    done: false,
    kind: "rest",
    weatherLabel: "맑음 26°",
    weatherNote: "화창했지만 회복을 우선했습니다.",
    trainingNote: "휴식일.",
  },
  7: {
    type: "힐 스프린트",
    title: "힐 스프린트 10회",
    done: true,
    km: 2,
    kind: "speed",
    weatherLabel: "맑음 29°",
    weatherNote: "오후에 기온이 올라 짧게 끝냈습니다.",
    trainingNote: "언덕에서 파워를 만드는 짧은 스프린트.",
  },
  8: {
    type: "템포런",
    title: "템포런 7km",
    done: true,
    km: 7,
    kind: "speed",
    weatherLabel: "구름 25°",
    weatherNote: "구름 덕분에 템포 페이스를 유지하기 좋았습니다.",
    trainingNote: "대회 페이스에 가까운 지속 달리기.",
  },
  9: {
    done: false,
    kind: "rest",
    weatherLabel: "소나기 23°",
    weatherNote: "오후 소나기가 있어 쉽니다.",
    trainingNote: "휴식일.",
  },
  10: {
    done: false,
    kind: "rest",
    weatherLabel: "흐림 20°",
    weatherNote: "선선해서 나가고 싶었지만 회복 주간이었습니다.",
    trainingNote: "휴식일.",
  },
  11: {
    type: "파틀렉",
    title: "파틀렉 10km",
    done: true,
    km: 10,
    kind: "speed",
    weatherLabel: "맑음 26°",
    weatherNote: "바람은 약하고 시야가 맑았습니다.",
    trainingNote: "구간마다 페이스를 바꿔가며 놀듯이 달렸습니다.",
  },
  12: {
    done: false,
    kind: "rest",
    weatherLabel: "맑음 27°",
    weatherNote: "더운 한낮이라 쉬어갔습니다.",
    trainingNote: "휴식일.",
  },
  13: {
    type: "트랙",
    title: "트랙 200m×10",
    done: true,
    km: 2,
    kind: "speed",
    weatherLabel: "맑음 28°",
    weatherNote: "트랙 표면이 따뜻해 짧게 끊었습니다.",
    trainingNote: "회전 스피드 위주의 트랙 세션.",
  },
  14: {
    done: false,
    kind: "rest",
    weatherLabel: "흐림 22°",
    weatherNote: "흐리고 습해서 억지로 쌓지 않았습니다.",
    trainingNote: "휴식일.",
  },
  15: {
    type: "빌드업",
    title: "빌드업 12km",
    done: true,
    km: 12,
    kind: "long",
    weatherLabel: "구름 24°",
    weatherNote: "후반으로 갈수록 바람이 시원했습니다.",
    trainingNote: "점점 페이스를 올려 지구력과 속도를 같이 가져간 날.",
  },
  16: {
    done: false,
    kind: "rest",
    weatherLabel: "비 19°",
    weatherNote: "하루 종일 비가 내려 쉽니다.",
    trainingNote: "휴식일.",
  },
  17: {
    type: "회복조깅",
    title: "회복조깅 5km",
    done: true,
    km: 5,
    kind: "easy",
    weatherLabel: "흐림 18°",
    weatherNote: "선선해서 아주 천천히 돌기 좋았습니다.",
    trainingNote: "다리만 풀어주는 짧은 조깅.",
  },
  18: {
    done: false,
    kind: "rest",
    weatherLabel: "맑음 23°",
    weatherNote: "가을 같은 맑은 날이었지만 하루 쉽니다.",
    trainingNote: "휴식일.",
  },
  19: {
    type: "이지런",
    title: "이지런 8km",
    done: true,
    km: 8,
    kind: "easy",
    weatherLabel: "흐림 18°",
    weatherNote: "비는 없고 선선해서 러닝하기 좋은 날입니다.",
    trainingNote: "대화가 가능한 페이스로 몸을 풀어보세요.",
  },
  31: {
    type: "마라톤",
    title: "가상 마라톤",
    race: true,
    done: false,
    km: 42.2,
    kind: "race",
    weatherLabel: "맑음 26°",
    weatherNote: "대회 당일 예보. 구름 조금, 바람은 약합니다.",
    trainingNote: "가상 마라톤 데이. 레이싱화 준비.",
  },
};

export function isFutureDate(year, month, day) {
  return (
    year > TRAINING_MONTH.year ||
    (year === TRAINING_MONTH.year && month > TRAINING_MONTH.month) ||
    (year === TRAINING_MONTH.year && month === TRAINING_MONTH.month && day > TRAINING_MONTH.today)
  );
}

export function formatKm(km) {
  if (km == null) return "";
  return `${km}km`;
}

export function getDayRecord(year, month, day, actualLogs = {}) {
  const logs = getLogsForMonth(year, month, actualLogs);
  const log = logs[day];
  const isFuture = isFutureDate(year, month, day);

  if (isFuture && log?.actual && !log.rest && (log.type || log.km)) {
    return {
      kind: log.kind ?? "easy",
      weatherLabel: log.weatherLabel ?? "예보 없음",
      weatherNote: log.weatherNote ?? "아직 오지 않은 날의 계획입니다.",
      trainingType: log.type,
      trainingDistance: formatKm(log.km),
      isActual: true,
      isPlanned: true,
      trainingNote: "미리 세워 둔 계획입니다.",
    };
  }

  if (isFuture && log?.actual && log.rest) {
    return {
      kind: "rest",
      weatherLabel: log.weatherLabel ?? "예보 없음",
      weatherNote: log.weatherNote ?? "아직 오지 않은 날의 계획입니다.",
      trainingType: "휴식일",
      trainingDistance: "",
      isActual: true,
      isPlanned: true,
      trainingNote: "미리 세워 둔 휴식 계획입니다.",
    };
  }

  if (isFuture && !log?.race) {
    return {
      kind: "future",
      weatherLabel: "기록 없음",
      weatherNote: "아직 오지 않은 날입니다.",
      trainingType: "예정 없음",
      trainingDistance: "",
      trainingNote: "이 날짜의 훈련은 아직 없습니다.",
    };
  }

  if (!log) {
    return {
      kind: "rest",
      weatherLabel: "기록 없음",
      weatherNote: "이 날의 날씨 기록이 없습니다.",
      trainingType: "휴식일",
      trainingDistance: "",
      trainingNote: "훈련 기록이 없습니다.",
    };
  }

  if (log.done || log.race) {
    return {
      kind: log.kind ?? "easy",
      weatherLabel: log.weatherLabel ?? "기록 없음",
      weatherNote: log.weatherNote ?? "",
      trainingType: log.type ?? log.title,
      trainingDistance: formatKm(log.km),
      isActual: Boolean(log.actual),
      trainingNote: log.actual
        ? "직접 기록한 훈련입니다."
        : (log.trainingNote ?? ""),
    };
  }

  return {
    kind: log.kind ?? "rest",
    weatherLabel: log.weatherLabel ?? "기록 없음",
    weatherNote: log.weatherNote ?? "",
    trainingType: "휴식일",
    trainingDistance: "",
    trainingNote: log.actual ? "직접 기록한 휴식입니다." : (log.trainingNote ?? ""),
    isActual: Boolean(log.actual),
  };
}

export function getRaceDDay(from = TRAINING_MONTH) {
  const today = new Date(from.year, from.month - 1, from.today);
  const race = new Date(TRAINING_MONTH.year, TRAINING_MONTH.month - 1, TRAINING_MONTH.raceDay);
  return Math.round((race - today) / (1000 * 60 * 60 * 24));
}

export function dateKey(year, month, day) {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export const TRAINING_TYPES = [
  "이지런",
  "회복조깅",
  "LSD",
  "빌드업",
  "템포런",
  "파틀렉",
  "인터벌",
  "힐 스프린트",
  "트랙",
  "마라톤",
];

export function kindFromType(type) {
  if (type === "마라톤") return "race";
  if (["LSD", "빌드업"].includes(type)) return "long";
  if (["인터벌", "템포런", "힐 스프린트", "파틀렉", "트랙"].includes(type)) {
    return "speed";
  }
  return "easy";
}

export function getLogsForMonth(year, month, actualLogs = {}) {
  const logs =
    year === 2026 && month === 8 ? { ...AUGUST_2026_LOGS } : {};

  for (const [key, actual] of Object.entries(actualLogs)) {
    const [y, m, d] = key.split("-").map(Number);
    if (y !== year || m !== month) continue;

    if (actual.rest) {
      logs[d] = {
        ...(logs[d] ?? {}),
        done: false,
        rest: true,
        actual: true,
        planned: isFutureDate(year, month, d),
        kind: "rest",
        type: undefined,
        km: 0,
      };
      continue;
    }

    const planned = isFutureDate(year, month, d);
    logs[d] = {
      ...(logs[d] ?? {}),
      done: !planned,
      rest: false,
      actual: true,
      planned,
      type: actual.type,
      km: Number(actual.km),
      kind: actual.kind ?? kindFromType(actual.type),
    };
  }

  return logs;
}

export function shiftMonth(year, month, delta) {
  const date = new Date(year, month - 1 + delta, 1);
  return { year: date.getFullYear(), month: date.getMonth() + 1 };
}

export function getMonthMileage(logs) {
  const total = Object.values(logs).reduce(
    (sum, log) => sum + (log.done ? log.km ?? 0 : 0),
    0,
  );
  return Math.round(total * 10) / 10;
}

export const SHOE_MILEAGE_LIMIT = 300;

function roundKm(km) {
  return Math.round(km * 10) / 10;
}

export function getCompletedSessions(actualLogs = {}) {
  const sessions = [];
  const overridden = new Set();

  for (const key of Object.keys(actualLogs)) {
    overridden.add(key);
    const [year, month, day] = key.split("-").map(Number);
    if (isFutureDate(year, month, day)) continue;

    const actual = actualLogs[key];
    if (actual?.rest) continue;

    const km = Number(actual?.km);
    if (!km) continue;

    sessions.push({
      kind: actual.kind ?? kindFromType(actual.type),
      km,
    });
  }

  if (TRAINING_MONTH.year === 2026 && TRAINING_MONTH.month === 8) {
    for (const [day, log] of Object.entries(AUGUST_2026_LOGS)) {
      const key = dateKey(2026, 8, Number(day));
      if (overridden.has(key)) continue;
      if (isFutureDate(2026, 8, Number(day))) continue;
      if (!log.done || !log.km) continue;

      sessions.push({
        kind: log.kind ?? kindFromType(log.type),
        km: log.km,
      });
    }
  }

  return sessions;
}

export function getShoeMileageMap(closet, actualLogs = {}) {
  const totals = Object.fromEntries((closet ?? []).map((shoe) => [shoe.id, 0]));
  if (!closet?.length) return totals;

  for (const session of getCompletedSessions(actualLogs)) {
    const shoe = pickClosetShoe(closet, session.kind);
    if (!shoe || totals[shoe.id] == null) continue;
    totals[shoe.id] += session.km;
  }

  for (const id of Object.keys(totals)) {
    totals[id] = roundKm(totals[id]);
  }

  return totals;
}

export function formatShoeMileage(km) {
  return `${km} / ${SHOE_MILEAGE_LIMIT}`;
}

export function getMonthGrid(year, month) {
  const firstWeekday = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const cells = Array.from({ length: firstWeekday }, () => null);

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(day);
  }

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  return cells;
}
