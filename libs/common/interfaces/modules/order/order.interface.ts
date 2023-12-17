import { OrderDetailResult, OrderState, Sort } from '@lib/common/enums';
import { GameTypeConfig } from '@lib/core/databases/mongo';
import {
  BettingSlip,
  Member,
  MemberGameType,
} from '@lib/core/databases/postgres';
import { ITimerQuery } from '../../request';

export interface IPayloadConfirmCreateOrder {
  betAmount: number;
  ipAddress?: string;
  memberId?: string;
  gameTypeId: string;
}

export interface IPayloadCreateOrder {
  betAmount: number;
  expectWinning: number;
  ipAddress: string;
  member: Member;
  rate: number;
  slips: BettingSlip[];
  code: string;
}

export interface IOrderFieldsOrder {
  createdAt: Sort;
  expectWinning: Sort;
  betAmount: Sort;
}

export interface IQueryFieldsOrder {
  orderDetailResult: OrderDetailResult;
  orderState: OrderState;
  isAdmin: false;
  marketId: string;
  username: string;
  nickName: string;
  ipAddress: string;
  orderCode: string;
  homeTeam: string;
  awayTeam: string;
  leagueName: string;
  fid: string;
  gameId: string;
  gameTypeId: string[];
  isInterested: boolean;
}

export interface IQueryOrder extends ITimerQuery {
  queryFields: IQueryFieldsOrder;
  orderFields: IOrderFieldsOrder;
}

export interface IModifyMaxBetWinning {
  memberGameTypeConfig: MemberGameType;
  betConfig: GameTypeConfig;
}

export interface IUpdateOrderState {
  state: OrderState;
  ids: string[];
}
