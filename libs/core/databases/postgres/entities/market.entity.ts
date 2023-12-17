import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseSchemaEntity } from '../../base-entity';
import { BettingSlip } from './betting-slip.entity';

export enum MarketType {
  Over = 'OVER',
  Under = 'UNDER',
  OverUnder = 'OVER_UNDER',
  HandiCap = 'HANDICAP',
  WinOrLose = 'WIN_LOSE',
  Other = 'OTHER',
}

enum MarketStatus {
  Deactivate = 0,
  Active = 1,
  Hide = 2,
}

@Index(['name', 'order'])
@Entity({ name: 'market' })
export class Market extends BaseSchemaEntity {
  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  nameKo: string;

  @Column({ type: 'int', default: 0 })
  order: number;

  @Column({ type: 'enum', enum: MarketStatus, default: MarketStatus.Hide })
  status: MarketStatus;

  @Column({ type: 'enum', enum: MarketType, nullable: true })
  type: MarketType;

  @Column({ type: 'int', default: 900 })
  score: number;

  @Column({ type: 'boolean', default: false })
  isUserCustom: boolean; // If true using odds in user custom

  @Column({ type: 'varchar', length: 50, nullable: true })
  marketConfigId: string;

  @OneToMany(() => BettingSlip, (bettingSlips) => bettingSlips.gameType, {
    onDelete: 'SET NULL',
  })
  bettingSlips: BettingSlip[];
}
