# SmileCare Dental Clinic – Custom React Application

## Project Overview

**SmileCare Dental Clinic** is a responsive, single-page React application designed to promote a dental clinic’s services while providing educational oral health content. The project combines business and marketing goals (advertising services, building trust, encouraging appointments) with technical goals, including third-party API integration, reusable components, client-side routing, backend API security, user authentication, and optional AI-enhanced features.

---

## Primary Users

- **New Patients:** Main audience, aiming to learn about the clinic and book appointments.
- **Existing Patients:** Secondary audience, supporting appointment management and access to saved educational content.

---

## Educational Content

- **Dental Education Page:** Users can select topics via a dropdown menu.
- Content is fetched from:
  - A **local JSON file** with educational tips.
  - The **API Ninjas Nutrition API** to show relevant nutrition cards.
- Public access: All users can view educational content.
- Protected access: Only logged-in users can **save cards** to their portal.

---

## API Usage & MVP Scope

- **Core API for MVP:** Medical / Symptoms API (via JSON and Ninja API).

---

## User Authentication & Protected Routes (coming soon)

- **Authentication:** Users can register and log in.
- **Security:** JWT-based authentication for secure sessions.
- **Protected Features:**
  - Saving educational cards
  - Viewing booked appointments
- **Public Routes:** Home, Services, Contact/Book Appointment, Dental Education (view-only), Staff
- **Protected Routes:** Dental Education (save cards & view appointments)

**Benefits:**

- Encourages user registration and lead capture
- Builds trust through secure, members-only features
- Increases repeat engagement and return visits

---

## Planned Features (MVP)

### Frontend (React)

- **Home Page:** Clinic overview, marketing message, and appointment CTA
- **Services Page:** Dental services displayed using reusable card components
- **Contact / Book Appointment Page:** Calendar-based appointment scheduling form
- **Dental Education Page (Public + Protected Features):**
  - API-powered condition cards
  - Dropdown topic selection (no search)
  - Optional AI chatbot for educational guidance
  - Save cards, view, and delete them in user portal (requires login)
- **Contact / About Us Page:** Clinic info, mission, and outreach CTAs

### General Features

- Reusable UI components (cards, buttons, sections)
- Client-side routing using **React Router**
- Responsive design for desktop, tablet, and mobile
- CSS structured using **BEM methodology**

---

## Minimal Backend

A lightweight **Node.js + Express** backend is implemented to:

- Securely store and hide API keys
- Proxy requests to third-party APIs
- Handle user authentication and authorization
- Store saved educational cards and appointment data for logged-in users

---

## Technologies Used

- **Frontend:** React, React Router, Context API
- **Backend:** Node.js, Express
- **State Management:** React `useState`, `useEffect`, Context API
- **Styling:** CSS (BEM methodology)
- **API Integration:** Ninja API, local JSON data, optional AI features

## How to Run the Mock Server for Dental Tips

## API Configuration

This project uses the API Ninjas Nutrition API.

For security reasons, the API key is stored in a `.env` file and is not committed to the repository.

Reviewers can request the `.env` file via TripleTen Hub DM to test the full functionality.

## Links

- [Trello: Agile Management Tool](https://trello.com/b/V6WNoFHd/smilecare-dental-clinic)

- [Figma Design](https://www.figma.com/design/eTZhbfgWLREEoAQLVZW11Q/SMILECARE?node-id=22618-606&p=f&t=hvbkAGRaEzZ4f7UR-0)

- [Backend Repository](https://github.com/alaarajab/smilecare_backend)

- [Project Pitch Video](https://youtu.be/M2-xkqREXTo)

-[deployment link](https://alaarajab.github.io/smilecare_frontend/)
