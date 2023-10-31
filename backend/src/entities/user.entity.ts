import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Index('account', ['account'], { unique: true })
@Entity('_user', { schema: 'develop' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: 'id' })
  id: number;

  @Column('varchar', { name: 'sign_type', comment: 'sign type', length: 255 })
  signType: string;

  @Column('varchar', {
    name: 'account',
    unique: true,
    comment: 'account',
    length: 255
  })
  account: string;

  @Column('varchar', { name: 'password', comment: 'password', length: 255 })
  password: string;

  @Column('varchar', { name: 'name', comment: 'username', length: 255 })
  name: string;

  @Column('varchar', { name: 'gender', comment: 'gender', length: 255 })
  gender: string;

  @Column('varchar', { name: 'birth', comment: 'birth', length: 255 })
  birth: string;

  @Column('varchar', {
    name: 'profile_image',
    nullable: true,
    comment: 'profile image',
    length: 255
  })
  profileImage: string | null;

  @Column('datetime', {
    name: 'created_at',
    nullable: true,
    comment: 'create time',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: string | Date | null;

  @Column('datetime', {
    name: 'updated_at',
    nullable: true,
    comment: 'update time'
  })
  updatedAt: string | Date | null;

  @Column('datetime', {
    name: 'deleted_at',
    nullable: true,
    comment: 'delete time'
  })
  deletedAt: string | Date | null;
}
