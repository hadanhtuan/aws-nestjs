import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseSchemaEntity } from '../../base-entity';
import { Member } from './member.entity';
import { Order } from './order.entity';

enum CommunicateEnum {
  Announcement = 'ANNOUNCEMENT',
  Template = 'TEMPLATE',
  Customer = 'CUSTOMER',
  Event = 'EVENT',
  Popup = 'POPUP',
  Board = 'BOARD',
  Rule = 'RULE',
}

@Entity({ name: 'communicate' })
export class Communicate extends BaseSchemaEntity {
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  content: string;

  @Column({ type: 'enum', enum: CommunicateEnum })
  type: CommunicateEnum;

  @Column({ type: 'varchar', nullable: true })
  fileUrl: string;

  @Column({ type: 'boolean', nullable: false, default: false })
  status: boolean;

  @Column({ type: 'varchar', nullable: true })
  ipAddress: string;

  @Column({
    type: 'timestamptz',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  applyDate: Date;

  @ManyToOne(() => Member, (member) => member.communicates, {
    onDelete: 'SET NULL',
  })
  author: Member;

  @ManyToOne(() => Communicate, (ref) => ref.children, {
    onDelete: 'SET NULL',
  })
  parent: Communicate;

  @OneToMany(() => Communicate, (ref) => ref.parent, {
    onDelete: 'SET NULL',
  })
  children: Communicate[];

  @ManyToMany(() => Order, (ref) => ref.communicates, {
    onDelete: 'SET NULL',
  })
  @JoinTable()
  orders: Order[];
}
