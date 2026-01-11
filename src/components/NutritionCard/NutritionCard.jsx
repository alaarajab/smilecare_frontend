import React, { useState } from "react";
import ItemCard from "../ItemCard/ItemCard";
import { fetchNutrition } from "../../utils/ninjaApi";
import { DENTAL_HEALTH_THRESHOLDS } from "../../utils/constants";

import "./NutritionCard.css";

function NutritionSearch() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Clean query: letters and spaces only
  const cleanQuery = (text) => text.replace(/[^a-zA-Z\s]/g, "").trim();

  const handleSearch = async () => {
    const q = cleanQuery(query);
    if (!q) {
      setError("Please enter a valid food name.");
      setResult(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await fetchNutrition(q);
      if (!data || data.length === 0) {
        setResult(null);
        setError("No results found.");
      } else {
        setResult(data[0]);
      }
    } catch (err) {
      setError("Failed to fetch nutrition info.");
    } finally {
      setLoading(false);
    }
  };

  const evaluateDentalHealth = (food) => {
    if (!food) return "";
    const sugar = food.sugar_g || 0;
    const calcium = food.calcium_mg || 0;

    if (
      sugar < DENTAL_HEALTH_THRESHOLDS.maxSugar &&
      calcium > DENTAL_HEALTH_THRESHOLDS.minCalcium
    )
      return "Good for dental health 🦷";
    if (sugar > DENTAL_HEALTH_THRESHOLDS.highSugar)
      return "High sugar, not ideal for teeth ⚠️";
    return "Moderate, be careful 🥄";
  };

  return (
    <div className="nutrition">
      <h2>Check a Food's Effect on Dental Health</h2>

      <div className="nutrition__input">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter food name..."
        />
        <button
          className="nutrition__input-button"
          onClick={handleSearch}
          disabled={query.trim() === ""}
        >
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <ItemCard
          id={result.name}
          title={result.name}
          description={`
Calories: ${result.calories} kcal
Protein: ${result.protein_g || 0} g
Fat: ${result.fat_total_g || 0} g
Sugar: ${result.sugar_g || 0} g
Carbs: ${result.carbohydrates_total_g || 0} g
${evaluateDentalHealth(result)}
          `}
        />
      )}
    </div>
  );
}

export default NutritionSearch;
