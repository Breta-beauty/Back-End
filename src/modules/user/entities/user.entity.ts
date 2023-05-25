import {
  ObjectType,
  Field,
  Int,
  ID,
  GraphQLISODateTime,
} from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  user_id: number;

  @Field()
  @Column({ type: 'varchar', length: 150 })
  username: string;

  @Field()
  @Column({ type: 'varchar', length: 150 })
  email: string;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  password: string;

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
