import { MutationResolvers } from "generated/graphql";
import { postPhoto } from "./postPhoto";
import { githubAuth } from "./githubAuth";
import { addFakeUsers } from "./addFakeUsers";
import { fakeUserAuth } from "./fakeUserAuth";

const mutation: MutationResolvers = {
  postPhoto,
  githubAuth,
  addFakeUsers,
  fakeUserAuth
};

export default mutation;