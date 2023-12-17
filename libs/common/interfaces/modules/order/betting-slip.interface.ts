import {
  BettingSlip,
  GameDetail,
  Member,
  MemberGameConfig,
  MemberGameType,
} from '@lib/core/databases/postgres';

export interface IPayloadGetMemberBettingSlips {
  memberId?: string;
  gameTypeId: string;
}

export interface IPayloadCreateBettingSlip
  extends IPayloadGetMemberBettingSlips {
  gameDetailId: string;
  bonusId?: string;
  gameTypeName: string;
  betTypeId?: string;
  marketId: string;
  title: string;
  gameSet: string;
  gameFeedId: string;
}

export interface IPayloadClearSlips extends IPayloadGetMemberBettingSlips {
  except?: boolean;
}

export interface IMaxBetWinning {
  maxBetAmount: number;
  maxWinningAmount: number;
}

export interface IBettingSlipCart extends IMaxBetWinning {
  slips: BettingSlip[];
  totalOdds: number;
}

export interface IMemberSlip extends Member {
  gameConfig: MemberGameConfig;
  slips: BettingSlip[];
  existedSlip: BettingSlip | null;
  memberGameTypeConfig: MemberGameType;
}

export interface IQueryMemberSlip {
  memberId: string;
  gameTypeId?: string;
  marketId?: string;
  memberGameTypeConfig?: boolean;
  listing?: boolean;
  gameFeedId?: string;
}

export interface IUpdateSlip {
  member: Member;
  slip: BettingSlip;
  gameDetail: GameDetail;
  isApplyMemberConfig: boolean;
  title?: string;
  gameSet?: string;
}
