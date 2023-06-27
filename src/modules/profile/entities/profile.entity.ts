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

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  description: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  wallpaper: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  profile_picture: string;

  @Field(() => [String], { nullable: true })
  @Column({ type: 'text', array: true, nullable: true, default: () => "'{}'" })
  image_gallery: string[];

  @Field(() => [String], { nullable: true })
  @Column({ type: 'jsonb', array: true, nullable: true })
  location: string[];

  @Field(() => [String], { nullable: true })
  @Column({
    type: 'varchar',
    length: 100,
    array: true,
    nullable: true,
    default: () => "'{}'",
  })
  services: string[];

  @Field(() => [String], { nullable: true })
  @Column({ type: 'jsonb', array: true, nullable: true })
  schedule: string[];

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
