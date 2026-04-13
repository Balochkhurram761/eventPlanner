import * as Yup from "yup";

export const RegisterValidation = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  role: Yup.string().oneOf(["vendor", "couple"]),

  noOfGuests: Yup.number()
    .nullable()
    .notRequired()
    .when("role", {
      is: "couple",
      then: (schema) => schema.required("Number of guests is required"),
    }),
  coupleContactNo: Yup.string()
    .nullable()
    .notRequired()
    .when("role", {
      is: "couple",
      then: (schema) => schema.required("Contact number is required"),
    }),
  weddingDate: Yup.date()
    .nullable()
    .notRequired()
    .when("role", {
      is: "couple",
      then: (schema) => schema.required("Wedding date is required"),
    }),

  //  Vendor fields
  businessName: Yup.string()
    .nullable()
    .notRequired()
    .when("role", {
      is: "vendor",
      then: (schema) => schema.required("Business name is required"),
    }),
  vendorContactNo: Yup.string()
    .nullable()
    .notRequired()
    .when("role", {
      is: "vendor",
      then: (schema) => schema.required("Contact number is required"),
    }),
  businessAddress: Yup.string()
    .nullable()
    .notRequired()
    .when("role", {
      is: "vendor",
      then: (schema) => schema.required("Business address is required"),
    }),
  reelPageLink: Yup.string()
    .nullable()
    .notRequired()
    .when("role", {
      is: "vendor",
      then: (schema) =>
        schema
          .required("Social media or Reel link is required")
          .url("Invalid URL format! (e.g., https://instagram.com/page)"),
    }),
  registrationLetter: Yup.mixed()
    .nullable()
    .notRequired()
    .when("role", {
      is: "vendor",
      then: (schema) =>
        schema
          .required("Government registration letter is required")
          .test("fileSize", "File size is too large", (value) => {
            return value && value.size <= 2000000;
          }),
    }),
});
