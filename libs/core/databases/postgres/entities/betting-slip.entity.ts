import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { BaseSchemaEntity } from '../../base-entity';
import { GameDetail } from './game-detail.entity';
import { GameType } from './game-type.entity';
import { GameFeed } from './game.entity';
import { Market } from './market.entity';
import { Member } from './member.entity';

enum BettingSlipType {
  Bonus = 'BONUS',
  Game = 'GAME',
}

@Index(['member', 'gameType', 'gameTypeName', 'gameSet'], { unique: true })
@Entity({ name: 'betting-slip' })
export class BettingSlip extends BaseSchemaEntity {
  @Column({ type: 'numeric', nullable: false })
  odds: number;

  @Column({ type: 'numeric', nullable: true })
  handicap?: number;

  @Column({ type: 'varchar', nullable: true, default: null })
  betTypeId: string;

  @Column({ type: 'varchar', nullable: true })
  gameTypeName: string;

  @Column({ type: 'varchar', nullable: true })
  title: string;

  @Column({ type: 'varchar', nullable: true })
  gameSet: string;

  @Column({ type: 'varchar', nullable: true })
  bonusId: string;

  @Column({ type: 'int', nullable: true })
  quantity: number;

  @Column({
    type: 'enum',
    enum: BettingSlipType,
    default: BettingSlipType.Game,
  })
  slipType: BettingSlipType;

  @ManyToOne(() => Market, (market) => market.bettingSlips, {
    onDelete: 'SET NULL',
  })
  market: Market;

  @ManyToOne(() => GameType, (gameType) => gameType.bettingSlips, {
    onDelete: 'SET NULL',
  })
  gameType: GameType;

  @ManyToOne(() => GameFeed, (gameFeed) => gameFeed.bettingSlips, {
    onDelete: 'SET NULL',
  })
  gameFeed: GameFeed;

  @ManyToOne(() => GameDetail, (gameDetail) => gameDetail.bettingSlips, {
    onDelete: 'SET NULL',
  })
  gameDetail: GameDetail;

  @ManyToOne(() => Member, (member) => member.bettingSlips, {
    onDelete: 'SET NULL',
  })
  member: Member;
}
