import { useMemo } from 'react';
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist';

import { getItem } from '../utils/localStrageUtil';

let apolloClient: ApolloClient<NormalizedCacheObject>;

const createApolloClient = () => {
  const isClientSide = typeof window !== 'undefined';
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

  const cache = new InMemoryCache();
  if (isClientSide) {
    persistCache({
      cache,
      storage: new LocalStorageWrapper(window.localStorage),
    });
    const cachedItem = getItem('apollo-cache-persist');
    if (cachedItem) {
      const cachedData = JSON.parse(cachedItem);
      cache.restore(cachedData);
    }
  }

  return new ApolloClient({
    headers: {
      authorization: getItem('token'),
    },
    ssrMode: !isClientSide,
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
