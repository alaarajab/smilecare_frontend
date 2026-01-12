import { Link } from "react-router-dom";
import "./Home.css";

import generalImg from "../../assets/general.png";
import cosmeticImg from "../../assets/cosmetic.png";
import implantImg from "../../assets/implant.png";
import endoImg from "../../assets/endodontics.png";

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
    </div>
  );
}

export default Home;
