import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { getPattern } from '@lib/utils/helpers';
import { ServiceName } from '@lib/common/enums';
import { IMessage } from '@lib/common/interfaces';
import { ILogin, IRegister } from '@lib/common/interfaces/auth';

@Controller()
export class AuthController {
  static prefixCmd = [ServiceName.AUTH_SERVICE, AuthController.name];
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({
    cmd: getPattern(
      AuthController.prefixCmd,
      AuthController.prototype.login.name,
    ),
  })
  login(message: IMessage<ILogin>): string {
    const { payload } = message;
    return this.authService.login(payload);
  }

  @MessagePattern({
    cmd: getPattern(
      AuthController.prefixCmd,
      AuthController.prototype.register.name,
    ),
  })
  register(message: IMessage<IRegister>): string {
    const { payload } = message;

    return this.authService.register(payload);
  }
}
