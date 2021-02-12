import { useReactiveVar } from '@apollo/client';
import { useEffect } from 'react';

import { useRootInfo } from '../../hooks/useRootInfo';

const Users = () => {
  const { rootInfo, getRootInfo, rootInfoQuery } = useRootInfo();

  useEffect(() => {
    getRootInfo();
  }, []);
  console.log(rootInfo);
  const onClickRefetch = () => getRootInfo();

  return (
    <>
      <h2>This is Users Page!!</h2>
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
