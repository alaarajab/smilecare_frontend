import { useState } from "react";
import "./ContactForm.css";

function ContactForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bookAppointment, setBookAppointment] = useState(false);
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can integrate API here
    const formData = {
      fullName,
      email,
      phone,
      bookAppointment,
      preferredDate,
      preferredTime,
    };

    console.log("Form submitted:", formData);

    // Reset form
    setFullName("");
    setEmail("");
    setPhone("");
    setBookAppointment(false);
    setPreferredDate("");
    setPreferredTime("");
    setSubmitted(true);
  };

  return (
    <div className="contact-form-container">
      <h2>
        Fill out the form below to get in touch or reserve your appointment
      </h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <label className="book-appointment-checkbox">
          <input
            type="checkbox"
            checked={bookAppointment}
            onChange={(e) => setBookAppointment(e.target.checked)}
          />
          Book Appointment
        </label>

        {bookAppointment && (
          <div className="appointment-details">
            <label>
              Preferred Date:
              <input
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                required={bookAppointment}
              />
            </label>

            <label>
              Preferred Time:
              <select
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                required={bookAppointment}
              >
                <option value="">Select Time</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}

        <button type="submit">{bookAppointment ? "Book" : "Send"}</button>
      </form>

      {submitted && (
        <p className="confirmation-text">
          We will contact you to confirm your appointment. All information is
          private.
        </p>
      )}
    </div>
  );
}

export default ContactForm;
