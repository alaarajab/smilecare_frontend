const API_KEY = "cR+m6r/zZHosXGgto93gCQ==m10NHgih4dT7WGoj";
const BASE_URL = "https://api.api-ninjas.com/v1/nutrition";

export async function fetchNutrition(query) {
  if (!query) return [];

  const res = await fetch(`${BASE_URL}?query=${encodeURIComponent(query)}`, {
    headers: { "X-Api-Key": API_KEY },
  });

  if (!res.ok) throw new Error("Failed to fetch nutrition info");
  const data = await res.json();
  return data;
}
