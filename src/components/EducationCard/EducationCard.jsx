import React from "react";
import "./EducationCard.css";

function EducationCard({ title, tip, nutrition }) {
  return (
    <div className="education__card">
      <h3>{title}</h3>
      <p>{tip}</p>
      <p>
        Recommended nutrition:{" "}
        {nutrition && nutrition.length ? nutrition.join(", ") : "N/A"}
      </p>
    </div>
  );
}

export default EducationCard;
