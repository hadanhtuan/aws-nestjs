import { ServiceName } from '@lib/common/enums';
import { IMessage } from '@lib/common/interfaces';
import { ILogin, IRegister } from '@lib/common/interfaces/auth';
import { getPattern } from '@lib/utils/helpers';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';

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
  login(message: IMessage<ILogin>) {
    const { payload } = message;
    return this.authService.login(payload);
  }

  @MessagePattern({
    cmd: getPattern(
      AuthController.prefixCmd,
      AuthController.prototype.register.name,
    ),
  })
  register(message: IMessage<IRegister>) {
    const { payload } = message;

    return this.authService.register(payload);
  }

  @MessagePattern({
    cmd: getPattern(
      AuthController.prefixCmd,
      AuthController.prototype.getProfile.name,
    ),
  })
  getProfile(message: IMessage) {
    const { id } = message;

    return this.authService.getProfile(id);
  }
}
