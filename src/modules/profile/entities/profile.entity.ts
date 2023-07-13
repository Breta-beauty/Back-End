import { ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { Appointment } from 'src/modules/appointment/entities/appointment.entity';
import { Rating } from 'src/modules/rating/entities/rating.entity';
import { Salon } from 'src/modules/salon/entities/salon.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
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
  @Column('varchar', { nullable: true })
  description: string;

  @Field({ nullable: true })
  @Column('varchar', { nullable: true })
  wallpaper: string;

  @Field({ nullable: true })
  @Column('varchar', { nullable: true })
  profile_picture: string;

  @Field(() => [String], { nullable: true })
  @Column('varchar', { array: true, nullable: true })
  image_gallery: string[];

  @Field(() => User)
  @OneToOne(() => User, (user) => user.profile)
  user: User;

  @Field(() => [Salon])
  @OneToMany(() => Salon, (salon) => salon.owner, { cascade: true })
  salons: Salon[];

  @Field(() => [Rating])
  @OneToMany(() => Rating, (rating) => rating.user)
  rates: Rating[];

  @Field(() => [Appointment])
  @OneToMany(() => Appointment, (appointment) => appointment.subscriber, {
    cascade: true,
  })
  appointments: Appointment[];

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
