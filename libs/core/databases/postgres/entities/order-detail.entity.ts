import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseSchemaEntity } from '../../base-entity';
import { GameDetail } from './game-detail.entity';
import { GameType } from './game-type.entity';
import { Order } from './order.entity';

enum OrderState {
  Pending = 'PENDING',
  Processing = 'PROCESSING',
  Canceled = 'CANCELED',
  Rejected = 'REJECTED',
  Failed = 'FAILED',
}

enum OrderDetailResult {
  Win = 'WIN',
  Lost = 'LOST',
  Draw = 'DRAW',
  Canceled = 'CANCELED',
  Waiting = 'WAITING',
}

enum BettingSlipType {
  Bonus = 'BONUS',
  Game = 'GAME',
}
@Entity({ name: 'order-detail' })
export class OrderDetail extends BaseSchemaEntity {
  @Column({
    type: 'enum',
    nullable: false,
    enum: OrderDetailResult,
    default: OrderDetailResult.Waiting,
  })
  result: OrderDetailResult;

  @Column({
    type: 'enum',
    nullable: false,
    enum: OrderState,
    default: OrderState.Pending,
  })
  state: OrderState;

  @Column({
    type: 'enum',
    enum: BettingSlipType,
    default: BettingSlipType.Game,
  })
  type: BettingSlipType;

  @Column({ type: 'numeric', default: 0 })
  odds: number;

  @Column({ type: 'numeric', nullable: true })
  bonusQuantity: number;

  @Column({ type: 'numeric', default: 0 })
  handicap: number;

  @Column({ type: 'varchar', nullable: true })
  gameTypeName: string;

  @Column({ type: 'varchar', nullable: true })
  title: string;

  @Column({ type: 'varchar', nullable: true })
  gameSet: string;

  @ManyToOne(() => GameDetail, (gameDetail) => gameDetail.orderDetails, {
    onDelete: 'SET NULL',
  })
  gameDetail: GameDetail;

  @ManyToOne(() => Order, (order) => order.details, {
    onDelete: 'SET NULL',
  })
  order: Order;

  @ManyToOne(() => GameType, (gameType) => gameType.orderDetails, {
    onDelete: 'SET NULL',
  })
  gameType: GameType;
}
