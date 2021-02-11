import { send } from "micro";
import cors from "micro-cors";
import { get, options, post, router, ServerRequest } from "microrouter";
import { ApolloServer } from "apollo-server-micro";
import { ServerResponse } from 'http';

import { schema } from "./schema";

const apolloServer = new ApolloServer({schema});
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

export default corsHandler(router(
  get("/", (req: ServerRequest, res: ServerResponse) => "Welcome!"),
  get(graphqlPath, graphqlHandler),
  post(graphqlPath, graphqlHandler),
  options(graphqlPath, (_: ServerRequest, res: ServerResponse) => send(res, 200)),
  (_, res: ServerResponse) => send(res, 404, "Not Found")
));