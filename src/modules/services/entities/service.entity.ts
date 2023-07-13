import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { Appointment } from 'src/modules/appointment/entities/appointment.entity';
import { Salon } from 'src/modules/salon/entities/salon.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'services' })
@ObjectType()
export class Service {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  service_id: number;

  @Field()
  @Index({ unique: true })
  @Column('varchar')
  service_name: string;

  @Field()
  @Column('varchar')
  category: string;

  @Field()
  @Column('varchar')
  gender: string;

  @Field()
  @Column('text')
  description: string;

  @Field()
  @Column('float')
  price: number;

  @Field(() => GraphQLJSON)
  @Column('jsonb')
  cancellation: object;

  @Field(() => GraphQLJSON)
  @Column('jsonb')
  timespan: object;

  @Field(() => Salon)
  @ManyToOne(() => Salon, (salon) => salon.services)
  @JoinColumn({ name: 'salon_id' })
  salon: Salon;

  @Field(() => [Appointment])
  @ManyToMany(() => Appointment, (appointment) => appointment.services)
  @JoinTable({ name: 'services<->appointments' })
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
