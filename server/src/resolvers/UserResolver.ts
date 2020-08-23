import { Resolver, Mutation, Query, Ctx, Arg, Int  } from "type-graphql";
import { User } from "../entities/User";
import { MyContext } from "../types";

@Resolver() 
export class UserResolver {
  @Query(() => [User ])
  users(@Ctx() { em } : MyContext ) : Promise<User[]> {
    return em.find(User, {});
  }

  @Query(() => User) 
  async user(
    @Arg("id", () => Int) id: number,
    @Ctx() { em } : MyContext) : Promise<User | null> {
    const theUser = await em.findOne(User, id);
    if (theUser) {
      return theUser;
    }
    return null;
  }

  @Mutation(() => User)
  async createUser(
    @Arg("title", () => String) title: string,
    @Arg("content", () => String) content: string,
    @Ctx() { em } : MyContext
  ): Promise<User | null> {
    const user = em.create(User, { title, content });
    await em.persistAndFlush(user);
    return user
  }

  @Mutation(() => User)
  async updateUser(
    @Arg("id", () => Int) id: number,
    @Arg("password", () => String) password: string,
    @Ctx() { em } : MyContext
  ): Promise<User | null> {
    const user = await em.findOne(User, id);
    if (!user) {
      return null;
    }

    if (password) {
      user.password = password; // very secure!!
    }
    await em.persistAndFlush(user);
    return user
  }


  @Mutation(() => Boolean) 
  async deleteUser(
    @Arg("id", () => Int) id: number,
    @Ctx() { em } : MyContext
  ): Promise<boolean> {
    try {
      await em.nativeDelete(User, { id });
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}