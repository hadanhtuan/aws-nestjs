import { SOCKET_IO_CLIENT, SOCKET_OPTIONS } from '@lib/common/constants';
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { ISocketAsyncOption } from './interfaces';
import { EventLoaderService } from './services/event-loader.service';

@Module({})
export class SocketClientModule {
  static forRootAsync(options: ISocketAsyncOption): DynamicModule {
    const asyncOption = this.createAsyncOptionsProvider(options);
    return {
      module: SocketClientModule,
      global: true,
      imports: [DiscoveryModule],
      providers: [EventLoaderService, ...asyncOption],
      exports: [SOCKET_IO_CLIENT],
    };
  }

  private static createAsyncOptionsProvider(
    options: ISocketAsyncOption,
  ): Provider[] {
    return [
      {
        provide: SOCKET_OPTIONS,
        useFactory: async (...args: any[]) => {
          const config = await options.useFactory(...args);

          return config;
        },
        inject: options.inject || [],
      },
      {
        provide: SOCKET_IO_CLIENT,
        useFactory: async (...args: any[]) => {
          const config = await options.useFactory(...args);
          const { io } = await import('socket.io-client');

          return io(config.url, config);
        },
        inject: options.inject || [],
      },
    ];
  }
}
