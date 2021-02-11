import { MutationResolvers } from "generated/graphql";
import { postPhoto } from "./postPhoto";

const mutation: MutationResolvers = {
  postPhoto
};

export default mutation;