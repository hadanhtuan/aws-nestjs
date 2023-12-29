import { IRegister, IUser } from '@lib/common/interfaces/auth';
import { DynamoRepository } from '@lib/core/base/repository';
import { UserEntity } from '@lib/core/databases/dynamo/entities';
import {
  InjectTypeDorm,
  TypeDormConnection,
  instanceName,
} from '@lib/module/dynamo';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService extends DynamoRepository {
  constructor(
    @InjectTypeDorm(instanceName)
    private readonly connection: TypeDormConnection,
  ) {
    super();
  }

  async register(payload: IRegister) {
    const item = await this.create(this.connection, UserEntity, payload);
    return item;
  }

  async findUser(payload: Partial<IUser>) {
    const { id, username } = payload;
    const result = await this.findOne(this.connection, UserEntity, {
      id,
      username,
    });

    return result;
  }

  async updateUser(payload: Partial<IUser>) {
    const { id, username } = payload;

    const result = this.update(
      this.connection,
      UserEntity,
      {
        id,
        username,
      },
      payload,
    );

    return result;
  }
  async deleteUser(payload: Partial<IUser>) {
    const { id, username } = payload;
    const result = await this.delete(this.connection, UserEntity, {
      id,
      username,
    });

    return result;
  }
}
