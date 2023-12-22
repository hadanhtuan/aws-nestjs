import { Injectable } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';
import { DataMapper, QueryIterator } from '@aws/dynamodb-data-mapper';

// Internal.
import { AppConfigService } from '@lib/config';
import { ClassAnnotation } from '@aws/dynamodb-data-mapper-annotations/build/annotationShapes';

// Code.
@Injectable()
export class DynamoRepository {
  private client: DynamoDB;
  public mapper: DataMapper;

  constructor(private configService: AppConfigService) {
    this.client = new DynamoDB({
      region: 'REGION',
    });
    this.mapper = new DataMapper({ client: this.client });
  }

  getEntity(entity: any, data: object) {
    return Object.assign(new entity(), data);
  }

  async put(params: any): Promise<any> {
    return await this.mapper.put(params);
  }

  async scan(domain: any) {
    const response = [];
    for await (const item of this.mapper.scan(domain)) {
      // individual items will be yielded as the scan is performed
      response.push(item);
    }
    return response;
  }

  async delete(item: any): Promise<void> {
    await this.mapper.delete(item);
  }

  async update(item: any): Promise<any> {
    return await this.mapper.update(item);
  }

  async query(
    entity: any,
    query: any,
    options?: {
      indexName?: string;
    },
  ): Promise<QueryIterator<typeof entity>> {
    return await this.mapper.query(entity, query, options);
  }

  async get(entity: any): Promise<typeof entity> {
    return await this.mapper.get(entity);
  }
}
