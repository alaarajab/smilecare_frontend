const API_KEY = import.meta.env.VITE_NINJA_API_KEY;
const BASE_URL = "https://api.api-ninjas.com/v1/nutrition";

export async function fetchNutrition(query) {
  if (!query) return [];

  const res = await fetch(`${BASE_URL}?query=${encodeURIComponent(query)}`, {
    headers: { "X-Api-Key": API_KEY },
  });

  let data;
  try {
    data = await res.json();
  } catch {
    const text = await res.text();
    console.error("API returned invalid JSON:", text);
    throw new Error(text || "Failed to fetch nutrition info");
  }

  if (!res.ok) {
    console.error("API error:", data);
    throw new Error(data.error || "Failed to fetch nutrition info");
  }

  return data;
}