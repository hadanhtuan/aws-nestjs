import {
  attribute,
  rangeKey,
  table,
} from '@aws/dynamodb-data-mapper-annotations';
import { DynamoBaseSchema } from './base.schema';

@table('user')
export class User extends DynamoBaseSchema {
  @rangeKey({ type: 'String' })
  username: string;

  @attribute({ type: 'String' })
  password: string;

  @attribute({ type: 'String' })
  email: string;

  @attribute({ type: 'Number' })
  age: number;
}
