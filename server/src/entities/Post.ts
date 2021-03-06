import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
@Entity()
export class Post {
  @Field()
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field(() => String)
  @Property({ type: 'date' })
  createdAt = new Date();

  @Field()
  @Property({ type: 'text' })
  title!: string;

  @Field()
  @Property({ type: 'text' })
  content: string;

  @Field(() => Number)
  @Property({ type: 'number', nullable: true })
  creator: number;
}
