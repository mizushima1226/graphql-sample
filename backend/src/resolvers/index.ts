import { GraphQLScalarType, Kind } from "graphql";

import Query from "./queries";
import Mutation from "./mutations";

import { users, photos, tags } from "../mocks";

export const resolvers = {
  Query,
  Mutation,
  Photo: {
    url: (parent: any) => `http://mysite.com/img/${parent.id}.jpg`,
    postedBy: (parent: any) => {
      return users.find(u => u.githubLogin === parent.githubUser);
    },
    taggedUsers: (parent: any) => {
      return tags.filter(tag => tag.photoID === parent.id)
        .map(tag => tag.userID)
        .map(userID => users.find(u => u.githubLogin === userID));
    }
  },
  User: {
    postedPhotos: (parent: any) => {
      return photos.filter(p => p.githubUser === parent.githubLogin);
    },
    inPhotos: (parent: any) => {
      return tags.filter(tag => tag.userID === parent.id)
        .map(tag => tag.photoID)
        .map(photoID => photos.find(p => p.id === photoID));
    }
  },
  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "A valid data time value",
    parseValue: value => new Date(value),
    serialize: value => new Date(value).toISOString(),
    parseLiteral: ast => ast.kind === Kind.STRING ? ast.value : null
  })
}