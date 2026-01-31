export const DENTAL_HEALTH_THRESHOLDS = {
  maxSugar: 5, // g
  highSugar: 10, // g
  minCalcium: 50, // mg
};
export const backendBaseUrl =
  import.meta.env.MODE === "production"
    ? "https://api.smilecare.jumpingcrab.com"
    : "http://localhost:3001/api";
