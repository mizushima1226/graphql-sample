import { QueryResolvers } from "generated/graphql";

export const allUsers: QueryResolvers["allUsers"] = (_, __, { db }) => {
  return db.collection('users').find().toArray();
}