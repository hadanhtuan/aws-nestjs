import { Deposit, Member, Withdrawal } from '@lib/core/databases/postgres';
import { IJwtPayload } from '../auth';

export interface IApproveDeposit {
  id: string;
  request: IJwtPayload;
}

export interface IRemoveBankCheck {
  listId: string[];
}

export interface IQueryFieldDeposit extends Deposit, Member {
  memberId: string;
  recommenderUsername: string;
}

export interface IQueryFieldWithdraw extends Withdrawal, Member {
  memberId: string;
  recommenderUsername: string;
}

export interface ICheckAttendance {
  memberId: string;
  username: string;
  date: Date;
}

export interface IDeleteDeposit {
  memberId: string;
  depositId: string;
}
