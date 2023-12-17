import { IJwtPayload } from '../auth';

export interface IRejectWithdrawal {
  id: string;
  request: IJwtPayload;
}

export interface ICreateWithdrawal {
  memberId: string;
  amount: number;
  ipAddress: string;
  request: IJwtPayload;
  exchangePassword: string;
}

export interface IRejectWithdrawal {
  request: IJwtPayload;
  id: string;
}

export interface IDeleteWithdrawal {
  memberId: string;
  withdrawalId: string;
}

export type RawMap = Record<
  string,
  {
    id: string;
    rechargeAfterExchange: number;
    lastChargeAmount: number;
    todayAmount: number;
  }
>;
