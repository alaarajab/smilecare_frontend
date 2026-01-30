import { useState, useEffect } from "react";
import NutritionCard from "../NutritionCard/NutritionCard";
import ItemCard from "../ItemCard/ItemCard";
import { getDentalTips } from "../../utils/api";
import "./DentalEducation.css";

function DentalEducation() {
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptom, setSelectedSymptom] = useState("");
  const [tipsData, setTipsData] = useState(null);

  useEffect(() => {
    getDentalTips()
      .then((tips) => setSymptoms(tips))
      .catch((err) => console.error("FAILED TO LOAD TIPS:", err));
  }, []);

  useEffect(() => {
    if (!selectedSymptom) {
      setTipsData(null);
      return;
    }

    const selectedTip = symptoms.find((tip) => tip.id === selectedSymptom);
    setTipsData(selectedTip || null);
  }, [selectedSymptom, symptoms]);

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
            value={selectedSymptom}
            onChange={(e) => setSelectedSymptom(e.target.value)}
          >
            <option value="" disabled>
              -- choose a symptom --
            </option>

            {symptoms.map((symptom) => (
              <option key={symptom.id} value={symptom.id}>
                {symptom.title}
              </option>
            ))}
          </select>
        </section>

        {tipsData && (
          <ItemCard
            id={tipsData.id}
            title={tipsData.title}
            description={tipsData.description}
            nutrition={tipsData.nutrition}
          />
        )}

        <NutritionCard />
      </div>
    </main>
  );
}

export default DentalEducation;
