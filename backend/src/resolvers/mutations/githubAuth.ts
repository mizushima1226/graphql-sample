import dotenv from "dotenv";
dotenv.config();

import { MutationResolvers } from "../../generated/graphql";
import { authorizeWithGithub } from "../../lib/auth";

export const githubAuth: MutationResolvers["githubAuth"] = async ( _, { code }, { db } ) => {
  const res = await authorizeWithGithub({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    code
  });

  const {
    message,
    access_token,
    avatar_url,
    login,
    name
  } = res;

  if(message) throw new Error(message);

  const latestUserInfo = {
    name,
    githubLogin: login,
    githubToken: access_token,
    avatar: avatar_url
  };

  const { ops:[user] } = await db.collection('users')
    .replaceOne({ githubLogin: login} , latestUserInfo, { upsert: true });

  return { user, token: access_token };
};