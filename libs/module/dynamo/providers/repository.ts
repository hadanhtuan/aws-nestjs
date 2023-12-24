import {
  DataMapper
} from '@aws/dynamodb-data-mapper';
import { DynamoDBClass } from '../interfaces';


type instanceOfDynamoDBClass = InstanceType<DynamoDBClass>;

export class GetModelForClass<T extends instanceOfDynamoDBClass> {

  async create(mapper: DataMapper, schema: DynamoDBClass, input: Partial<T>): Promise<T> {
    const toSave = Object.assign(new schema(), input);
    return mapper.put(toSave);
  }
}
