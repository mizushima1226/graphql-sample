import { MutationResolvers, Photo } from "../../generated/graphql";

export const postPhoto: MutationResolvers["postPhoto"] = async (_, args, { db, currentUser }) => {
  if(!currentUser) throw new Error('only an authorized user can post a photo');
  const newPhoto: Partial<Photo> = {
    name: args.input.name,
    description: args.input.description,
    category: args.input.category!,
    createdAt: new Date(),
  };
  const data: Photo & { userID: string; } = {
    ...newPhoto as Photo,
    userID: currentUser.githubLogin
  };
  const { insertedIds } = await db.collection('photos') .insert(data);
  newPhoto.id = insertedIds[0];
  
  return newPhoto as Photo;
}