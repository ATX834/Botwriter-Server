import { Query, Resolver, Mutation, Arg } from "type-graphql";
import { getRepository } from "typeorm";
import {
  SampleCoverLetter,
  SampleCoverLetterInput,
} from "../models/SampleCoverLetter";


@Resolver()
export class SampleCoverLetterResolver {
  
  private SampleCoverLetterRepository = getRepository(SampleCoverLetter);

  @Query(() => [SampleCoverLetter])
  async getSampleCoverLetters(): Promise<SampleCoverLetter[]> {
    return await this.SampleCoverLetterRepository.find();
  }

  @Mutation(() => SampleCoverLetter)
  async createSampleCoverLetter(
    @Arg("data") data: SampleCoverLetterInput
  ): Promise<SampleCoverLetter> {
    const sampleCoverLetter = this.SampleCoverLetterRepository.create(data);
    await sampleCoverLetter.save();
    return sampleCoverLetter;
  }
}
