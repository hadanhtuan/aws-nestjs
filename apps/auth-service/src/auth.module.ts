import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './auth.controller';
import { AppService } from './auth.service';
import { configuration } from '@lib/config/configuration';
import { DynamoDBModule } from '@lib/module/dynamo';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    DynamoDBModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        AWSConfig: {
          region: 'local',
          accessKeyId: 'null',
          secretAccessKey: 'null',
        },
        dynamoDBOptions: {
          endpoint: config.get<string>('DYNAMODB_URL', 'localhost:8000'),
          sslEnabled: false,
          region: 'local-env',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
