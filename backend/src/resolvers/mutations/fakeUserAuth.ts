import { MutationResolvers } from "../../generated/graphql";

export const fakeUserAuth: MutationResolvers["fakeUserAuth"] = async (parent, { githubLogin }, { db }) => {
  const user = await db.collection('users').findOne({ githubLogin });

  if(!user) throw new Error(`Cannot find user with githubLogin ${githubLogin}`);

  return {
    token: user.githubToken,
    user
  };
}

