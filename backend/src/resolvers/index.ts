import Query from "./queries";
import Mutation from "./mutations";

export const resolvers = {
  Query,
  Mutation,
  Photo: {
    url: (parent: {}) => `http://mysite.com/img/${1}.jpg`
  }
}