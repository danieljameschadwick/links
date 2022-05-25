import { Transform } from 'class-transformer';
import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const Encrypt = () => {
  return Transform(({ value }) => {
    console.log(value);

    try {
      console.log(bcrypt.hash(value, SALT_ROUNDS));
    } catch (e) {
      console.log(e);
    }

    // return bcrypt.hash(value, SALT_ROUNDS);
    return value;
  }, { toPlainOnly: true });
};
