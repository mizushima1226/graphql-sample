import { send } from "micro";
import { get, post, router, ServerRequest } from "microrouter";
import { ApolloServer } from "apollo-server-micro";
import { ServerResponse } from "http";

import { schema } from "./schema";

const apolloServer = new ApolloServer({schema});
const graphqlPath = "/graphql-playground";
const graphqlHandler = apolloServer.createHandler({path: graphqlPath});

module.exports = router(
  get("/", (req: ServerRequest, res: ServerResponse) => "Welcome!"),
  post(graphqlPath, graphqlHandler),
  get(graphqlPath, graphqlHandler),
  (_, res: ServerResponse) => send(res, 404, "Not Found")
);