import { IRequestLimit } from '@lib/common/interfaces';
import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { isEmpty } from 'lodash';
import { Observable } from 'rxjs';

@Injectable()
export class SocketRequestInterceptor implements NestInterceptor {
  private limit: number;
  private time: number;
  private readonly tokens: Map<string, { count: number; lastRefill: number }>;
  private configService: ConfigService;

  constructor() {
    this.tokens = new Map();
  }

  setConfig() {
    if (!isEmpty(this.configService)) return;

    this.configService = global.configService;

    const { limit, time }: IRequestLimit =
      this.configService.get('requestLimit');
    this.time = time * 1000;
    this.limit = limit;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.setConfig();

    const client = context.switchToWs().getClient();
    const ip = client.conn.remoteAddress;

    this.refillTokens(ip);

    if (process.env.ENV != 'develop' && !this.hasEnoughTokens(ip)) {
      console.error('too many request');
      client.disconnect();
      throw new HttpException(
        { message: 'Too Many Requests' },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
    if (this.tokens.has(ip)) {
      const tokenInfo = this.tokens.get(ip);
      tokenInfo.count -= 1;
    }
    return next.handle();
  }

  private refillTokens(key: string): void {
    const now = Date.now();

    if (!this.tokens.has(key))
      this.tokens.set(key, { count: this.limit, lastRefill: now });

    const tokenInfo = this.tokens.get(key);
    const elapsed = now - tokenInfo.lastRefill;

    const tokensToAdd = Math.floor(elapsed / this.time) * this.limit;
    const newTokens = Math.min(tokenInfo.count + tokensToAdd, this.limit);

    tokenInfo.count = newTokens;
    tokenInfo.lastRefill = now;
  }

  private hasEnoughTokens(key: string): boolean {
    if (!this.tokens.has(key)) return true;

    return this.tokens.get(key).count > 0;
  }
}
