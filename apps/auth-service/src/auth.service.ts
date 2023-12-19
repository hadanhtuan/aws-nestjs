import { ILogin, IRegister } from '@lib/common/interfaces/auth';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async register(payload: IRegister) {
    return payload;
  }

  async login(payload: ILogin) {
    return payload;
  }
}
