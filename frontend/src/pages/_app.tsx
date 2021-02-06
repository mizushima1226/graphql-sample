import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks';

import { useApollo } from '../lib/apolloClient';

const MyApp = (props: AppProps) => {
  const { Component, pageProps } = props;
  const client = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <Component {...pageProps} />
      </ApolloHooksProvider>
    </ApolloProvider>
  );
};

export default MyApp;
