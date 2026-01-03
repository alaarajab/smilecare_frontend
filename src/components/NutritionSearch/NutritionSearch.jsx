import React, { useState } from "react";
import { fetchNutrition } from "../../utils/ninjaApi";
import { DENTAL_HEALTH_THRESHOLDS } from "../../utils/constants";
import "./NutritionSearch.css";

function NutritionSearch() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setError(null);

    try {
      const data = await fetchNutrition(query);
      if (data.length === 0) {
        setResult(null);
        setError("No results found.");
      } else {
        setResult(data[0]);
      }
    } catch (err) {
      setError(err.message);
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
    <div className="nutrition-search">
      <h2>Check a Food's Effect on Dental Health</h2>
      <div className="nutrition-search__input">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter food name..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div className="nutrition-search__result">
          <h3>{result.name}</h3>
          <p>Calories: {result.calories} kcal</p>
          <p>Protein: {result.protein_g || 0} g</p>
          <p>Fat: {result.fat_total_g || 0} g</p>
          <p>Sugar: {result.sugar_g || 0} g</p>
          <p>Carbs: {result.carbohydrates_total_g || 0} g</p>
          <p>{evaluateDentalHealth(result)}</p>
        </div>
      )}
    </div>
  );
}

export default NutritionSearch;
