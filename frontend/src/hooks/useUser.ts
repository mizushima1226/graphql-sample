import { useState } from 'react';

import { useAddFakeUsersMutation, AddFakeUsersMutation } from '../generated/graphql';
import { userErrorHandling } from './userErrorHandling';

export const useUser = () => {
  const [fakeUsers, setFakeUsers] = useState<AddFakeUsersMutation['addFakeUsers'] | null>(null);
  const { errorHandling } = userErrorHandling();

  const [addFakeUsers, addFakeUsersMatation] = useAddFakeUsersMutation({
    onCompleted: (data) => setFakeUsers(data.addFakeUsers),
    onError: (err) => errorHandling(err),
  });

  return { fakeUsers, addFakeUsers, addFakeUsersMatation };
};
