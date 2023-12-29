import { ServiceName } from '@lib/common/enums';
import { IPatternMessage } from '@lib/common/interfaces';
import { BaseGatewayController } from '@lib/core/base';
import { ServiceProviderBuilder } from '@lib/core/message-handler';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { QueryUserDto, RegisterDto, UserDto } from './dto';

@Controller('auth')
@ApiTags('Order Service')
@ApiBearerAuth()
export class AuthController extends BaseGatewayController {
  constructor(private readonly serviceClient: ServiceProviderBuilder) {
    super(AuthController.name, ServiceName.AUTH_SERVICE);
  }

  @Post('register')
  register(@Body() payload: RegisterDto) {
    const functionName = AuthController.prototype.register.name;
    const pattern: IPatternMessage = {
      cmd: this.prefixCmd(functionName),
    };

    const message = { payload };

    return this.serviceClient.sendMessage(
      ServiceName.AUTH_SERVICE,
      message,
      pattern,
    );
  }

  @Post('find-user')
  findUser(@Body() payload: QueryUserDto) {
    const functionName = AuthController.prototype.findUser.name;
    const pattern: IPatternMessage = {
      cmd: this.prefixCmd(functionName),
    };

    const message = { payload };

    return this.serviceClient.sendMessage(
      ServiceName.AUTH_SERVICE,
      message,
      pattern,
    );
  }

  @Post('delete-user')
  deleteUser(@Body() payload: QueryUserDto) {
    const functionName = AuthController.prototype.deleteUser.name;
    const pattern: IPatternMessage = {
      cmd: this.prefixCmd(functionName),
    };

    const message = { payload };

    return this.serviceClient.sendMessage(
      ServiceName.AUTH_SERVICE,
      message,
      pattern,
    );
  }

  @Post('update-user')
  updateUser(@Body() payload: UserDto) {
    const functionName = AuthController.prototype.updateUser.name;
    const pattern: IPatternMessage = {
      cmd: this.prefixCmd(functionName),
    };

    const message = { payload };

    return this.serviceClient.sendMessage(
      ServiceName.AUTH_SERVICE,
      message,
      pattern,
    );
  }
}
