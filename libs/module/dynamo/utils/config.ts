import * as DynamoDB from 'aws-sdk/clients/dynamodb';
import * as AWS from 'aws-sdk';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { DynamoDBModuleOptions } from '../interfaces';

export const createDynamodbClient = (
  options: DynamoDBModuleOptions,
): DynamoDB => {
  AWS.config.update(options.AWSConfig);
  return new DynamoDB(options.dynamoDBOptions);
};

export const createMapper = (dynamoDBClient: DynamoDB): DataMapper =>
  new DataMapper({
    client: dynamoDBClient, // the SDK client used to execute operations
  });

//reference: https://github.com/awslabs/dynamodb-data-mapper-js/blob/master/README.md
