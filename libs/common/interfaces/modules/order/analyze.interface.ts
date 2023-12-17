import { Sort } from '@lib/common/enums';
import { IPagination } from '../../request';

export interface IQueryAnalyze {
  startTime: Sort;
  nationName: Sort;
  leagueName: Sort;
  homeTeam: Sort;
  awayTeam: Sort;
  gameTypeName: Sort;
  gameFeedType: Sort;
  marketName: Sort;
  gameDetailName: Sort;
  detailCount: Sort;
  minus: Sort;
  plus: Sort;
  paginate: IPagination;
}
