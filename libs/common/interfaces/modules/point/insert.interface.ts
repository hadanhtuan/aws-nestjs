import { PointSource } from '@lib/common/enums';

export interface IPointInsert {
  amount: number;
  reason: string;
  username?: string;
  source?: PointSource;
  memberId?: string;
}
