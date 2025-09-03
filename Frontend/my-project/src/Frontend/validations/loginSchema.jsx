import * as yup from "yup";

export const validationLogin = yup.object({
  email: yup
    .string()
    .email("Invalid Email plz correct email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});
