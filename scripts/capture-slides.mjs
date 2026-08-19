import { chromium } from "playwright";
import { mkdir } from "fs/promises";
import path from "path";

const OUT = path.resolve("slides");
const BASE = "http://localhost:3000";

async function clickLabel(page, name) {
  await page.getByRole("button", { name, exact: true }).click();
}

async function shot(page, file) {
  await page.addStyleTag({
    content: "nextjs-portal, [data-next-badge-root] { display: none !important; }",
  });
  await page.waitForTimeout(300);
  await page.screenshot({
    path: path.join(OUT, file),
    type: "png",
  });
}

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 1,
});

await mkdir(OUT, { recursive: true });

await page.goto(BASE, { waitUntil: "networkidle" });
await page.getByRole("button", { name: "나에게 맞는 러닝화 찾으러 가기!" }).waitFor();
await shot(page, "00-landing.png");

await page.getByRole("button", { name: "나에게 맞는 러닝화 찾으러 가기!" }).click();
await page.getByRole("heading", { name: "러닝을 해보신 적이 있으신가요?" }).waitFor();
await shot(page, "01-simple-quiz.png");

await clickLabel(page, "아니오");
await clickLabel(page, "10만원 이하");
await clickLabel(page, "다음");
await clickLabel(page, "무릎");
await clickLabel(page, "다음");
await page.getByText("당신에게는 안정화가 어울려요!").waitFor();
await shot(page, "02-simple-result.png");

await page.goto(`${BASE}/logout`, { waitUntil: "networkidle" });
await page.goto(`${BASE}/login`, { waitUntil: "networkidle" });
await page.getByRole("heading", { name: "구글 로그인" }).waitFor();
await shot(page, "03-login.png");

await page.goto(`${BASE}/detail`, { waitUntil: "domcontentloaded" });
await page.getByRole("heading", { name: "성별을 선택해 주세요" }).waitFor();
await clickLabel(page, "남자");
await clickLabel(page, "630 이상");
await page.getByRole("heading", { name: "한달에 얼마나 달리시나요?" }).waitFor();
await shot(page, "04-detail-quiz.png");

await clickLabel(page, "100~200km");
await clickLabel(page, "아스팔트");
await clickLabel(page, "다음");
await clickLabel(page, "보통");
await clickLabel(page, "없음");
await clickLabel(page, "다음");
await clickLabel(page, "데일리");
await clickLabel(page, "상관 없음");
await clickLabel(page, "다음");
await clickLabel(page, "상관 없음");
await page.getByText("당신에게 딱 맞는 신발을 추천해 드릴게요!").waitFor();
await shot(page, "05-detail-result.png");

await page.evaluate(() => {
  localStorage.setItem(
    "runningshoes-profile",
    JSON.stringify({
      surveys: [{ date: "260819", survey: [], shoes: [], selectedShoe: null }],
      closet: [
        { id: "1", name: "뉴발란스 860 V15", purpose: "daily" },
        { id: "2", name: "아식스 슈퍼블라스트", purpose: "super" },
        { id: "3", name: "아디다스 EVOSL", purpose: "racing" },
      ],
      actualLogs: {},
      weatherLogs: {},
    }),
  );
});
await page.goto(`${BASE}/home`, { waitUntil: "networkidle" });
await page.getByText("오늘도 가볍게 한 바퀴").waitFor();
await page.setViewportSize({ width: 1440, height: 1100 });
await page.waitForTimeout(1200);
await shot(page, "06-home.png");

await browser.close();
console.log("saved screenshots to", OUT);
