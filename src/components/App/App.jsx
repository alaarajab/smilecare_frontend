import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import DentalEducation from "../DentalEducation/DentalEducation";
import Contact from "../Contact/Contact";
import Home from "../Home/Home";
import Services from "../Services/Services";
import Staff from "../Staff/Staff";

function App() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  return (
    <div className="page">
      <div className="page__content">
        <Header onLoginClick={() => setLoginOpen(true)} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dental-education" element={<DentalEducation />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/staff" element={<Staff />} />
        </Routes>

        {/* Global modals */}
        <LoginModal
          isOpen={loginOpen}
          onClose={() => setLoginOpen(false)}
          onRegisterClick={() => {
            setLoginOpen(false);
            setRegisterOpen(true);
          }}
        />

        <RegisterModal
          isOpen={registerOpen}
          onClose={() => setRegisterOpen(false)}
          onLoginClick={() => {
            setRegisterOpen(false);
            setLoginOpen(true);
          }}
        />

        <Footer />
      </div>
    </div>
  );
}

export default App;
