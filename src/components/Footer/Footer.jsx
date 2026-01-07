import "./Footer.css";
import logo from "../../assets/logo.svg";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__logo">
          <img src={logo} alt="SmileCare Dental Clinic logo" />
          <p>
            SmileCare Dental Clinic provides high-quality dental care with a
            patient-first approach.
          </p>
        </div>

        <nav className="footer__links">
          <h3>Quick Links</h3>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/staff">Our Staff</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/dental-education">Dental Education</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>

        <div className="footer__contact">
          <h3>Contact Us</h3>
          <a
            href="https://www.google.com/maps/search/Schaumburg,+IL"
            target="_blank"
            rel="noopener noreferrer"
          >
            📍 Schaumburg, IL
          </a>
          <a href="tel:+11234567890">📞 (123) 456-7890</a>
          <a href="mailto:info@smilecare.com">✉️ info@smilecare.com</a>
        </div>

        <div className="footer__social">
          <h3>Follow Us</h3>
          <a href="#">Facebook</a>
          <a href="https://www.instagram.com/dr_basel_abozor/">Instagram</a>
          <a href="#">Twitter</a>
        </div>
      </div>

      <div className="footer__bottom">
        <p>
          © {new Date().getFullYear()} SmileCare Dental Clinic. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
