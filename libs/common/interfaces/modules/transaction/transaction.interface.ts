import { TimeFilterDto } from '@lib/utils/validation-pipe';

export interface ISumMoney {
  memberId: string;
  startTime?: Date | string;
  endTime?: Date | string;
}

export interface IGetHistory extends TimeFilterDto {
  memberId: string;
}

export interface IExchangePassword {
  memberId: string;
  exchangePassword: string;
}

export interface ICheckExchangePassResult {
  status: boolean;
  depositMessage?: string;
}

export interface IAmount {
  amount: number;
}

export interface ITransactionConfig {
  minAmountDeposit: number;
  minAmountWithdraw: number;
  depositUnit: number;
  withdrawUnit: number;
  minAmountChangePoint: number;
}
