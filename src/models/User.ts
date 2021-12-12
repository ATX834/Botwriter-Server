import { Field, ID, InputType, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SampleLetter } from "./SampleLetter";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  username!: string;

  @Field()
  @Column()
  password!: string;

  @Field(() => [SampleLetter], { nullable: true }
  )
  @OneToMany(
    () => SampleLetter,
    (sampleLetter) => sampleLetter.user
    , { eager: true }
  )
  sampleLetters?: SampleLetter[];
}

@InputType()
export class UserInput extends BaseEntity {

  @Field()
  @Column()
  username!: string;

  @Field()
  @Column()
  password!: string;
}
@InputType()
export class UserUpdateInput extends BaseEntity {

  @Field({ nullable: true })
  @Column()
  username!: string;
}
@InputType()
export class ResetPasswordInput extends BaseEntity {

  @Field({ nullable: true })
  @Column()
  password!: string;
}
