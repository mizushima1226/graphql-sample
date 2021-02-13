import { send } from "micro";
import cors from "micro-cors";
import { get, options, post, router, ServerRequest } from "microrouter";
import { ApolloServer } from "apollo-server-micro";
import { createServer, ServerResponse } from 'http';
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { importSchema } from "graphql-import";
import { makeExecutableSchema } from "graphql-tools";

import { resolvers } from "./resolvers";

dotenv.config();

const start = async () => {
  const client = await MongoClient.connect(
    process.env.DB_HOST!,
    { useNewUrlParser: true }
  );
  const db = client.db();

  const typeDefs = importSchema("src/typeDefs/schema.graphql");
  const schema = makeExecutableSchema({
    resolvers,
    typeDefs
  });

  const apolloServer = new ApolloServer({
    schema,
    context: async ({req}) => {
      const githubToken = req.headers?.authorization || "";
      const currentUser = await db.collection('users').findOne({githubToken});
      return { db, currentUser };
    },
  });

  const graphqlPath = "/graphql";
  const graphqlHandler = apolloServer.createHandler({
    path: graphqlPath,
  });

  const httpServer = createServer();
  apolloServer.installSubscriptionHandlers(httpServer);

  httpServer.listen({port: process.env.WS_PORT}, () => {
    console.log(`GraphQL Server running at localhost:5000${apolloServer.graphqlPath}`);
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
