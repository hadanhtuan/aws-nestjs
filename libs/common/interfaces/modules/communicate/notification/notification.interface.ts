import { ICommunicateSetting } from '@lib/core/databases/mongo';
import { Communicate, Member } from '@lib/core/databases/postgres';
import { IJwtPayload } from '../../auth';

export interface ICommunication
  extends Omit<Communicate, 'setting' | 'fileUrl' | 'author' | 'orders'> {
  fileUrl?: string;
  author: Member | string;
  orders: string[];
  setting: ICommunicateSetting;
}

export interface IGetDetailNotification {
  id: string;
  page: number;
  size: number;
}

export interface IQueryCommunicate extends Communicate, Member {
  deleted: boolean;
  userJwt?: IJwtPayload;
}
