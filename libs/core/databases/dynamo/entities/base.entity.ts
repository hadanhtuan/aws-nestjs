import {
  AUTO_GENERATE_ATTRIBUTE_STRATEGY,
  AutoGenerateAttribute,
} from '@typedorm/common';

export class DynamoBaseEntity {
  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.UUID4,
  })
  id: string;

  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.ISO_DATE,
  })
  createdAt: number;

  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.ISO_DATE,
    autoUpdate: true, // this will make this attribute and any indexes referencing it auto update for any write operation
  })
  updatedAt: number;
}
