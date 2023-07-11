import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { Profile } from 'src/modules/profile/entities/profile.entity';
import { Salon } from 'src/modules/salon/entities/salon.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'ratings' })
@ObjectType()
export class Rating {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  rating_id: number;

  @Field()
  @Column('int4range')
  score: 1 | 2 | 3 | 4 | 5;

  @Field()
  @Column('text')
  comment: string;

  @Field(() => Profile)
  @ManyToOne(() => Profile, (profile) => profile.rates)
  user: Profile;

  @Field(() => Salon)
  @ManyToOne(() => Salon, (salon) => salon.ratings)
  salon: Salon;

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
