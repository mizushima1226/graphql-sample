import { useEffect } from 'react';
import { useApolloClient } from '@apollo/client';

import Layout from '../../components/Layout';
import { RootInfoDocument, RootInfoQuery } from '../../generated/graphql';
import { useRootInfo } from '../../hooks/useRootInfo';
import { useUser } from '../../hooks/useUser';

const Users = () => {
  const client = useApolloClient();
  const { rootInfo, getRootInfo, rootInfoQuery } = useRootInfo();
  const { fakeUsers, addFakeUsers, addFakeUsersMatation } = useUser();

  useEffect(() => {
    getRootInfo();
  }, []);
  // フェイクユーザー追加後apolloのキャッシュを変更
  useEffect(() => {
    if (!fakeUsers || fakeUsers.length === 0) return;
    const temp = client.cache.readQuery<RootInfoQuery>({ query: RootInfoDocument });
    if (!temp) return;
    const data = { ...temp };
    data.totalUsers += fakeUsers.length;
    data.allUsers = [...data.allUsers, ...fakeUsers];
    // client.cache.writeQuery({ query: RootInfoDocument, data });
  }, [fakeUsers]);

  const onClickRefetch = () => getRootInfo();
  const onClickAddFakeUsers = () => addFakeUsers({ variables: { count: 1 } });

  return (
    <Layout>
      <h2>This is Users Page!!</h2>
      <button onClick={onClickAddFakeUsers}>Add Fake Users</button>
      {addFakeUsersMatation.loading ? (
        <p>フェイクユーザー登録中・・・</p>
      ) : fakeUsers && fakeUsers.length > 0 ? (
        <>
          <p>ユーザーを登録しました</p>
          <ul>
            {fakeUsers?.map((user) => (
              <li key={user.githubLogin}>
                <img src={user.avatar || ''} alt="" />
                {user.name}
              </li>
            ))}
          </ul>
        </>
      ) : null}
      <hr />
      {rootInfoQuery.loading ? (
        <p>loading...</p>
      ) : (
        <>
          <p> users count : {rootInfo?.totalUsers}</p>

          <button onClick={onClickRefetch}>Refetch</button>
          <ul>
            {rootInfo?.allUsers.map((user) => (
              <li key={user.githubLogin}>
                <img src={user.avatar || ''} alt="" width="48" height="48" />
                {user.name}
              </li>
            ))}
          </ul>
        </>
      )}
    </Layout>
  );
};

export default Users;
