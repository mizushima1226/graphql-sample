import { QueryResolvers } from "generated/graphql";

export const allPhotos: QueryResolvers["allPhotos"] = (_, __, { db }) => {
  return db.collection('photos').find().toArray();
}