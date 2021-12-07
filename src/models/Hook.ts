import { Field, InputType, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { SampleCoverLetter, SampleCoverLetterInput } from "./SampleCoverLetter";

@ObjectType()
@Entity()
export class Hook extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    title!: string;

    @Field()
    @Column()
    value!: string;

    @ManyToMany(() => SampleCoverLetter, sampleCoverLetter => sampleCoverLetter.hooks)
    sampleCoverLetters!: SampleCoverLetter[];
}

@InputType()
export class HookInput {
    @Field()
    @Column()
    title!: string;

    @Field()
    @Column()
    value!: string;

    @Field(() => [SampleCoverLetterInput])
    @ManyToMany(() => SampleCoverLetter, sampleCoverLetter => sampleCoverLetter.hooks)
    sampleCoverLetters!: SampleCoverLetter[];
}