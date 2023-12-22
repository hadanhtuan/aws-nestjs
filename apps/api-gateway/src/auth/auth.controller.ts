import { ServiceName } from '@lib/common/enums';
import { IPatternMessage } from '@lib/common/interfaces';
import { BaseGatewayController } from '@lib/core/base';
import { ServiceProviderBuilder } from '@lib/core/message-handler';
import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginDto, RegisterDto } from './dto';

@Controller('auth')
@ApiTags('Order Service')
@ApiBearerAuth()
export class AuthController extends BaseGatewayController {
  constructor(private readonly serviceClient: ServiceProviderBuilder) {
    super(AuthController.name, ServiceName.AUTH_SERVICE);
  }

  @Post('login')
  login(@Body() payload: LoginDto) {
    const functionName = AuthController.prototype.login.name;
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

  @Post('profile/:id')
  getProfile(@Param('id') id: string) {
    const functionName = AuthController.prototype.getProfile.name;
    const pattern: IPatternMessage = {
      cmd: this.prefixCmd(functionName),
    };

    const message = { id };

    return this.serviceClient.sendMessage(
      ServiceName.AUTH_SERVICE,
      message,
      pattern,
    );
  }
}
