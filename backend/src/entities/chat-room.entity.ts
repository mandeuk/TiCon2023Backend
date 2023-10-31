import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('_chat_room', { schema: 'develop' })
export class ChatRoom {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: 'id' })
  id: number

  @Column('varchar', {
    name: 'first_user_id',
    comment: 'first user id',
    length: 255
  })
  firstUserId: string

  @Column('varchar', {
    name: 'second_user_id',
    comment: 'second user id',
    length: 255
  })
  secondUserId: string

  @Column('datetime', {
    name: 'created_at',
    nullable: true,
    comment: 'create time',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: string | Date | null

  @Column('datetime', {
    name: 'updated_at',
    nullable: true,
    comment: 'update time'
  })
  updatedAt: string | Date | null

  @Column('datetime', {
    name: 'deleted_at',
    nullable: true,
    comment: 'delete time'
  })
  deletedAt: string | Date | null
}
