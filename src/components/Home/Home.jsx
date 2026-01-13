import { Link } from "react-router-dom";
import "./Home.css";

import generalImg from "../../assets/general.png";
import cosmeticImg from "../../assets/cosmetic.png";
import implantImg from "../../assets/implant.png";
import endoImg from "../../assets/endodontics.png";
import googleIcon from "../../assets/google_icon.png";

function Home() {
  const services = [
    {
      title: "General Dentistry",
      image: generalImg,
    },
    {
      title: "Cosmetic Dentistry",
      image: cosmeticImg,
    },
    {
      title: "Implants",
      image: implantImg,
    },
    {
      title: "Endodontics",
      image: endoImg,
    },
  ];
  const testimonials = [
    { name: "John D.", review: "Amazing service and friendly staff!" },
    {
      name: "Sarah K.",
      review: "Highly recommend! My teeth have never looked better.",
    },
    {
      name: "Michael B.",
      review: "Professional and caring dentists. 5 stars!",
    },
    {
      name: "Emily R.",
      review: "Excellent experience, very comfortable and clean.",
    },
  ];
  return (
    <div className="home__page">
      <p className="home__intro">
        SmileCare Dental Clinic serves Chicago, IL, and the surrounding
        communities with compassionate, high-quality dental care. Our team
        offers General Dentistry, Cosmetic Dentistry, Orthodontics, and
        Endodontics, combining the latest technology with a patient-centered
        approach to keep your smile healthy and confident.
      </p>

      <span className="home__divider" />

      <h2 className="home__highlight-title">Our Services</h2>

      <div className="home__cards">
        {services.map((service) => (
          <div className="home__cards-service" key={service.title}>
            <div className="home__cards-service-image">
              <img src={service.image} alt={service.title} />
            </div>
            <h3 className="home__cards-service-title">{service.title}</h3>
          </div>
        ))}
      </div>

      <Link to="/services" className="home__learn-more">
        Learn More
      </Link>
      {/* Testimonials */}
      <h2 className="home__highlight-title">What Our Patients Say</h2>

      <div className="home__testimonials">
        {testimonials.map((t, index) => (
          <div className="home__testimonial-card" key={index}>
            <div className="home__testimonial-stars">★★★★★</div>
            <p className="home__testimonial-review">"{t.review}"</p>
            <p className="home__testimonial-name">— {t.name}</p>
          </div>
        ))}
      </div>
      <p className="home__highlight-info">
        We have over 1000 positive reviews on Google
      </p>
      <a
        href="https://www.google.com/maps/place/Your-Clinic-Name/reviews"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img className="home__google-logo" src={googleIcon} alt="Google Logo" />
      </a>
    </div>
  );
}

export default Home;
