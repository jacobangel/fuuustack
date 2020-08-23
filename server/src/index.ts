
import { ApolloServer } from 'apollo-server-express';
import 'reflect-metadata';
import express from 'express';
import { __prod__ } from './constants';
import { MyContext } from './types';
import { buildSchema } from "type-graphql";
import { HelloWorldResolver } from './resolvers/HelloWorldResolver';
import { PostResolver } from './resolvers/PostResolver';
import { MikroORM } from '@mikro-orm/core';
import mikroOrmConfig from './mikro-orm.config' 

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up();

  const app = express();

  const apolloSever = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ HelloWorldResolver, PostResolver ],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ res, req, em: orm.em })
  });
  apolloSever.applyMiddleware( { app });
  app.listen(4000, () => {
    console.log('we started our server!! on port 4000');
  })
}

main().catch((err) => {
  console.error(err);
});