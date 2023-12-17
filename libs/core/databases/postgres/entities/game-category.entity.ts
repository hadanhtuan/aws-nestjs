import { Column, Entity, OneToMany } from 'typeorm';
import { BaseSchemaEntity } from '../../base-entity';
import { GameType } from './game-type.entity';

@Entity({ name: 'game-category' })
export class GameCategory extends BaseSchemaEntity {
  @Column({ type: 'varchar', nullable: true, unique: true })
  name: string;

  @OneToMany(() => GameType, (gameType) => gameType.gameCategory, {
    onDelete: 'SET NULL',
  })
  gameType: GameType[];
}
