import { SocketEvent } from '@lib/common/enums';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Catch()
export class WebsocketFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const socket: Socket = host.switchToWs().getClient();

    const wsException = new WsException(exception.message);
    socket.emit(SocketEvent.Exception, wsException.getError());
  }
}
