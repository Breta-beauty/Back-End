import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';

import { Profile } from 'src/modules/profile/entities/profile.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Field()
  @Column('varchar')
  full_name: string;

  @Field()
  @Column('varchar', { unique: true })
  email: string;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Field()
  @Column('varchar', { unique: true })
  cellphone: string;

  @Field({ nullable: true })
  @Column('date', { nullable: true })
  birthday: Date;

  @Field({ nullable: true })
  @Column('varchar', { default: 'undetermined' })
  gender: 'male' | 'female' | 'undetermined';

  @Field({ nullable: true })
  @Column('varchar', { default: 'customer' })
  type: 'owner' | 'customer';

  @Field({ nullable: true })
  @Column('boolean', { default: false })
  is_verified: boolean;

  @Field(() => Profile)
  @OneToOne(() => Profile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Field(() => GraphQLISODateTime)
  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
