import { ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { Roles } from 'src/modules/role/entities/role.entity';
import { Salon } from 'src/modules/salon/entities/salon.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'employees' })
@ObjectType()
export class Employee {
  @Field()
  @PrimaryGeneratedColumn()
  employee_id: number;

  @Field()
  @Column('varchar')
  profile_picture: string;

  @Field()
  @Column('varchar')
  employee_name: string;

  @Field()
  @Column('varchar', { unique: true })
  cellphone: string;

  @Field({ nullable: true })
  @Column('varchar', { unique: true })
  email: string;

  @Field()
  @Column('varchar')
  commission: string;

  @Field()
  @Column('varchar')
  paymentCycle: string;

  @Field()
  @Column('varchar')
  payday: string;

  @Field(() => [Roles])
  @ManyToOne(() => Roles, (roles) => roles.employee)
  role: Roles;

  @Field(() => Salon) 
  @ManyToOne(() => Salon, (salon) => salon.employee)
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
  newEmployee: Roles;
}