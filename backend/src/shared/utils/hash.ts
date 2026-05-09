import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12; // FAANG standard for balance between security and speed

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};