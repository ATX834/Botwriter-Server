import { Query, Resolver, Mutation, Arg, ID } from "type-graphql";
import { getRepository } from "typeorm";
import bcrypt from "bcryptjs";

import { ResetPasswordInput, User, UserInput, UserUpdateInput } from "../models/User";

@Resolver()
export class UserResolver {

  private userRepository = getRepository(User);

  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  @Query(() => User)
  async getUser(@Arg("id", () => ID) id: number): Promise<User> {
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

  @Mutation(() => User!, { nullable: true })
  async updateUser(
    @Arg("data", () => UserUpdateInput) updateUser: User,
    @Arg("id", () => ID) id: number,
  ): Promise<User | null> {
    const user = await this.userRepository.findOne(id);

    return user ?
      await this.userRepository.update(id, updateUser) &&
      user.reload() &&
      user
      : null;
  }

  @Mutation(() => User!, { nullable: true })
  async removeUser(
    @Arg("id", () => ID) id: number,
  ): Promise<User | null | undefined> {
    const user = await this.userRepository.findOne(id);

    return user ?
      await this.userRepository.delete(id) &&
      user
      : null;
  }

  @Mutation(() => User!, { nullable: true })
  async resetUserPassword(
    @Arg("reset", () => ResetPasswordInput) reset: ResetPasswordInput,
    @Arg("id", () => ID) id: number,
  ): Promise<User | null> {

    let user = await this.userRepository.findOne(id);

    if (user) {
      user.password = await bcrypt.hash(
        reset.password,
        bcrypt.genSaltSync(14)
      );
      await user.reload();
      return user;

    }
    return null;
  }
}

