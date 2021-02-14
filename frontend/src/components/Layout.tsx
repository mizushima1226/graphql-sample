import React, { ReactNode } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useApolloClient } from '@apollo/client';

import { AuthorizedUser } from './AuthorizedUser';
import { useListenForUserSubscription, RootInfoDocument, RootInfoQuery } from '../generated/graphql';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = (props: Props) => {
  const { children, title = 'This is the default title' } = props;
  const client = useApolloClient();
  useListenForUserSubscription({
    onSubscriptionData: (data) => {
      const newUser = data.subscriptionData.data?.newUser;
      if (!newUser) return;

      const temp = client.readQuery<RootInfoQuery>({ query: RootInfoDocument });
      if (!temp) return;

      const rootInfo = { ...temp };
      rootInfo.totalUsers += 1;
      rootInfo.allUsers = [...temp.allUsers, newUser];
      client.writeQuery({ query: RootInfoDocument, data: rootInfo });
    },
  });

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>{' '}
          |{' '}
          <Link href="/about">
            <a>About</a>
          </Link>{' '}
          |{' '}
          <Link href="/users">
            <a>Users List</a>
          </Link>{' '}
          | <a href="/api/users">Users API</a>
          <AuthorizedUser />
        </nav>
      </header>
      {children}
      <footer>
        <hr />
        <span>Im here to stay (Footer)</span>
      </footer>
    </div>
  );
};

export default Layout;
