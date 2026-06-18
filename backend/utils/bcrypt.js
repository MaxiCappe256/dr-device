import * as bcrypt from "bcryptjs";

export const hashedPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  return hashedPassword;
};

export const comparePassword = (password, hashedPassword) => {
  const isEqual = bcrypt.compareSync(password, hashedPassword);
  return isEqual;
};
