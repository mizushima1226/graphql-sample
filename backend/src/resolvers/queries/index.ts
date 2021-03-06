import { QueryResolvers } from "generated/graphql";
import { totalPhotos } from "./totalPhotos";
import { allPhotos } from "./allPhotos";
import { totalUsers } from "./totalUsers"
import { allUsers } from "./allUsers";

const query: QueryResolvers = {
  me: (_, __, { currentUser  }) => currentUser,
  totalPhotos,
  allPhotos,
  totalUsers,
  allUsers
}
 export default query;