import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseSchemaEntity } from '../../base-entity';
import { MemberPostMessage } from './member-post-message.entity';
import { Member } from './member.entity';

@Entity({ name: 'post-message' })
export class PostMessage extends BaseSchemaEntity {
  @Column({ type: 'varchar', nullable: false, length: 20 })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  content: string;

  @Column({
    type: 'timestamptz',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  receiveDate: Date;

  @ManyToOne(() => Member, (member) => member.messagesSent, {
    onDelete: 'SET NULL',
  })
  sender: Member;

  @OneToMany(() => MemberPostMessage, (ref) => ref.postMessage, {
    cascade: ['remove', 'soft-remove'],
    nullable: true,
  })
  memberPostMessage: MemberPostMessage[];
}
