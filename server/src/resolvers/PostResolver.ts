import { Resolver, Mutation, Query, Ctx, Arg, Int  } from "type-graphql";
import { Post } from "../entities/Post";
import { MyContext } from "../types";

@Resolver() 
export class PostResolver {
  @Query(() => [Post ])
  posts(@Ctx() { em } : MyContext ) : Promise<Post[]> {
    return em.find(Post, {});
  }

  @Query(() => Post) 
  async post(
    @Arg("id", () => Int) id: number,
    @Ctx() { em } : MyContext) : Post | null {
    const thePost = await em.findOne(Post, id);
    if (thePost) {
      return thePost;
    }
    return null;
  }

  @Mutation(() => Post)
  async createPost(
    @Arg("title", () => String) title: string,
    @Arg("content", () => String) content: string,
    @Ctx() { em } : MyContext
  ): Promise<Post | null> {
    // return em.findOne(Post, { id });
    //em.flu
    const post = em.create(Post, { title, content });
    await em.persistAndFlush(post);
    return post
  }

  @Mutation(() => Boolean) 
  async deletePost(
    @Arg("id", () => Int) id: number,
    @Ctx() { em } : MyContext
  ): Promise<boolean> {
    try {
      await em.nativeDelete(Post, { id });
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}