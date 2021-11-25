import { Field, InputType, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { SampleCoverLetter, SampleCoverLetterInput } from "./SampleCoverLetter";

@ObjectType()
@Entity()
export class Variable extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    title!: string;

    @Field()
    @Column()
    value!: string;

    @ManyToMany(() => SampleCoverLetter, sampleCoverLetter => sampleCoverLetter.variables)
    sampleCoverLetters!: SampleCoverLetter[];
}

@InputType()
export class VariableInput {
    @Field()
    @Column()
    title!: string;

    @Field()
    @Column()
    value!: string;

    @Field(() => [SampleCoverLetterInput])
    @ManyToMany(() => SampleCoverLetter, sampleCoverLetter => sampleCoverLetter.variables)
    sampleCoverLetters!: SampleCoverLetter[];
}