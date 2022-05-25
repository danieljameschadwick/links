import { Transform } from 'class-transformer';
import { encrypt } from '@src/util/encrypt';

export const EncryptDecorator = () => {
  return Transform(({ value }) => {
    return encrypt(value);
  });
};
