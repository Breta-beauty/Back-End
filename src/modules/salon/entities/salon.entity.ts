import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { GraphQLObjectType } from 'graphql';
import GraphQLJSON from 'graphql-type-json';
import { Profile } from 'src/modules/profile/entities/profile.entity';
import { Service } from 'src/modules/services/entities/service.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'salons' })
@ObjectType()
export class Salon {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  salon_id: number;

  @Field()
  @Column('varchar')
  salon_name: string;

  @Field()
  @Column('varchar')
  email: string;

  @Field()
  @Column('varchar')
  cellphone: string;

  @Field()
  @Column('text', {
    default:
      'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg',
  })
  main_picture: string;

  @Field()
  @Column('text', {
    default: 'https://www.insights.com/media/1042/placeholder2.jpg',
  })
  wallpaper: string;

  @Field(() => [String])
  @Column('text', { array: true, nullable: true })
  image_gallery: string[];

  @Field()
  @Column('text')
  description: string;

  @Field(() => GraphQLJSON)
  @Column('jsonb')
  location: object;

  @Field(() => [GraphQLJSON])
  @Column('jsonb')
  schedule: object[];

  @Field(() => [Service])
  @OneToMany(() => Service, (service) => service.salon)
  services: Service[];

  @Field(() => Profile)
  @ManyToOne(() => Profile)
  @JoinColumn({ name: 'owner' })
  owner: Profile;

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
