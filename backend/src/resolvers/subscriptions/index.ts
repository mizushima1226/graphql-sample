import { SubscriptionResolvers } from "../../generated/graphql";
import { newPhoto } from "./newPhoto";

const subscription: SubscriptionResolvers = {
  newPhoto
};

export default subscription;