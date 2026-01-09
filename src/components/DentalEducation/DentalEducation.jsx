import { useState, useEffect } from "react";
import NutritionCard from "../NutritionCard/NutritionCard";
import ItemCard from "../ItemCard/ItemCard";
import "./DentalEducation.css";

function DentalEducation() {
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [tipsData, setTipsData] = useState(null);

  // Fetch all dental tips for the dropdown
  useEffect(() => {
    fetch("http://localhost:4000/dentalTips")
      .then((res) => res.json())
      .then((data) => setSymptoms(data))
      .catch((err) => console.error(err));
  }, []);

  // Fetch the selected symptom details directly from the API
  useEffect(() => {
    if (!selectedSymptom) return;

    fetch(`http://localhost:4000/dentalTips/${selectedSymptom}`)
      .then((res) => res.json())
      .then((data) => setTipsData(data))
      .catch((err) => console.error(err));
  }, [selectedSymptom]);

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
