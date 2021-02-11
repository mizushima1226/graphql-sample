import { GraphQLScalarType, Kind } from "graphql";

import Query from "./queries";
import Mutation from "./mutations";
import { Photo, PhotoResolvers, User, UserResolvers } from "../generated/graphql";

const photoResolver:Partial<PhotoResolvers> = {
  url: (parent) => `http://mysite.com/img/${parent.id}.jpg`,
  postedBy: () => {
    const user = {} as User;
    return user;
  },
  taggedUsers: (parent) => {
    const list = [{}] as [User];
    return list;
  }
};

const userResolver: Partial<UserResolvers> = {
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

export const resolvers = {
  Query,
  Mutation,
  Photo: photoResolver,
  User: userResolver,
  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "A valid data time value",
    parseValue: value => new Date(value),
    serialize: value => new Date(value).toISOString(),
    parseLiteral: ast => ast.kind === Kind.STRING ? ast.value : null
  })
}
