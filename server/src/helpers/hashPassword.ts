import * as bcrypt from "bcryptjs";

export const encriptPassoword = async (password: string): Promise<string> => {
  const genHash = await bcrypt.hash(password, 9);
  return genHash;
};

export const comparePassword = async (
  pasword: string,
  hash: string,
): Promise<boolean> => {
  return await bcrypt.compare(pasword, hash);
};
