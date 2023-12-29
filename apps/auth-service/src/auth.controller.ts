import { ServiceName } from '@lib/common/enums';
import { IMessage } from '@lib/common/interfaces';
import { ILogin, IRegister, IUser } from '@lib/common/interfaces/auth';
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
      AuthController.prototype.updateUser.name,
    ),
  })
  updateUser(message: IMessage<ILogin>) {
    const { payload } = message;
    return this.authService.updateUser(payload);
  }

  @MessagePattern({
    cmd: getPattern(
      AuthController.prefixCmd,
      AuthController.prototype.deleteUser.name,
    ),
  })
  deleteUser(message: IMessage<ILogin>) {
    const { payload } = message;
    return this.authService.deleteUser(payload);
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
      AuthController.prototype.findUser.name,
    ),
  })
  findUser(message: IMessage<IUser>) {
    const { payload } = message;

    return this.authService.findUser(payload);
  }
}
