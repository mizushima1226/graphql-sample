import { SubscriptionResolvers } from "../../generated/graphql";

export const newPhoto: SubscriptionResolvers["newPhoto"] = {
  subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('photo-added')
}