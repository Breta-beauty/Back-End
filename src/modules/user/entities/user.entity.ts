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

  // @Field()
  // @Column({ type: 'varchar', length: 150, unique: true })
  // username: string;

  @Field()
  @Column({ type: 'varchar', length: 150 })
  full_name: string;

  @Field()
  @Column({ type: 'varchar', length: 150, unique: true })
  email: string;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Field()
  @Column({ type: 'varchar', length: 50, unique: true })
  cellphone: string;

  @Field({ nullable: true })
  @Column({ type: 'date', nullable: true })
  birthday: Date;

  @Field({ nullable: true })
  @Column({ type: 'varchar', default: 'undetermined' })
  gender: 'male' | 'female' | 'undetermined' = 'undetermined';

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 20, default: 'customer' })
  type: 'salon' | 'customer';

  @Field({ nullable: true })
  @Column({ type: 'boolean', default: false })
  is_Verified: boolean;

  @Field(() => Profile)
  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_At: Date;

  @Field(() => GraphQLISODateTime)
  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_At: Date;
}
