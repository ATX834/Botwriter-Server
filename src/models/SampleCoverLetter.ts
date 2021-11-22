import { Field, ID, InputType, ObjectType } from "type-graphql";
import { BaseEntity, Column, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User, UserInput } from "./User";
import { Variable } from "./Variable";

@ObjectType()
export class SampleCoverLetter extends BaseEntity{
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!:number;
  
    @Field()
    @Column()
    title!: string;
  
    @Field()
    @Column()
    text!: string;
  
    @Field(() => [Variable])
    @ManyToMany(() => Variable, variable => variable.sampleCoverLetters)
    variables!: Variable[];

    @Field(() => User)
    @ManyToOne(() => User, user => user.sampleCoverLetters)
    user!: User;
}

@InputType()
export class SampleCoverLetterInput {
    @Field()
    @Column()
    title!: string;
  
    @Field()
    @Column()
    text!: string;
  
    @Field(() => [Variable])
    @ManyToMany(() => Variable, variable => variable.sampleCoverLetters)
    variables!: Variable[];

    @Field(() => UserInput)
    @ManyToOne(() => User, user => user.sampleCoverLetters)
    user!: User;
}