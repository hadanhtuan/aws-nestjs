import { Module } from '@nestjs/common';
import { AppController } from './auth.controller';
import { AppService } from './auth.service';

@Module({
  imports: [
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
