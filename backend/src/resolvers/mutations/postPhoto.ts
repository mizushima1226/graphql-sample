import { MutationResolvers, Photo } from "../../generated/graphql";

export const postPhoto: MutationResolvers["postPhoto"] = async (_, args, { db, currentUser, pubsub }) => {
  if(!currentUser) throw new Error('only an authorized user can post a photo');
  const newPhoto: Partial<Photo> = {
    name: args.input.name,
    description: args.input.description,
    category: args.input.category!,
    userID: currentUser.githubLogin,
    createdAt: new Date(),
  };
  const { insertedIds } = await db.collection('photos') .insert(newPhoto);
  newPhoto.id = insertedIds[0];

  pubsub.publish('photo-added', { newPhoto });
  
  return newPhoto as Photo;
}