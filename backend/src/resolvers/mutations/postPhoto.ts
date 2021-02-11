import { MutationResolvers, Photo, PhotoCategory } from "../../generated/graphql";
import { photos } from "../../mocks";

export const postPhoto: MutationResolvers["postPhoto"] = (_, args) => {
  const newPhoto: Partial<Photo> = {
    id: `${photos.length + 1}`,
    ...args.input,
    createdAt: new Date(),
    category: PhotoCategory.Selfie
  };
  return newPhoto as Photo;
}