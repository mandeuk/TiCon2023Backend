import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('_chat', { schema: 'develop' })
export class Chat {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: 'id' })
  id: number

  @Column('varchar', { name: 'user_id', comment: 'user id', length: 255 })
  userId: string

  @Column('varchar', { name: 'to_user_id', comment: 'to user id', length: 255 })
  toUserId: string

  @Column('varchar', { name: 'type', comment: 'type', length: 255 })
  type: string

  @Column('varchar', { name: 'message', comment: 'message', length: 255 })
  message: string

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
