import { SubscriptionResolvers } from "../../generated/graphql";

export const newUser: SubscriptionResolvers["newUser"] = {
  subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('user-added')
}