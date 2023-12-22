import { DataMapper } from '@aws/dynamodb-data-mapper';
import { ILogin, IRegister } from '@lib/common/interfaces/auth';
import { User } from '@lib/core/databases/dynamo';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as DynamoDB from 'aws-sdk/clients/dynamodb';

@Injectable()
export class AuthService {
  private mapper: DataMapper;
  constructor(private configService: ConfigService) {
    const awsConfig = this.configService.get('aws.config');
    console.log(awsConfig);

    this.mapper = new DataMapper({
      client: new DynamoDB(awsConfig), // the SDK client used to execute operations
    });
  }

  async register(payload: IRegister) {
    const entity = Object.assign(new User(), payload);

    const result = await this.mapper.put(entity);
    return result;
  }

  async login(payload: ILogin) {
    return payload;
  }

  async getProfile(id: string) {
    //get by partition key(query)
    // const result = await this.mapper.get(
    //   Object.assign(new User(), {
    //     id,
    //     username: 'string',
    //   }),
    // );

    const usersIterator = this.mapper.scan(User, {
      filter: {
        type: 'And',
        conditions: [
          new ConditionExpression('username', 'eq', 'john')
        ]
      }
    });
    return result;
    }
  }
}
