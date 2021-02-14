import { useMemo } from 'react';
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, NormalizedCacheObject, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from 'apollo-utilities';
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist';

import { getItem } from '../utils/localStrageUtil';

let apolloClient: ApolloClient<NormalizedCacheObject>;

const createApolloClient = () => {
  const wsLink = process.browser
    ? new WebSocketLink({
        uri: `ws://localhost:5000/graphql`,
        options: { reconnect: true },
      })
    : undefined;
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
  const httpAuthLink = authLink.concat(httpLink);
  const link = split(
    ({ query }) => {
      const def = getMainDefinition(query);
      return def.kind === 'OperationDefinition' && def.operation !== 'subscription';
    },
    httpAuthLink,
    wsLink,
  );

  const cache = new InMemoryCache();
  if (process.browser) {
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
    ssrMode: !process.browser,
    link: link,
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
