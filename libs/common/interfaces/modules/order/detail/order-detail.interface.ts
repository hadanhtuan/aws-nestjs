import { OrderState } from '@lib/common/enums';

export interface IPayloadConfirmCreateOrderDetail {
  status: boolean;
  gameDetailId: string;
  odds: number;
  handicap: number;
}

export interface IPayloadCancelOrderDetail {
  state?: OrderState;
  isAdmin?: boolean;
  orderId: string;
  id?: string;
}
