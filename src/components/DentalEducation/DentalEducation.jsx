import React, { useState } from "react";

import NutritionCard from "../NutritionCard/NutritionCard";
import dentalTips from "../../utils/dentalTips";
import ItemCard from "../ItemCard/ItemCard";
import "./DentalEducation.css";

function DentalEducation() {
  const symptoms = Object.keys(dentalTips);
  const [selectedSymptom, setSelectedSymptom] = useState(null);

  return (
    <main className="education">
      <div className="education__container">
        <p className="education__intro">
          Welcome to SmileCare Dental Education. Pick a dental symptom or topic
          to find tips to improve your dental health.
        </p>

        <section className="education__dropdown">
          <label htmlFor="symptoms">Select symptom: </label>
          <select
            id="symptoms"
            value={selectedSymptom || ""}
            onChange={(e) => setSelectedSymptom(e.target.value)}
          >
            <option value="" disabled>
              -- choose a symptom --
            </option>
            {symptoms.map((symptom) => (
              <option key={symptom} value={symptom}>
                {symptom}
              </option>
            ))}
          </select>
        </section>

        {selectedSymptom && dentalTips[selectedSymptom] && (
          <ItemCard title={selectedSymptom} id={selectedSymptom}>
            <p>{dentalTips[selectedSymptom].tip}</p>

            <p>
              <strong>Recommended nutrition:</strong>{" "}
              {dentalTips[selectedSymptom].nutrition?.join(", ") || "N/A"}
            </p>
          </ItemCard>
        )}

        <NutritionCard />
      </div>
    </main>
  );
}

export default DentalEducation;
