import { ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'profiles' })
@ObjectType()
export class Profile {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  profile_id: string;

  @Field()
  @Column({ type: 'varchar', length: 150 })
  full_name: string;

  @Field()
  @Column({ type: 'varchar', length: 50, unique: true })
  cellphone: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  description: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  wallpaper: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  profile_picture: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  location: string;

  @Field({ nullable: true })
  @Column({ type: 'date', nullable: true })
  birthday: Date;

  @Field({ nullable: true })
  @Column({ type: 'varchar', default: 'undetermined' })
  gender: string;

  @Field(() => User)
  @OneToOne(() => User, (user) => user.profile)
  user: User;

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
