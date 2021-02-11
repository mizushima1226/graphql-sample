import { photos } from "../../mocks";

export const postPhoto = (parent: any, args: any) => {
  const newPhoto = {
    id: photos.length + 1,
    ...args.input,
    createdAt: new Date()
  };
  photos.push(newPhoto)
  return newPhoto;
}