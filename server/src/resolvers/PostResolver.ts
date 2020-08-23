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
    @Ctx() { em } : MyContext) : Promise<Post | null> {
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
    const post = em.create(Post, { title, content });
    await em.persistAndFlush(post);
    return post
  }

  @Mutation(() => Post)
  async updatePost(
    @Arg("id", () => Int) id: number,
    @Arg("title", () => String) title: string,
    @Arg("content", () => String) content: string,
    @Ctx() { em } : MyContext
  ): Promise<Post | null> {
    const post = await em.findOne(Post, id);
    if (!post) {
      return null;
    }
    if (title !== undefined) {
      post.title = title;
    }
    if (content !== undefined) {
      post.content = content;
    }
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