import { Photo, QueryResolvers } from "../../generated/graphql";

export const allPhotos: QueryResolvers["allPhotos"] = (parent, args) => {
  const photos: [Photo] = [{} as Photo];
  return photos;
}