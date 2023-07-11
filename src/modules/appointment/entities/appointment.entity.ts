import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Service } from 'src/modules/services/entities/service.entity';
import { Profile } from 'src/modules/profile/entities/profile.entity';

@Entity({ name: 'appointments' })
@ObjectType()
export class Appointment {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  appointment_id: number;

  @Field()
  @Column('date')
  date: Date;

  @Field(() => Profile)
  @ManyToOne(() => Profile, (profile) => profile.appointments)
  @JoinColumn({ name: 'subscriber' })
  subscriber: Profile;

  @Field(() => [Service])
  @ManyToMany(() => Service, (service) => service.appointments)
  services: Service[];

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