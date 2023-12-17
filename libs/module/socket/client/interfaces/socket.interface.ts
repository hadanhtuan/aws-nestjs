import { ModuleMetadata } from '@nestjs/common';

export interface ISocket {
  on(event: string, ...params: any[]);
  connect(): ISocket;
  disconnect(): ISocket;
}

export interface ISocketAsyncOption extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (
    ...args: any[]
  ) => Promise<IConnectSocketOptions> | IConnectSocketOptions;
  inject?: any[];
}

export interface IConnectSocketOptions {
  url: string;
  autoConnect?: boolean;
  reconnection?: boolean;
  timeout?: number;
  path?: string;
  multiplex?: boolean;
  randomizationFactor?: number;
  reconnectionDelay?: number;
  reconnectionDelayMax?: number;
}
