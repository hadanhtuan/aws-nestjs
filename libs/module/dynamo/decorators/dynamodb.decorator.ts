import { Inject } from '@nestjs/common';
import { getTypeDormConnectionToken } from '../utils';

export const InjectTypeDorm = (name?: string) => {
  return Inject(getTypeDormConnectionToken(name));
};
