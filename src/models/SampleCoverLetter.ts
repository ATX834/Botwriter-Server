import { Field, ID, InputType, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User, UserInput } from "./User";
import { Hook, HookInput } from "./Hook";

@ObjectType()
@Entity()
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
  
    @Field(() => [Hook])
    @ManyToMany(() => Hook, hook => hook.sampleCoverLetters)
    hooks!: Hook[];

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
  
    @Field(() => [HookInput])
    @ManyToMany(() => Hook, hook => hook.sampleCoverLetters)
    hooks!: Hook[];

    @Field(() => UserInput)
    @ManyToOne(() => User, user => user.sampleCoverLetters)
    user!: User;
}