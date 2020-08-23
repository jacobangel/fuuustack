import { MikroORM  } from '@mikro-orm/core';
import path from 'path';
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { dbpw } from './secrets'
// import { }

export default {
  migrations : { 
    path: path.join(__dirname, "migrations"),
    pattern:  /^[\w-]+\d+\.[tj]s$/,
  }, 
  entities: [Post],
  dbName: "fullstackplayground", 
  type: "postgresql",
  password: dbpw,
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];