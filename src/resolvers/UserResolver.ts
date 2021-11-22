import { Query, Resolver, Mutation, Arg } from "type-graphql";
import { User, UserInput } from "../models/User";
import { getRepository } from "typeorm";


@Resolver()
export class UserResolver {
  private userRepository = getRepository(User);

  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  @Mutation(() => User)
  async createUser(@Arg("data") newUserData: UserInput): Promise<User> {
    const user = this.userRepository.create(newUserData);
    return await user.save();
  }
}
