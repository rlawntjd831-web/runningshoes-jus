const PROFILE_KEY = "runningshoes-profile";

export function todayCode(date = new Date()) {
  const year = String(date.getFullYear()).slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}

export function saveProfile(profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function loadProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? normalizeProfile(JSON.parse(raw)) : null;
  } catch {
    return null;
  }
}

function normalizeProfile(profile) {
  if (!profile) return null;

  if (Array.isArray(profile.surveys)) {
    return profile;
  }

  if (profile.survey) {
    return {
      surveys: [
        {
          date: todayCode(),
          survey: profile.survey,
          shoes: profile.shoes,
          selectedShoe: profile.selectedShoe,
        },
      ],
      shoes: profile.shoes,
      selectedShoe: profile.selectedShoe,
    };
  }

  return profile;
}

function persist(patch) {
  const existing = loadProfile() ?? {};
  saveProfile({
    ...existing,
    ...patch,
  });
}

export function saveActualTraining(key, record) {
  const existing = loadProfile() ?? {};
  const actualLogs = { ...(existing.actualLogs ?? {}) };
  if (record == null) {
    delete actualLogs[key];
  } else {
    actualLogs[key] = record;
  }
  persist({ actualLogs });
}

export function saveWeatherLog(key, record) {
  const existing = loadProfile() ?? {};
  persist({
    weatherLogs: {
      ...(existing.weatherLogs ?? {}),
      [key]: record,
    },
  });
}

export function saveCloset(closet) {
  persist({ closet });
}

export function saveSurveySession({ survey, shoes, selectedShoe }) {
  const existing = loadProfile() ?? { surveys: [] };
  const date = todayCode();
  const surveys = [...(existing.surveys ?? [])];
  const record = { date, survey, shoes, selectedShoe };
  const index = surveys.findIndex((item) => item.date === date);

  if (index >= 0) {
    surveys[index] = record;
  } else {
    surveys.unshift(record);
  }

  persist({
    surveys,
    shoes,
    selectedShoe,
  });
}

export function buildSurveyResults(questions, answers) {
  return questions.map((question, index) => {
    const value = answers[index];
    if (Array.isArray(value)) {
      const labels = value.map(
        (id) => question.options.find((item) => item.id === id)?.label ?? id,
      );
      return {
        question: question.hint
          ? `${question.text} ${question.hint}`
          : question.text,
        answer: labels.join(", "),
      };
    }

    const option = question.options.find((item) => item.id === value);
    return {
      question: question.hint
        ? `${question.text} ${question.hint}`
        : question.text,
      answer: option?.label ?? value,
    };
  });
}
