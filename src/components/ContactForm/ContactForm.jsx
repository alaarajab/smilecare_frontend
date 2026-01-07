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
    <div className="contact">
      <h2 className="contact__title">
        Fill out the form below to get in touch or reserve your appointment
      </h2>

      <form className="contact__form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          className="contact__input"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          className="contact__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="tel"
          placeholder="Phone Number"
          className="contact__input"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <label className="contact__checkbox">
          <input
            type="checkbox"
            checked={bookAppointment}
            onChange={(e) => setBookAppointment(e.target.checked)}
          />
          Book Appointment
        </label>

        {bookAppointment && (
          <div className="contact__details">
            <label>
              Preferred Date:
              <input
                type="date"
                className="contact__input"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                required={bookAppointment}
              />
            </label>

            <label>
              Preferred Time:
              <select
                className="contact__input"
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

        <button
          type="submit"
          className={`contact__button ${
            (bookAppointment && (!preferredDate || !preferredTime)) ||
            !fullName ||
            !email ||
            !phone
              ? "contact__button--disabled"
              : ""
          }`}
          disabled={
            (bookAppointment && (!preferredDate || !preferredTime)) ||
            !fullName ||
            !email ||
            !phone
          }
        >
          {bookAppointment ? "Book" : "Send"}
        </button>
      </form>

      {submitted && (
        <p className="contact__confirmation-text">
          We will contact you to confirm your appointment. All information is
          private.
        </p>
      )}
    </div>
  );
}

export default ContactForm;
