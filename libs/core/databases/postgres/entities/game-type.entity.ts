import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseSchemaEntity } from '../../base-entity';
import { BettingSlip } from './betting-slip.entity';
import { GameCategory } from './game-category.entity';
import { MemberGameType } from './member-game-type.entity';
import { OrderDetail } from './order-detail.entity';

@Entity({ name: 'game-type' })
export class GameType extends BaseSchemaEntity {
  @Column({ type: 'varchar', nullable: true, default: null })
  key: string;

  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  nameKo: string;

  @Column({ type: 'numeric', nullable: true, default: 0 })
  order: number;

  @Column({ type: 'boolean', nullable: true })
  isActive: boolean;

  @Column({ type: 'boolean', nullable: true })
  isAutoResult: boolean;

  @Column({ type: 'boolean', nullable: true })
  isAutoRegistration: boolean;

  @Column({ type: 'varchar', nullable: true, default: null })
  publisherId: string;

  @Column({ type: 'varchar', nullable: true, default: null })
  route: string;

  @Column({ type: 'uuid' })
  gameCategoryId: string;

  @ManyToOne(() => GameCategory, (gameCategory) => gameCategory.gameType, {
    onDelete: 'SET NULL',
  })
  gameCategory: GameCategory;

  @OneToMany(() => MemberGameType, (memberGameType) => memberGameType.member, {
    onDelete: 'SET NULL',
  })
  memberGameTypes: MemberGameType[];

  @OneToMany(() => BettingSlip, (bettingSlips) => bettingSlips.gameType, {
    onDelete: 'SET NULL',
  })
  bettingSlips: BettingSlip[];

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.gameType, {
    onDelete: 'SET NULL',
  })
  orderDetails: OrderDetail[];
}
