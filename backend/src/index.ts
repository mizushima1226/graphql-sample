import micro, { send } from "micro";
import cors from "micro-cors";
import { get, options, post, router, ServerRequest } from "microrouter";
import { ApolloServer } from "apollo-server-micro";
import { ServerResponse } from 'http';
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

import { schema } from "./schema";

dotenv.config();

const start = async () => {
  const client = await MongoClient.connect(
    process.env.DB_HOST!,
    { useNewUrlParser: true }
  );
  const db = client.db();

  const context = { db }
  const apolloServer = new ApolloServer({
    schema,
    context,
  });

  const graphqlPath = "/graphql";
  const graphqlHandler = apolloServer.createHandler({
    path: graphqlPath,
  });
  
  const corsHandler = cors({
    allowMethods: ["GET", "POST"],
    allowHeaders: ["*"],
    exposeHeaders: ["*"],
    maxAge: 0
  });
  
  return corsHandler(router(
    get("/", (req: ServerRequest, res: ServerResponse) => "Welcome!"),
    get(graphqlPath, graphqlHandler),
    post(graphqlPath, graphqlHandler),
    options(graphqlPath, (_: ServerRequest, res: ServerResponse) => send(res, 200)),
    (_, res: ServerResponse) => send(res, 404, "Not Found")
  ));
}

export default start();
