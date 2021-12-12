import { Query, Resolver, Mutation, Arg, ID } from "type-graphql";
import { getCustomRepository, getRepository } from "typeorm";

import {
  SampleLetter,
  SampleLetterInput,
  SampleLetterUpdateInput,
} from "../models/SampleLetter";

import { Hook, HookInput } from "../models/Hook";
import { User } from "../models/User";
import { SampleLetterRepository } from "../repositories/SampleLetterRepository"
import linkHooksToSampleLetter from "../helpers/linkHooksToSampleLetter";

@Resolver()
export class SampleLetterResolver {

  private sampleLetterRepository = getCustomRepository(SampleLetterRepository);
  private userRepository = getRepository(User);
  private customInsertQuery = this.sampleLetterRepository.insertIntoHookSampleLetterTable;

  @Query(() => [SampleLetter])
  async getSampleLetters(): Promise<SampleLetter[]> {
    return await this.sampleLetterRepository.find();
  }

  @Query(() => SampleLetter, { nullable: true })
  async getSampleLetter(@Arg("id", () => ID) id: number): Promise<SampleLetter | void> {
    const dbSampleLetter = await this.sampleLetterRepository.findOne(id)
    return dbSampleLetter ? dbSampleLetter : null;
  }

  @Mutation(() => SampleLetter)
  async createSampleLetter(
    @Arg("sampleLetter", () => SampleLetterInput) sampleLetter: SampleLetter,
    @Arg("hooks", () => [HookInput]) hooks: Hook[],
    @Arg("userID", () => ID) id: number
  ): Promise<SampleLetter> {

    const user = await this.userRepository.findOne(id);
    sampleLetter.user = user;

    linkHooksToSampleLetter(hooks, sampleLetter.id, this.customInsertQuery);

    return await this.sampleLetterRepository.findOne(sampleLetter.id);
  }

  @Mutation(() => SampleLetter, { nullable: true })
  async updateSampleLetter(
    @Arg("sampleLetter", () => SampleLetterUpdateInput) updateSampleLetter: SampleLetter,
    @Arg("hooks", () => [HookInput]) hooks: Hook[],
    @Arg("sampleLetterId", () => ID) id: number
  ): Promise<SampleLetter | void> {

    let sampleLetter = await this.sampleLetterRepository.findOne(id);

    if (!sampleLetter) return null;

    await this.sampleLetterRepository.update(id, updateSampleLetter)
    sampleLetter.reload()

    linkHooksToSampleLetter(hooks, sampleLetter.id, this.customInsertQuery);

    return sampleLetter;
  }

  @Mutation(() => SampleLetter!, { nullable: true })
  async removeSampleLetter(
    @Arg("id", () => ID) id: number,
  ): Promise<SampleLetter | void> {
    const sampleLetter = await this.sampleLetterRepository.findOne(id);

    return sampleLetter ?
      this.sampleLetterRepository.delete(id) &&
      sampleLetter
      : null;
  }
}
