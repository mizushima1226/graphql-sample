import { useEffect } from 'react';

import { useRootInfo } from '../../hooks/useRootInfo';
import { useUser } from '../../hooks/useUser';

const Users = () => {
  const { rootInfo, getRootInfo, rootInfoQuery } = useRootInfo();
  const { fakeUsers, addFakeUsers, addFakeUsersMatation } = useUser();

  useEffect(() => {
    getRootInfo();
  }, []);

  const onClickRefetch = () => getRootInfo();
  const onClickAddFakeUsers = () => addFakeUsers({ variables: { count: 1 } });

  return (
    <>
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
    </>
  );
};

export default Users;
