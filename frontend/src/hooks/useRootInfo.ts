import { useState } from 'react';

import { useRootInfoLazyQuery, RootInfoQuery } from 'generated/graphql';
import { userErrorHandling } from './userErrorHandling';

export const useRootInfo = () => {
  const { errorHandling } = userErrorHandling();
  const [rootInfo, setRootInfo] = useState<RootInfoQuery | null>(null);

  const [getRootInfo, rootInfoQuery] = useRootInfoLazyQuery({
    fetchPolicy: 'network-only',
    onCompleted: (data) => setRootInfo(data),
    onError: (err) => errorHandling(err),
  });

  return { getRootInfo, rootInfoQuery, rootInfo };
};
