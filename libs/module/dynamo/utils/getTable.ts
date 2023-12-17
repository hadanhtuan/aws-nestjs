import { DynamoDbTable } from '@aws/dynamodb-data-mapper'
import { DynamoDBClass } from '../interfaces'

export const getTable = (dynamoDBClass: DynamoDBClass): string =>
  dynamoDBClass.prototype[DynamoDbTable]
