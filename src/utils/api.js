import { backendBaseUrl } from "./constants.js";

export async function checkResponse(res) {
  const data = await res.json().catch(() => ({}));

  if (res.ok) return data;

  // ✅ show full backend error payload
  console.log("[API ERROR]", res.status, data);

  // ✅ build a helpful message
  const validationMsg =
    data?.details?.join(", ") ||
    data?.validation?.body?.message ||
    data?.validation?.params?.message ||
    data?.message;

  const msg = validationMsg || `Error: ${res.status}`;

  return Promise.reject(msg);
}

// AUTH
export const register = ({ name, email, password }) => {
  return fetch(`${backendBaseUrl}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  }).then(checkResponse);
};

export const login = ({ email, password }) => {
  return fetch(`${backendBaseUrl}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

// USERS (protected)
export const getMe = (token) => {
  return fetch(`${backendBaseUrl}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then(checkResponse);
};

// SAVED CARDS toggle (protected)
export const toggleSavedTip = (tipId, token) => {
  return fetch(`${backendBaseUrl}/users/me/saved-tips/${tipId}`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
  }).then(checkResponse);
};

// CONTACT (public POST)
export const submitContact = (body) => {
  return fetch(`${backendBaseUrl}/contacts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then(checkResponse);
};
