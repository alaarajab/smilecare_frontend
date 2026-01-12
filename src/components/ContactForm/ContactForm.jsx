import React, { useState } from "react";
import { useForm } from "../../hooks/useForm";
import "./ContactForm.css";

function ContactForm() {
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

  // useForm to manage all fields & validation
  const { values, errors, handleChange, resetForm, isValid } = useForm(
    {
      fullName: "",
      email: "",
      phone: "",
      bookAppointment: false,
      preferredDate: "",
      preferredTime: "",
    },
    {
      fullName: (v) => (!v.trim() ? "Full Name is required" : ""),
      email: (v) => (!/^\S+@\S+\.\S+$/.test(v) ? "Invalid email address" : ""),
      phone: (v) => (!/^\+?\d{7,15}$/.test(v) ? "Invalid phone number" : ""),
      preferredDate: (v, all) =>
        all.bookAppointment && !v ? "Select a date" : "",
      preferredTime: (v, all) =>
        all.bookAppointment && !v ? "Select a time" : "",
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form submitted:", values);

    resetForm();
    setSubmitted(true);
  };

  return (
    <div className="contact">
      <h2 className="contact__title">
        Fill out the form below to get in touch or reserve your appointment
      </h2>

      <form className="modal__form" onSubmit={handleSubmit} noValidate>
        <label className="modal__label">
          Full Name
          <input
            type="text"
            name="fullName"
            className="modal__input"
            placeholder="Full Name"
            value={values.fullName}
            onChange={handleChange}
            required
          />
          {errors.fullName && (
            <span className="modal__error">{errors.fullName}</span>
          )}
        </label>
        <label className="modal__label">
          Email Address
          <input
            type="email"
            name="email"
            className="modal__input"
            placeholder="you@example.com"
            value={values.email}
            onChange={handleChange}
            required
          />
          {errors.email && <span className="modal__error">{errors.email}</span>}
        </label>
        <label className="modal__label">
          Phone Number
          <input
            type="tel"
            name="phone"
            className="modal__input"
            placeholder="Phone Number"
            value={values.phone}
            onChange={handleChange}
            required
          />
          {errors.phone && <span className="modal__error">{errors.phone}</span>}
        </label>
        <label className="contact__checkbox">
          <input
            type="checkbox"
            name="bookAppointment"
            checked={values.bookAppointment}
            onChange={handleChange}
          />
          Book Appointment
        </label>

        {values.bookAppointment && (
          <div className="contact__details">
            <label className="modal__label">
              Preferred Date
              <input
                type="date"
                name="preferredDate"
                className="modal__input"
                value={values.preferredDate}
                onChange={handleChange}
                required={values.bookAppointment}
              />
              {errors.preferredDate && (
                <span className="modal__error">{errors.preferredDate}</span>
              )}
            </label>
            <label className="modal__label">
              Preferred Time
              <select
                name="preferredTime"
                className="modal__input"
                value={values.preferredTime}
                onChange={handleChange}
                required={values.bookAppointment}
              >
                <option value="">Select Time</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
              {errors.preferredTime && (
                <span className="modal__error">{errors.preferredTime}</span>
              )}
            </label>
          </div>
        )}
        <button type="submit" className="modal__submit" disabled={!isValid}>
          {values.bookAppointment ? "Book" : "Send"}
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
