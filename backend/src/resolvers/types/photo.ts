import { PhotoResolvers, User } from "../../generated/graphql";

const photo: Partial<PhotoResolvers> = {
  id: (parent) => parent.id,
  url: (parent) => `http://mysite.com/img/${parent.id}.jpg`,
  postedBy: (parent, args, { db }) => {
    const user = db.collection('users').findOne({ githubLogin: parent.userID });
    return user;
  },
  taggedUsers: (parent) => {
    const list = [{}] as [User];
    return list;
  }
};

export default photo;