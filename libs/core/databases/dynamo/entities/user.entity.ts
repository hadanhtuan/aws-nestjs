import { Attribute, Entity, Table } from '@typedorm/common';
import { DynamoBaseEntity } from './base.entity';

@Entity({
  name: 'user', // name of the entity that will be added to each item as an attribute
  primaryKey: {
    partitionKey: '{{id}}',
    sortKey: '{{username}}',
  },
  // indexes: {
  //   // specify GSI1 key - "GSI1" named global secondary index needs to exist in above table declaration
  //   GSI1: {
  //     partitionKey: 'USER#{{id}}',
  //     sortKey: 'USER#{{id}}#STATUS#{{status}}',
  //     type: INDEX_TYPE.GSI,
  //   },
  // },
})
export class UserEntity extends DynamoBaseEntity {
  @Attribute()
  username: string;

  @Attribute()
  age: number;

  @Attribute()
  email: string;

  @Attribute()
  password: string;
}

export const userTable = new Table({
  name: 'user',
  partitionKey: 'id',
  sortKey: 'username',
  // indexes: {
  //   GSI1: {
  //     type: INDEX_TYPE.GSI,
  //     partitionKey: 'GSI1PK',
  //     sortKey: 'GSI1SK',
  //   },
  // },
});
