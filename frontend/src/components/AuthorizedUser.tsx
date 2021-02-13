import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useApolloClient } from '@apollo/client';

import { useAuth } from '../hooks/useAuth';
import { useRootInfo } from '../hooks/useRootInfo';
import { setItem, removeItem } from '../utils/localStrageUtil';
import { RootInfoDocument, RootInfoQuery } from '../generated/graphql';

export const AuthorizedUser = () => {
  const router = useRouter();
  const client = useApolloClient();
  const [signIn, setSignIn] = useState(false);
  const { githubAuth, githubAuthMutation } = useAuth();
  const { rootInfo, getRootInfo } = useRootInfo();

  const token = githubAuthMutation.data?.githubAuth.token;

  useEffect(() => {
    if (window?.location.search.match(/code=/)) {
      const auth = async () => {
        const code = window.location.search.replace('?code=', '');
        await githubAuth({ variables: { code } });
        router.replace('/');
      };
      auth();
    }
  }, []);
  useEffect(() => {
    if (!token) return;
    setSignIn(true);
    setItem('token', token);
    getRootInfo();
  }, [token]);

  const onClickSingIn = () => {
    const clientID = process.env.NEXT_PUBLIC_CLIENT_ID;
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientID}&scope=user`;
  };
  const onClickSignOut = () => {
    removeItem('token');
    const temp = client.readQuery({ query: RootInfoDocument });
    const data = { ...temp } as RootInfoQuery;
    data.me = null;
    client.writeQuery({ query: RootInfoDocument, data });
  };

  return (
    <>
      {signIn ? (
        <>
          {rootInfo?.me?.avatar && <img src={rootInfo.me.avatar} width="30" height="30" alt="" />}
          {rootInfo?.me?.name}
          <button onClick={onClickSignOut}>Sing Out</button>
        </>
      ) : (
        <button onClick={onClickSingIn} disabled={signIn}>
          Sign In with GitHub
        </button>
      )}
    </>
  );
};
