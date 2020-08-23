import { Response, Request }  from 'express';
import { EntityManager } from "@mikro-orm/core";

export type MyContext = {

  em: EntityManager<any>;
  req: Request;
  res: Response;
}