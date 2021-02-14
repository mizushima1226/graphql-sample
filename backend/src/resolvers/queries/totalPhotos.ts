import { QueryResolvers } from "../../generated/graphql";

export const totalPhotos: QueryResolvers["totalPhotos"] = (parent, args, { db }) => {
  return db.collection('photos').estimatedDocumentCount() as number;
};