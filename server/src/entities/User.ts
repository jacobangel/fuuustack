import { ObjectType, Field } from 'type-graphql';

import { Entity, PrimaryKey, Property  } from '@mikro-orm/core';
// import { Post } from './Post';

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryKey()
  id!: number;

  @Field()
  @Property({ unique: true })
  username!: string;

  @Field()
  @Property({ unique: true })
  email!: string;

  @Field()
  password!: string;

  // @OneToMany(() => Post, (post) => post.creator)
  // posts: Post[];

  @Field(() => String)
  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field(() => String)
  @Property({ type: 'date' })
  createdAt = new Date();
}
