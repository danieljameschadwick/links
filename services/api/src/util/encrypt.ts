import * as bcrypt from 'bcrypt';

const ROUNDS = 10;

export const encrypt = (string: string): string => {
  const salt = bcrypt.genSaltSync(ROUNDS);

  return bcrypt.hashSync(string, salt);
};
