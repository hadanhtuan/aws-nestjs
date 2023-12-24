import { DataMapper, DynamoDbTable } from '@aws/dynamodb-data-mapper';
import { DynamoDBClass } from '@lib/module/dynamo';
import { DynamoDB } from 'aws-sdk';
import { unmarshallItem } from '@aws/dynamodb-data-marshaller';
import { ConfigService } from '@nestjs/config';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

type instanceOfDynamoDBClass = InstanceType<DynamoDBClass>;

export class DynamoRepository {
  constructor(configService: ConfigService) {
    const { config, dynamodb } = configService.get('aws');

    this.dynamoDBClient = new DynamoDB.DocumentClient(dynamodb);
    this.mapper = new DataMapper({
      client: new DynamoDB(config), // the SDK client used to execute operations
    });
    // mapper.ensureTableExists(dynamoDBClass, tableOptions);
  }

  protected dynamoDBClient: DocumentClient = null;
  protected mapper: DataMapper = null;

  async create(
    schema: DynamoDBClass,
    input: Partial<DynamoDBClass>,
  ): Promise<DynamoDBClass> {
    const toSave = Object.assign(new schema(), input);
    return this.mapper.put(toSave);
  }

  getKeys = (schema: any): Record<string, string> => {
    let hash: string = '';
    let range: string = '';

    for (const prop in schema) {
      if (schema[prop].keyType === 'HASH') hash = prop;
      if (schema[prop].keyType === 'RANGE') range = prop;

      if (hash && range) return { range, hash };
    }

    return { range, hash };
  };

  async find(
    schema: DynamoDBClass | any,
    input?: Partial<DynamoDBClass>,
    options: any = {},
  ): Promise<DynamoDBClass[]> {
    const parsedObj = this.parseObject(schema, input, options);
    console.log('parsed', parsedObj);
    let lastKey = null;
    const result = await this.fetchItems(parsedObj);
    const items = result.Items;
    lastKey = result.LastEvaluatedKey;

    console.log('dynamo', lastKey);
    const count = options.count ?? 50;
    while (lastKey && items?.length < count) {
      parsedObj.ExclusiveStartKey = lastKey;
      const newResult: DynamoDB.QueryOutput = await this.fetchItems(parsedObj);
      const newItems = newResult.Items;
      lastKey = newResult.LastEvaluatedKey;

      items.push(...newItems);
    }

    return items.slice(0, count).map((item) => unmarshallItem(schema, item));
  }

  getValueType(value): string {
    if (Array.isArray(value)) {
      const arrayValue = value[0];
      if (typeof arrayValue === 'number') {
        //TODO
        return 'NS';
      } else {
        return 'SS';
      }
    } else if (typeof value === 'string') {
      return 'S';
    } else if (typeof value === 'number') {
      return 'N';
    } else if (typeof value === 'boolean') {
      return 'BOOL';
    }
    //TODO
    return '';
  }

  clearValue(value) {
    return value
      .replace(/AND /g, '')
      .replace(/OR /g, '')
      .replace(/LIKE /g, '')
      .replace(/STARTSWITH /g, '');
  }

  generateCondition(key, value) {
    if (value.indexOf('LIKE') > -1) {
      return `contains(${key}, :${key}Value)`;
    } else if (value.indexOf('STARTSWITH') > -1) {
      return `begins_with(${key}, :${key}Value)`;
    } else {
      return `${key} = :${key}Value`;
    }
  }

  generateValue(schema: DynamoDBClass, value, attr) {
    if (Array.isArray(value)) {
      if (schema[attr].type === 'Collection') {
        let temp = '(';
        for (let i = 0; i < value.length; i++) {
          if (i === 0) {
            temp += `contains(${attr}, :${attr}Value${i})`;
          } else {
            temp += ` OR contains(${attr}, :${attr}Value${i})`;
          }
        }
        temp += ')';
        return temp;
      } else {
        let temp = '(';
        for (let i = 0; i < value.length; i++) {
          if (i === 0) {
            temp += `${attr} = :${attr}Value${i}`;
          } else {
            temp += ` OR ${attr} = :${attr}Value${i}`;
          }
        }
        temp += ')';
        return temp;
      }
    }
    return value;
  }

  checkCondition(value: any) {
    if (Array.isArray(value)) {
      return 'AND';
    }
    if (value.startsWith('OR')) {
      return 'OR';
    }
    return 'AND';
  }

  parseObject = (schema: DynamoDBClass, input, options): any => {
    const keys = Object.keys(input);
    const table = schema.prototype[DynamoDbTable];

    let obj: any = {
      TableName: table,
      FilterExpression: '',
      IndexName: `${table.charAt(0).toUpperCase() + table.slice(1)}Index`,
    };
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (Array.isArray(input[key])) {
        for (let j = 0; j < input[key].length; j++) {
          obj = {
            ...obj,
            ExpressionAttributeValues: {
              ...obj.ExpressionAttributeValues,
              [`:${key}Value${j}`]: {
                [this.getValueType(this.clearValue(input[key][j]))]:
                  input[key][j],
              },
            },
          };
        }
        //TODO run function for contains
        obj = {
          ...obj,
          FilterExpression: `${obj.FilterExpression} ${this.checkCondition(
            input[key],
          )} ${this.generateValue(schema, input[key], key)}`,
        };
      } else if (schema[key].type === 'Collection') {
        obj = {
          ...obj,
          ExpressionAttributeValues: {
            ...obj.ExpressionAttributeValues,
            [`:${key}Value`]: {
              [this.getValueType(input[key])]: this.clearValue(input[key]),
            },
          },
          FilterExpression: `${obj.FilterExpression} ${this.checkCondition(
            input[key],
          )} contains(${key}, :${key}Value)`,
        };
      } else {
        //there
        obj = {
          ...obj,
          ...(schema[key].indexKeyConfigurations &&
          schema[key].indexKeyConfigurations[
            `${table.charAt(0).toUpperCase() + table.slice(1)}Index`
          ] === 'HASH'
            ? {
                KeyConditionExpression: `${key} = :${key}Value`,
                ScanIndexForward: false,
              }
            : {
                FilterExpression: `${
                  obj.FilterExpression
                } ${this.checkCondition(input[key])} ${this.generateCondition(
                  key,
                  input[key],
                )}`,
              }),
          ExpressionAttributeValues: {
            ...obj.ExpressionAttributeValues,
            [`:${key}Value`]: {
              [this.getValueType(input[key])]: this.clearValue(input[key]),
            },
          },
        };
      }
    }

    obj.FilterExpression = obj.FilterExpression.split(' ').splice(2).join(' ');

    if (options?.limit) {
      obj = { ...obj, Limit: options?.limit };
    }
    if (options?.pageSize) {
      obj = { ...obj, PageSize: options?.pageSize };
    }
    if (options?.lastEvaluatedKey) {
      obj = { ...obj, ExclusiveStartKey: options?.lastEvaluatedKey };
    }

    for (const key in obj) {
      if (
        (typeof obj[key] === 'string' || obj[key] instanceof String) &&
        obj[key].trim() === ''
      ) {
        obj[key] = undefined;
      }
    }

    return obj;
  };

  async fetchItems(parsedObj): Promise<DynamoDB.QueryOutput> {
    const result: DynamoDB.QueryOutput = await new Promise(
      (resolve, reject) => {
        if ('KeyConditionExpression' in parsedObj) {
          return this.dynamoDBClient.query(parsedObj, (err, data) => {
            if (err) reject(err);
            resolve(data);
          });
        } else {
          return this.dynamoDBClient.scan(parsedObj, (err, data) => {
            if (err) reject(err);
            resolve(data);
          });
        }
      },
    );
    return result;
  }
}
