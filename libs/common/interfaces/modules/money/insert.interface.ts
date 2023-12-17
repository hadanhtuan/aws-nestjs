import { MoneyLogSource } from '@lib/common/enums';
import { Member } from '@lib/core/databases/postgres';

export interface IMoneyInsert {
  amount: number;
  username?: string;
  memberId?: string;
  reason: string;
  source?: MoneyLogSource;
  member?: Member;
}
