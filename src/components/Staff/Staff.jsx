import "./Staff.css";
import staffImg from "../../assets/character.jpg"; // single image for all staff

function Staff() {
  const staffMembers = [
    {
      name: "Dr. B A",
      title: "Lead Dentist / Endodontist",
      experience:
        "Specializes in endodontics with 15+ years of patient-focused care.",
    },
    {
      name: "Dr. Michael",
      title: "General Dentist",
      experience:
        "Provides routine check-ups, preventive care, and cosmetic treatments.",
    },
    {
      name: "Ms. Anne",
      title: "Hygienist",
      experience: "Provides cleanings and preventive care.",
    },
    {
      name: "Ms. Hana",
      title: "Office Manager",
      experience: "Keeps the clinic organized and supports patients and staff.",
    },
    {
      name: "Mr. Tom",
      title: "Dental Assistant",
      experience:
        "Supports dental procedures and patient care in all clinic operations.",
    },
    {
      name: "Ms. Ashley",
      title: "Dental Assistant",
      experience: "Assists procedures and ensures patient comfort.",
    },
  ];

  return (
    <section className="staff">
      <h1 className="staff__title">Meet Our Team</h1>

      <div className="staff__grid">
        {staffMembers.map((member, index) => (
          <div className="staff__card" key={index}>
            <img src={staffImg} alt={member.name} className="staff__image" />

            <div className="staff__info">
              <h2 className="staff__name">{member.name}</h2>
              <h3 className="staff__title">{member.title}</h3>
              <p className="staff__experience">{member.experience}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Staff;
