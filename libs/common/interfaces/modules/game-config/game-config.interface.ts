export interface IGameType {
  id?: string;
  name: string;
  nameKo: string;
  order: number;
  isActive: boolean;
  isAutoResult: boolean;
  isAutoRegistration: boolean;
  gameCategoryId?: string;
}

export interface IListGameType {
  data: IGameType[];
}

export interface IBettingSetting {
  gameTypeId: string;
  maxBet1: number;
  maxBet2: number;
  maxBet3: number;
  maxBet4: number;
  maxBet5: number;
  maxWinning1: number;
  maxWinning2: number;
  maxWinning3: number;
  maxWinning4: number;
  maxWinning5: number;
}
