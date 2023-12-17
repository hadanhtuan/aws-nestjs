import { DynamicModule, Module } from '@nestjs/common';

import { convertToClassWithOptions } from '../utils/convertToClassWithOptions';
import { DynamoDBCoreModule } from './dynamodb.core.module';
import {
  DynamoDBModuleAsyncOptions,
  DynamoDBModuleOptions,
  DynamoDBInput,
} from '../interfaces';
import { createDynamoDBProvider } from '../providers';

@Module({})
export class DynamoDBModule {
  static forRoot(options: DynamoDBModuleOptions): DynamicModule {
    return {
      module: DynamoDBModule,
      imports: [DynamoDBCoreModule.forRoot(options)],
    };
  }

  static forRootAsync(options: DynamoDBModuleAsyncOptions): DynamicModule {
    return {
      module: DynamoDBModule,
      imports: [DynamoDBCoreModule.forRootAsync(options)],
    };
  }

  static forFeature(models: DynamoDBInput[]): DynamicModule {
    const convertedModels = models.map((model) =>
      convertToClassWithOptions(model),
    );

    const providers = createDynamoDBProvider(convertedModels);

    return {
      module: DynamoDBModule,
      providers,
      exports: providers,
    };
  }
}
