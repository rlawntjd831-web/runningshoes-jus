export function pickClosetShoe(closet, kind = "easy", options = {}) {
  if (!closet?.length) return null;

  if (options.rainy) {
    return pickRainShoe(closet) ?? pickByKind(closet, kind);
  }

  return pickByKind(closet, kind);
}

function pickRainShoe(closet) {
  return (
    closet.find((shoe) => /뉴발/.test(shoe.name) && /860/.test(shoe.name)) ??
    closet.find((shoe) => /860/.test(shoe.name))
  );
}

function pickByKind(closet, kind = "easy") {
  if (kind === "easy" || kind === "rest") {
    return closet.find((shoe) => shoe.purpose === "daily") ?? closet[0];
  }

  if (kind === "speed" || kind === "race") {
    return (
      closet.find((shoe) => shoe.purpose === "racing") ??
      closet.find((shoe) => shoe.purpose === "super") ??
      closet[0]
    );
  }

  if (kind === "long") {
    return (
      closet.find((shoe) => shoe.purpose === "super") ??
      closet.find((shoe) => shoe.purpose === "daily") ??
      closet[0]
    );
  }

  return closet[0];
}
