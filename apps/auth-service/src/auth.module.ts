import { configuration } from '@lib/config/configuration';
import { TypeDormModule, instanceName } from '@lib/module/dynamo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserEntity, userTable } from '@lib/core/databases/dynamo/entities';
import { DocumentClientV2 } from '@typedorm/document-client';
import * as AWS from 'aws-sdk';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeDormModule.forRootAsync({
      // need another name here for dependency injection, @InjectTypeDorm(instanceName)
      inject: [ConfigService],
      name: instanceName,
      useFactory: (config: ConfigService) => {
        const awsConfig = config.get('aws.dynamodb');
        console.log(awsConfig);

        return {
          table: userTable,
          name: instanceName,
          entities: [UserEntity],
          documentClient: new DocumentClientV2(
            new AWS.DynamoDB.DocumentClient(awsConfig),
          ),
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
