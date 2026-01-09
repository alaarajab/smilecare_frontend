import React from "react";
import "./EducationCard.css";

function EducationCard({ title, tip, nutrition }) {
  return (
    <div className="education__card">
      <h3 className="education__card-title">{title}</h3>
      <div className="education__card-description">
        <p>{tip}</p>
        <p>
          Recommended nutrition:{" "}
          {nutrition && nutrition.length ? nutrition.join(", ") : "N/A"}
        </p>
      </div>
    </div>
  );
}

export default EducationCard;
