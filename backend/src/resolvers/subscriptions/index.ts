import { SubscriptionResolvers } from "../../generated/graphql";
import { newPhoto } from "./newPhoto";
import { newUser } from "./newUser";

const subscription: SubscriptionResolvers = {
  newPhoto,
  newUser
};

export default subscription;