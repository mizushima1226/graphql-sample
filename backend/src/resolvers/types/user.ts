import { UserResolvers, Photo } from "../../generated/graphql";

const user: Partial<UserResolvers> = {
  postedPhotos: () => {
    return [{}] as [Photo];
  },
  inPhotos: (parent: any) => {
    return [{}] as [Photo];
    // return tags.filter(tag => tag.userID === parent.id)
    //   .map(tag => tag.photoID)
    //   .map(photoID => photos.find(p => p.id === photoID));
  }
};

export default user;