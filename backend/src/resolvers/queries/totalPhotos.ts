import { photos } from "../../mocks";

export const totalPhotos = (parent: any, args: any, { db }: any) => {
  return db.collection('photos').estimatedDocumentCount();
};