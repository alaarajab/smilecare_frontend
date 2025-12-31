# smilecare_frontend
Project Overview
SmileCare Dental Clinic is a responsive, single-page React application designed to promote a dental clinic’s services while providing educational oral health content. The project combines business and marketing goals (advertising services, building trust, encouraging appointments) with technical goals, including third-party API integration, reusable components, client-side routing, backend API security, user authentication, and optional AI-enhanced features.
________________________________________
Primary Users
The primary users are new patients, with secondary support for existing patients. The site focuses on helping new visitors learn about the clinic, feel confident, and take the next step toward booking an appointment.
________________________________________
Business Goal & Conversion
The main conversion goal is booking an appointment, supported by:
•	A calendar component that lets users select the date and time for their appointment.
•	Logged-in users can view their booked appointments in their portal.
•	A contact form for additional inquiries.
________________________________________
Educational Content
The Dental Education page uses a dropdown menu to allow users to select the topic most relevant to them. Once a topic is selected, the page fetches information from:
•	A local JSON file with educational tips.
•	The API Ninjas Nutrition API to show relevant nutrition cards.
Users can view the educational content publicly, but only logged-in users can save cards to their portal.
________________________________________
API Usage & MVP Scope
•	Core API for MVP: Medical / Symptoms API (via JSON and Ninja API).
•	Stretch Feature: Optional AI chatbot to provide educational guidance.
This ensures a realistic scope while allowing room for enhancement.
________________________________________
User Authentication & Protected Routes
•	Users can register and log in to the application.
•	JWT-based authentication will be used to manage secure sessions.
•	The Dental Education page is publicly viewable, but only logged-in users can save cards and view booked appointments.
Benefits:
•	Encourages user registration and lead capture.
•	Builds trust through secure, members-only features.
•	Increases repeat engagement and return visits.
Routes:
•	Public: Home, Services, Contact/Book Appointment, Dental Education (view only), Staff
•	Protected: Dental Education (save cards & view appointments)
________________________________________
Planned Features (MVP)
Frontend (React):
•	Home Page: Clinic overview, marketing message, and appointment CTA
•	Services Page: Dental services displayed using reusable card components
•	Contact / Book Appointment Page: Calendar-based appointment scheduling form
•	Dental Education Page (Public + Protected Features):
o	API-powered condition cards
o	Dropdown topic selection (no search)
o	Optional AI chatbot for educational guidance
o	Save cards and view them in user portal (requires login)
•	Contact / About Us Page: Clinic info, mission, and outreach CTAs
General Features:
•	Reusable UI components (cards, buttons, sections)
•	Client-side routing using React Router
•	Responsive design
•	CSS structured using BEM methodology
________________________________________
Minimal Backend
A lightweight Node.js + Express backend will be implemented to:
•	Securely store and hide API keys
•	Proxy requests to third-party APIs
•	Handle user authentication and authorization
•	Store saved educational cards and appointment data for logged-in users
•	system.
