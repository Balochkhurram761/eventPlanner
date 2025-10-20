import jwt from "jsonwebtoken";

export const genertetoken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
      isApproved: user.isApproved,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};
