import { Sort } from '@lib/common/enums';
import {
  IPagination,
  OrderFields,
  QueryFields,
} from '@lib/common/interfaces/request';
import { Member, PostMessage } from '@lib/core/databases/postgres';

export interface ICreatePostMessage
  extends Omit<Partial<PostMessage>, 'receiver' | 'sender'> {
  receivers: string[];
  sender?: string;
}

export interface IQueryFieldsPostMessage extends QueryFields<PostMessage> {
  nickName: string;
  username: string;
}

export interface IOrderFieldsPostMessage extends OrderFields<PostMessage> {
  username: Sort;
  level: Sort;
  nickName: Sort;
  confirmDate: Sort;
}

export interface IQueryPostMessage extends IPagination {
  queryFields: IQueryFieldsPostMessage;
  orderFields: IOrderFieldsPostMessage;
}

export interface IListingPostMessage {
  id: string;
  confirmDate: Date;
  postMessageId: string;
  createdAt: Date;
  title: string;
  content: string;
  receiveDate: Date;
  receiver?: Partial<Member>;
}
