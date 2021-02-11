import { MutationResolvers } from "generated/graphql";
import { postPhoto } from "./postPhoto";
import { githubAuth } from "./githubAuth";

const mutation: MutationResolvers = {
  postPhoto,
  githubAuth
};

export default mutation;