
import { ApolloServer } from 'apollo-server-express';
import 'reflect-metadata';
import express from 'express';
import { __prod__ } from './constants';
import { MyContext } from './types';
import { buildSchema } from "type-graphql";
import { HelloWorldResolver } from './resolvers/HelloWorldResolver';

const main = async () => {
  const app = express();

  const apolloSever = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ HelloWorldResolver ],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ res, req })
  });
  apolloSever.applyMiddleware( { app });
  app.listen(4000, () => {
    console.log('we started our server!! on port 4000');
  })
}

main().catch((err) => {
  console.error(err);
});