import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('_matching', { schema: 'develop' })
export class Matching {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: 'id' })
  id: number

  @Column('varchar', { name: 'host_id', comment: 'first user id', length: 255 })
  hostId: string

  @Column('varchar', {
    name: 'guest_id',
    comment: 'second user id',
    length: 255
  })
  guestId: string

  @Column('varchar', {
    name: 'host_accept',
    nullable: true,
    comment: 'first user id',
    length: 255
  })
  hostAccept: string | null

  @Column('varchar', {
    name: 'guest_accept',
    nullable: true,
    comment: 'second user id',
    length: 255
  })
  guestAccept: string | null

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
