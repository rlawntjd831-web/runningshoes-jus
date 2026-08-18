export const EXPERIENCE_QUESTION = {
  id: "experience",
  text: "러닝을 해보신 적이 있으신가요?",
  options: [
    { id: "yes", label: "네" },
    { id: "no", label: "아니오" },
  ],
};

const INJURY_QUESTION = {
  id: "injury",
  text: "부상 경력이 있으신가요?",
  options: [
    { id: "yes", label: "네" },
    { id: "no", label: "아니오" },
  ],
};

const INJURY_LOCATION_OPTIONS = [
  { id: "sole", label: "발바닥" },
  { id: "heel", label: "발 뒤꿈치" },
  { id: "ankle", label: "발목" },
  { id: "achilles", label: "아킬레스건" },
  { id: "shin", label: "정강이" },
  { id: "calf", label: "종아리" },
  { id: "knee", label: "무릎" },
  { id: "thigh", label: "허벅지" },
  { id: "itBand", label: "장경인대" },
  { id: "hipJoint", label: "고관절" },
  { id: "hip", label: "엉덩이" },
];

const INJURY_LOCATION_QUESTION = {
  id: "injuryLocation",
  stepLabel: "2-1",
  text: "부상 부위가 어디인가요? (복수 선택 가능)",
  multiple: true,
  options: INJURY_LOCATION_OPTIONS,
};

const PURPOSE_QUESTION = {
  id: "purpose",
  text: "어떤 용도의 신발을 원하시나요?",
  options: [
    { id: "daily", label: "데일리" },
    { id: "super", label: "슈퍼 트레이너" },
    { id: "racing", label: "레이싱" },
  ],
};

const BEGINNER_FOLLOWUP = [
  {
    id: "budget",
    text: "예산은 어느 정도인가요? (복수 선택 가능)",
    multiple: true,
    options: [
      { id: "under10", label: "10만원 이하" },
      { id: "10to15", label: "10만원~15만원" },
      { id: "15to20", label: "15만원~20만원" },
      { id: "20to25", label: "20만원~25만원" },
      { id: "over25", label: "25만원 이상" },
    ],
  },
  {
    id: "pain",
    text: "평소에 아픈 곳이 있으신가요? (복수 선택 가능)",
    multiple: true,
    exclusiveOptionId: "none",
    options: [
      { id: "ankle", label: "발목" },
      { id: "knee", label: "무릎" },
      { id: "back", label: "허리" },
      { id: "flat", label: "평발" },
      { id: "none", label: "없음" },
    ],
  },
];

export function getSimpleQuizQuestions(answers) {
  const questions = [EXPERIENCE_QUESTION];
  if (answers[0] === "yes") {
    questions.push(INJURY_QUESTION);
    if (answers[1] === "yes") {
      questions.push(INJURY_LOCATION_QUESTION, PURPOSE_QUESTION);
    } else if (answers[1] === "no") {
      questions.push(PURPOSE_QUESTION);
    }
    return questions;
  }
  if (answers[0] === "no") {
    return [...questions, ...BEGINNER_FOLLOWUP];
  }
  return questions;
}

export function getSimpleQuizTotal(answers) {
  if (answers[0] === "yes" && answers[1] === "yes") return 4;
  return 3;
}

export function recommendShoes(answers) {
  void answers;
  return [
    {
      id: "nb-860-v15",
      name: "뉴발란스 860 V15",
      image: "/shoes/nb-860-v15.png",
    },
    {
      id: "gel-kayano",
      name: "아식스 젤카야노",
      image: "/shoes/gel-kayano.png",
    },
    {
      id: "pegasus",
      name: "나이키 페가수스",
      image: "/shoes/pegasus.png",
    },
  ];
}

export function recommendShoeType(answers) {
  if (answers[0] === "yes") {
    const purpose = answers[1] === "yes" ? answers[3] : answers[2];
    if (purpose === "super" || purpose === "racing") return "슈퍼트레이닝화";
    if (answers[1] === "yes") return "안정화";
    return "쿠션화";
  }

  const pain = Array.isArray(answers[2]) ? answers[2] : [];
  if (pain.length > 0 && !pain.includes("none")) return "안정화";
  return "쿠션화";
}

// 로그인 후 상세 질문
const GENDER_QUESTION = {
  id: "gender",
  text: "성별을 선택해 주세요",
  options: [
    { id: "male", label: "남자" },
    { id: "female", label: "여자" },
  ],
};

const PACE_QUESTION_MALE = {
  id: "pace",
  text: "조깅 페이스가 어떻게 되시나요? (1km 기준)",
  options: [
    { id: "pace1", label: "630 이상" },
    { id: "pace2", label: "600 ~ 630" },
    { id: "pace3", label: "530 ~ 600" },
    { id: "pace4", label: "500 ~ 530" },
    { id: "pace5", label: "430 ~ 500" },
    { id: "pace6", label: "430 이하" },
  ],
};

const PACE_QUESTION_FEMALE = {
  id: "pace",
  text: "조깅 페이스가 어떻게 되시나요? (1km 기준)",
  options: [
    { id: "pace1", label: "730 이상" },
    { id: "pace2", label: "700 ~ 730" },
    { id: "pace3", label: "630 ~ 700" },
    { id: "pace4", label: "600 ~ 630" },
    { id: "pace5", label: "530 ~ 600" },
    { id: "pace6", label: "530 이하" },
  ],
};

const DETAIL_FOLLOWUP = [
  {
    id: "monthlyDistance",
    text: "한달에 얼마나 달리시나요?",
    options: [
      { id: "under50", label: "50km 이하" },
      { id: "from50to100", label: "50~100km" },
      { id: "from100to200", label: "100~200km" },
      { id: "over200", label: "200km이상" },
    ],
  },
  {
    id: "surface",
    text: "주로 어디서 달리나요? (복수 선택 가능)",
    multiple: true,
    options: [
      { id: "track", label: "트랙" },
      { id: "asphalt", label: "아스팔트" },
      { id: "dirt", label: "흙길" },
    ],
  },
  {
    id: "width",
    text: "발볼은 어떤 편인가요?",
    options: [
      { id: "wide", label: "넓음" },
      { id: "normal", label: "보통" },
      { id: "narrow", label: "좁음" },
    ],
  },
  {
    id: "injuryConcern",
    text: "부상이 있거나 걱정되는 부위가 있나요? (복수 선택 가능)",
    multiple: true,
    exclusiveOptionId: "none",
    options: [...INJURY_LOCATION_OPTIONS, { id: "none", label: "없음" }],
  },
  {
    ...PURPOSE_QUESTION,
    id: "detailPurpose",
  },
  {
    id: "brands",
    text: "선호하는 브랜드가 있나요? (복수 선택 가능)",
    multiple: true,
    exclusiveOptionId: "any",
    options: [
      { id: "nike", label: "나이키" },
      { id: "adidas", label: "아디다스" },
      { id: "asics", label: "아식스" },
      { id: "newbalance", label: "뉴발란스" },
      { id: "saucony", label: "써코니" },
      { id: "puma", label: "퓨마" },
      { id: "hoka", label: "호카" },
      { id: "mizuno", label: "미즈노" },
      { id: "on", label: "온러닝" },
      { id: "brooks", label: "브룩스" },
      { id: "any", label: "상관 없음" },
    ],
  },
  {
    id: "design",
    text: "선호하는 디자인이 있으신가요?",
    options: [
      { id: "flashy", label: "화려한 디자인" },
      { id: "clean", label: "깔끔한 디자인" },
      { id: "any", label: "상관 없음" },
    ],
  },
];

export const DETAIL_QUIZ_LENGTH = 9;

export function getDetailQuizQuestions(answers) {
  const questions = [GENDER_QUESTION];
  if (!answers[0]) return questions;

  questions.push(answers[0] === "female" ? PACE_QUESTION_FEMALE : PACE_QUESTION_MALE);
  questions.push(...DETAIL_FOLLOWUP);
  return questions;
}

const PACE_LEVEL = {
  pace1: "초보자",
  pace2: "초보자",
  pace3: "중급자",
  pace4: "중급자",
  pace5: "상급자",
  pace6: "상급자",
};

const DISTANCE_LEVEL = {
  under50: "초보자",
  from50to100: "초보자",
  from100to200: "중급자",
  over200: "상급자",
};

export function getRunnerLevel(answers) {
  const distanceLevel = DISTANCE_LEVEL[answers[2]];
  if (distanceLevel) return distanceLevel;
  return PACE_LEVEL[answers[1]] ?? "초보자";
}

export function recommendDetailShoes(answers) {
  void answers;
  return [
    {
      id: "superblast",
      name: "아식스 슈퍼블라스트",
      image: "/shoes.png/슈블.png",
      keywords: ["데일리", "슈퍼 트레이너", "안정성"],
      description: "데일리와 슈퍼 트레이닝을 겸하는 안정성 중심 추천입니다.",
    },
    {
      id: "evo-sl",
      name: "아디다스 EVOSL",
      image: "/shoes/evo-sl.png",
      keywords: ["데일리", "슈퍼 트레이너", "스피드"],
      description: "데일리와 슈퍼 트레이닝을 겸하는 스피드 중심 추천입니다.",
    },
    {
      id: "endorphin-azul",
      name: "써코니 엔돌핀 아주라",
      image: "/shoes/endorphin-azul.png",
      keywords: ["데일리", "슈퍼 트레이너", "무릎 통증 완화"],
      description: "데일리와 슈퍼 트레이닝을 겸하며 무릎 부담을 줄이는 추천입니다.",
    },
  ];
}
