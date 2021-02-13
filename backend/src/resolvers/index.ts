import { GraphQLScalarType, Kind } from "graphql";

import Query from "./queries";
import Mutation from "./mutations";
import Subscription from "./subscriptions";
import Photo from "./types/photo";
import User from "./types/user";

export const resolvers = {
  Query,
  Mutation,
  Subscription,
  Photo,
  User,
  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "A valid data time value",
    parseValue: value => new Date(value),
    serialize: value => new Date(value).toISOString(),
    parseLiteral: ast => ast.kind === Kind.STRING ? ast.value : null
  })
}
