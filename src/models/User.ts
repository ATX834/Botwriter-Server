import { Field, ID, InputType, ObjectType } from "type-graphql";
import { BaseEntity, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SampleCoverLetter, SampleCoverLetterInput } from "./SampleCoverLetter";

@ObjectType()
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

  @Field(() => [SampleCoverLetter])
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

  @Field(() => [SampleCoverLetterInput])
  @OneToMany(
    () => SampleCoverLetter,
    (sampleCoverLetter) => sampleCoverLetter.user
  )
  sampleCoverLetters!: SampleCoverLetter[];
}
