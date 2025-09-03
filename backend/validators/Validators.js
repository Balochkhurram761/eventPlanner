import * as yup from "yup";

export const uservalidator = yup.object({
  name: yup.string().required("Enter your full name"),

  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format")
    .matches(
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/,
      "Only Gmail or Yahoo emails are allowed"
    ),

  password: yup
    .string()
    .required("Enter password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!]).{6,}$/,
      "Password must include uppercase, lowercase, number, special character & minimum 6 characters"
    ),
});
