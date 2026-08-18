export const WEATHER_LOCATION = {
  name: "서울 강남구",
  nx: 61,
  ny: 126,
};

const SKY_LABEL = {
  1: "맑음",
  3: "구름많음",
  4: "흐림",
};

const PTY_LABEL = {
  1: "비",
  2: "비/눈",
  3: "눈",
  4: "소나기",
  5: "빗방울",
  6: "빗방울눈날림",
  7: "눈날림",
};

export function getKstParts(date = new Date()) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Seoul",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(date)
      .map((part) => [part.type, part.value]),
  );

  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    hour: Number(parts.hour),
    minute: Number(parts.minute),
  };
}

export function ymd(parts) {
  return `${parts.year}${String(parts.month).padStart(2, "0")}${String(parts.day).padStart(2, "0")}`;
}

export function compareYmd(a, b) {
  return ymd(a).localeCompare(ymd(b));
}

export function skyLabel(code) {
  return SKY_LABEL[Number(code)] ?? "예보";
}

export function isRainy(pty) {
  return Number(pty) > 0;
}

export function formatWeatherLabel({ sky, pty, temp }) {
  const condition = Number(pty) > 0 ? ptyLabel(pty) : skyLabel(sky);
  if (temp == null || temp === "") return condition;
  return `${condition} ${temp}°`;
}

export function formatWeatherNote({ sky, pty, temp, pop, wind }) {
  if (Number(pty) > 0) {
    return "비나 눈이 있으니 미끄럼과 체온 관리에 신경 쓰세요.";
  }
  if (Number(pop) >= 60) {
    return "강수 확률이 높습니다. 방수 대비를 해 두세요.";
  }
  const t = Number(temp);
  if (!Number.isNaN(t) && t >= 28) {
    return "더운 날씨입니다. 수분 섭취와 페이스 조절이 필요합니다.";
  }
  if (!Number.isNaN(t) && t <= 5) {
    return "기온이 낮습니다. 워밍업을 충분히 하세요.";
  }
  if (Number(wind) >= 9) {
    return "바람이 강합니다. 체감온도가 더 낮을 수 있습니다.";
  }
  if (skyLabel(sky) === "맑음") {
    return "러닝하기 좋은 날씨입니다.";
  }
  return "무난한 날씨입니다. 컨디션에 맞춰 달리면 됩니다.";
}
