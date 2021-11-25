import { Query, Resolver, Mutation, Arg } from "type-graphql";
import { User, UserInput } from "../models/User";
import { getRepository } from "typeorm";
import bcrypt from "bcryptjs";

@Resolver()
export class UserResolver {

  private userRepository = getRepository(User);

  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  @Query(() => User)
  async getUser(@Arg("data") id: number): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  @Mutation(() => User)
  async createUser(@Arg("data") newUserData: UserInput): Promise<User> {
    newUserData.password = await bcrypt.hash(
      newUserData.password,
      bcrypt.genSaltSync(14)
    );
    const user = this.userRepository.create(newUserData);
    return await user.save();
  }

  @Mutation(() => User)
  async updateUser(
    @Arg("id") id: number,
    @Arg("data") newUserData: UserInput
  ): Promise<User> {
    let user = await this.userRepository.findOne(id);
    // console.log(user);
    // user = this.userRepository.update(id, user)

    return user;
  }
}
