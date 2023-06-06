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

  @Field()
  @Column({ type: 'varchar', length: 150, unique: true })
  username: string;

  @Field()
  @Column({ type: 'varchar', length: 150, unique: true })
  email: string;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  password: string;

<<<<<<< HEAD
  @Field()
  @Column({ type: 'varchar', length: 20, default: 'customer' })
  type: 'salon' | 'customer';

  @Field(() => Profile)
  @OneToOne(() => Profile, { nullable: true })
  @JoinColumn()
  profile: Profile;
=======
  @Field({ defaultValue: false })
  @Column({ type: 'boolean' })
  is_Verified: boolean;
>>>>>>> c6c0fbff7f61914cb89a487d16b92f3077b36f4d

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
