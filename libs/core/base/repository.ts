import {
  DynamoDBClass,
  QueryIndex,
  TypeDormConnection,
} from '@lib/module/dynamo';
import { HttpException, HttpStatus } from '@nestjs/common';
import { EntityManager } from '@typedorm/core';

export class DynamoRepository {
  getEntityManager(connection: TypeDormConnection): EntityManager {
    return connection.entityManager;
  }
  async create(
    connection: TypeDormConnection,
    entity: DynamoDBClass,
    payload: Partial<DynamoDBClass>,
  ): Promise<DynamoDBClass> {
    try {
      const manager = this.getEntityManager(connection);

      const instance = new entity();
      for (const key in payload) instance[key] = payload[key];

      const result = await manager.create<DynamoDBClass>(instance);
      return result;
    } catch (error) {
      throw new HttpException(
        error?.message || null,
        error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    connection: TypeDormConnection,
    entity: DynamoDBClass,
    primaryKey: Partial<DynamoDBClass>,
    payload: Partial<DynamoDBClass>,
  ) {
    try {
      const manager = this.getEntityManager(connection);

      for (const key in primaryKey) delete payload[key];

      const result = await manager.update<
        DynamoDBClass,
        Partial<DynamoDBClass>
      >(entity, primaryKey, payload);

      return result;
    } catch (error) {
      throw new HttpException(
        error?.message || null,
        error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(
    connection: TypeDormConnection,
    entity: DynamoDBClass,
    primaryKey: Partial<DynamoDBClass>,
  ) {
    try {
      const manager = this.getEntityManager(connection);

      const result = await manager.delete<
        DynamoDBClass,
        Partial<DynamoDBClass>
      >(entity, primaryKey);

      return result;
    } catch (error) {
      throw new HttpException(
        error?.message || null,
        error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(
    connection: TypeDormConnection,
    entity: DynamoDBClass,
    primaryKey: Partial<DynamoDBClass>,
  ) {
    try {
      const manager = this.getEntityManager(connection);

      const result = await manager.findOne<
        DynamoDBClass,
        Partial<DynamoDBClass>
      >(entity, primaryKey);

      return result;
    } catch (error) {
      throw new HttpException(
        error?.message || null,
        error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findMany(
    connection: TypeDormConnection,
    entity: DynamoDBClass,
    primaryKey: Partial<DynamoDBClass>,
    index?: QueryIndex,
  ) {
    try {
      const manager = this.getEntityManager(connection);

      const result = await manager.find(entity, primaryKey, index);

      return result;
    } catch (error) {
      throw new HttpException(
        error?.message || null,
        error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
