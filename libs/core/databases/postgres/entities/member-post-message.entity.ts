import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseSchemaEntity } from '../../base-entity';
import { Member } from './member.entity';
import { PostMessage } from './post-message.entity';

@Entity({ name: 'member_post_message' })
export class MemberPostMessage extends BaseSchemaEntity {
  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  confirmDate: Date;

  @ManyToOne(() => Member, (member) => member.messagesReceived, {
    onDelete: 'SET NULL',
  })
  receiver: Member;

  @ManyToOne(
    () => PostMessage,
    (postMessage) => postMessage.memberPostMessage,
    {
      onDelete: 'SET NULL',
    },
  )
  postMessage: PostMessage;
}
