import bcrypt from "bcrypt";

export const hashaedpassword = async (password) => {
  const saltrounds = 10;
  const hashpassword = await bcrypt.hash(password, saltrounds);
  return hashpassword;
};

export const comparePassword = async (password, hashaedpassword) => {
  return await bcrypt.compare(password, hashaedpassword);
};
