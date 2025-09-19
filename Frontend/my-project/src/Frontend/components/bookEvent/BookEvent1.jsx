import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
} from "@mui/material";

const steps = ["User Details", "Event Details", "Finish"];

const BookEvent1 = () => {
  const [date, setDate] = useState(new Date());
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [activeStep, setActiveStep] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    // simple validation
    if (
      activeStep === 0 &&
      (!formData.name || !formData.email || !formData.phone)
    ) {
      alert("⚠️ Please fill in all required fields!");
      return;
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleFinish = () => {
    alert(
      `🎉 Booking Confirmed!\n\nName: ${formData.name}\nEmail: ${
        formData.email
      }\nPhone: ${formData.phone}\nMessage: ${
        formData.message
      }\nDate: ${date.toDateString()}`
    );
    // reset
    setFormData({ name: "", email: "", phone: "", message: "" });
    setDate(new Date());
    setActiveStep(0);
  };

  return (
    <div className="p-6 bg-gray-100 rounded-xl shadow-md w-[500px] mx-auto mt-10">
      <Typography variant="h5" className="mb-4 font-bold text-gray-800">
        Book Your Event
      </Typography>

      {/* Stepper */}
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div className="mt-6">
        {activeStep === 0 && (
          <div className="flex flex-col gap-4">
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {activeStep === 1 && (
          <div className="flex flex-col gap-4">
            <TextField
              label="Message"
              name="message"
              multiline
              rows={3}
              value={formData.message}
              onChange={handleChange}
            />
            <Calendar onChange={setDate} minDate={new Date()} value={date} />
            <Typography className="text-center">
              Selected Date:{" "}
              <span className="text-red-600">{date.toDateString()}</span>
            </Typography>
          </div>
        )}

        {activeStep === 2 && (
          <div className="p-4 text-gray-700">
            <Typography variant="h6" className="font-bold mb-2">
              Review your details:
            </Typography>
            <p>
              <b>Name:</b> {formData.name}
            </p>
            <p>
              <b>Email:</b> {formData.email}
            </p>
            <p>
              <b>Phone:</b> {formData.phone}
            </p>
            <p>
              <b>Message:</b> {formData.message}
            </p>
            <p>
              <b>Date:</b> {date.toDateString()}
            </p>
          </div>
        )}
      </div>

      {/* Stepper Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          variant="outlined"
        >
          Back
        </Button>

        {activeStep === steps.length - 1 ? (
          <Button variant="contained" color="primary" onClick={handleFinish}>
            Finish
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleNext}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default BookEvent1;
