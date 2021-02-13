import { useMemo } from 'react';
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';

import { getItem } from '../utils/localStrageUtil';

let apolloClient: ApolloClient<NormalizedCacheObject>;
const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API,
});

const authLink = new ApolloLink((operation, forward) => {
  const token = getItem('token');
  operation.setContext({
    headers: {
      authorization: token,
    },
  });
  return forward(operation);
});

const createApolloClient = () => {
  return new ApolloClient({
    headers: {
      authorization: getItem('token'),
    },
    ssrMode: typeof window === 'undefined',
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export const initializeApollo = (initialState = null) => {
  const _apolloClient = apolloClient ?? createApolloClient();
  if (initialState) {
    const existingCache = _apolloClient.extract();
    _apolloClient.cache.restore(existingCache);
  }

  if (typeof window === 'undefined') {
    return _apolloClient;
  }

  if (!apolloClient) {
    apolloClient = _apolloClient;
  }

  return _apolloClient;
};

export const useApollo = (initialState: any) => {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
};
