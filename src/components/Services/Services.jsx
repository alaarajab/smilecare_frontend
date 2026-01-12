import "./Services.css";

import generalImg from "../../assets/general.png";
import cosmeticImg from "../../assets/cosmetic.png";
import implantImg from "../../assets/implant.png";
import endoImg from "../../assets/endodontics.png";

function Services() {
  const services = [
    {
      title: "General Dentistry",
      image: generalImg,
      description:
        "Preventive and routine dental care focused on maintaining long-term oral health.",
      cases: [
        "Routine cleanings and exams",
        "Cavity detection and fillings",
        "Gum disease treatment",
      ],
      video: "https://www.youtube.com/embed/GENERAL_VIDEO_ID",
    },
    {
      title: "Cosmetic Dentistry",
      image: cosmeticImg,
      description:
        "Enhancing smiles with modern cosmetic solutions tailored to each patient.",
      cases: [
        "Teeth whitening",
        "Porcelain veneers",
        "Smile makeover planning",
      ],
      video: "https://www.youtube.com/embed/COSMETIC_VIDEO_ID",
    },
    {
      title: "Dental Implants",
      image: implantImg,
      description:
        "Permanent tooth replacement solutions that restore function and confidence.",
      cases: [
        "Single tooth implants",
        "Implant-supported bridges",
        "Full-mouth restoration",
      ],
      video: "https://www.youtube.com/embed/IMPLANT_VIDEO_ID",
    },
    {
      title: "Endodontics",
      image: endoImg,
      description:
        "Specialized root canal treatments to relieve pain and save natural teeth.",
      cases: [
        "Root canal therapy",
        "Retreatment cases",
        "Emergency pain relief",
      ],
      video: "https://www.youtube.com/embed/ENDO_VIDEO_ID",
    },
  ];

  return (
    <section className="services">
      {services.map((service) => (
        <div className="service" key={service.title}>
          <img src={service.image} alt={service.title} />
          <div className="service__content-wrapper">
            <div className="service__content">
              <h2>{service.title}</h2>

              <p>{service.description}</p>
              <ul>
                {service.cases.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>

            <div className="service__video">
              <iframe
                src={service.video}
                title={`${service.title} Video`}
                allowFullScreen
              />
            </div>
          </div>
          <span className="service__divider" />
        </div>
      ))}
    </section>
  );
}

export default Services;
