import Query from "./queries";
import Mutation from "./mutations";

import { users, photos } from "../mocks";

export const resolvers = {
  Query,
  Mutation,
  Photo: {
    url: (parent: any) => `http://mysite.com/img/${parent.id}.jpg`,
    postedBy: (parent: any) => {
      return users.find(u => u.githubLogin === parent.githubUser);
    }
  },
  User: {
    postedPhotos: (parent: any) => {
      return photos.filter(p => p.githubUser === parent.githubLogin);
    }
  }
}