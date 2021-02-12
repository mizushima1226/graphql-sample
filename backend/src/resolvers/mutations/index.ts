import { MutationResolvers } from "generated/graphql";
import { postPhoto } from "./postPhoto";
import { githubAuth } from "./githubAuth";
import { addFakeUsers } from "./addFakeUsers";

const mutation: MutationResolvers = {
  postPhoto,
  githubAuth,
  addFakeUsers
};

export default mutation;