import { DataMapper } from '@aws/dynamodb-data-mapper';
import { ILogin, IRegister } from '@lib/common/interfaces/auth';
import { User } from '@lib/core/databases/dynamo';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as DynamoDB from 'aws-sdk/clients/dynamodb';
import AWS from 'aws-sdk';
import { DynamoRepository } from '@lib/core/base';

@Injectable()
export class AuthService extends DynamoRepository {
  constructor(private configService: ConfigService) {
    super(configService);
  }

  async register(payload: IRegister) {
    const result = await this.create(User, payload);
    return result;
  }

  async login(payload: ILogin) {
    return payload;
  }

  async getUserById(id: string) {
    // get by partition key(query)
    const result = await this.mapper.get(
      Object.assign(new User(), {
        id,
        username: 'string',
      }),
    );

    return result;
  }
}
