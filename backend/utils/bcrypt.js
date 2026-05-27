import * as bcrypt from "bcryptjs";

export const hashedPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  return hashedPassword;
};

export const comparePassword = async (password, hashedPassword) => {
  const isEqual = await bcrypt.compare(password, hashedPassword);
  return isEqual;
};
