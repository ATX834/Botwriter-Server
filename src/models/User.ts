import { Field, ID, InputType, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SampleCoverLetter, SampleCoverLetterInput } from "./SampleCoverLetter";

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

  @Field(() => [SampleCoverLetter], { nullable: true }
  )
  @OneToMany(
    () => SampleCoverLetter,
    (sampleCoverLetter) => sampleCoverLetter.user
  )
  sampleCoverLetters?: SampleCoverLetter[];
}

@InputType()
export class UserInput extends BaseEntity {
  
  @Field()
  @Column()
  username!: string;

  @Field()
  @Column()
  password!: string;

  @Field(() => [SampleCoverLetterInput], { nullable: true })
  @OneToMany(
    () => SampleCoverLetter,
    (sampleCoverLetter) => sampleCoverLetter.user
  )
  sampleCoverLetters?: SampleCoverLetter[];
}
