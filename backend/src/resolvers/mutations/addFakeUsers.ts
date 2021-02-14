import fetch from 'node-fetch';

import { MutationResolvers, User, Photo } from "../../generated/graphql";

export const addFakeUsers: MutationResolvers["addFakeUsers"] = async (_, { count }, { db, pubsub }) => {
  const { results } = await fetch(
    `https://randomuser.me/api/?results=${count}`
  ).then(res => res.json());

  const users: Array<User> = results.map((r: any) => {
    return {
      githubLogin: r.login.username,
      name: `${r.name.first} ${r.name.last}`,
      avatar: r.picture.thumbnail,
      githubToken: r.login.sha1,
    };
  });

  pubsub.publish('user-added', { newUser: users[0] });

  await db.collection('users').insert(users);

  return users;
};