import { SOCKET_EVENT_METADATA } from '@lib/common/constants';
import { SetMetadata } from '@nestjs/common';

export const OnSocketEvent = (event: string) =>
  SetMetadata(SOCKET_EVENT_METADATA, { event });
