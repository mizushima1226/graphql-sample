import { QueryResolvers } from "../../generated/graphql";

export const totalUsers: QueryResolvers["totalUsers"] = (parent: any, args: any, { db }: any) => {
  return db.collection('users').estimatedDocumentCount();
}