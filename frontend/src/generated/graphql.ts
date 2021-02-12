import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  allPhotos: Array<Photo>;
  allUsers: Array<User>;
  me?: Maybe<User>;
  totalPhotos: Scalars['Int'];
  totalUsers: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']>;
  category: PhotoCategory;
  description?: Maybe<Scalars['String']>;
  githubLogin?: Maybe<Scalars['String']>;
  githubToken?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  inPhotos: Array<Photo>;
  name: Scalars['String'];
  postedPhotos: Array<Photo>;
  url: Scalars['String'];
};

export type Photo = {
  __typename?: 'Photo';
  category: PhotoCategory;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  githubUser?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  postedBy: User;
  taggedUsers: Array<User>;
  url: Scalars['String'];
  userID: Scalars['String'];
};

export enum PhotoCategory {
  Selfie = 'SELFIE',
  Portrait = 'PORTRAIT',
  Action = 'ACTION',
  Landscape = 'LANDSCAPE',
  Graphic = 'GRAPHIC',
}

export type Mutation = {
  __typename?: 'Mutation';
  addFakeUsers: Array<User>;
  fakeUserAuth: AuthPayload;
  githubAuth: AuthPayload;
  postPhoto: Photo;
};

export type MutationAddFakeUsersArgs = {
  count?: Maybe<Scalars['Int']>;
};

export type MutationFakeUserAuthArgs = {
  githubLogin: Scalars['ID'];
};

export type MutationGithubAuthArgs = {
  code: Scalars['String'];
};

export type MutationPostPhotoArgs = {
  input: PostPhotoInput;
};

export type PostPhotoInput = {
  category?: Maybe<PhotoCategory>;
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String'];
  user: User;
};

export type AddFakeUsersMutationVariables = Exact<{
  count?: Maybe<Scalars['Int']>;
}>;

export type AddFakeUsersMutation = { __typename?: 'Mutation' } & {
  addFakeUsers: Array<{ __typename?: 'User' } & Pick<User, 'githubLogin' | 'name' | 'avatar'>>;
};

export type RootInfoQueryVariables = Exact<{ [key: string]: never }>;

export type RootInfoQuery = { __typename?: 'Query' } & Pick<Query, 'totalUsers'> & {
    allUsers: Array<{ __typename?: 'User' } & Pick<User, 'githubLogin' | 'name' | 'avatar'>>;
  };

export const AddFakeUsersDocument = gql`
  mutation addFakeUsers($count: Int = 1) {
    addFakeUsers(count: $count) {
      githubLogin
      name
      avatar
    }
  }
`;
export type AddFakeUsersMutationFn = Apollo.MutationFunction<AddFakeUsersMutation, AddFakeUsersMutationVariables>;

/**
 * __useAddFakeUsersMutation__
 *
 * To run a mutation, you first call `useAddFakeUsersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddFakeUsersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addFakeUsersMutation, { data, loading, error }] = useAddFakeUsersMutation({
 *   variables: {
 *      count: // value for 'count'
 *   },
 * });
 */
export function useAddFakeUsersMutation(
  baseOptions?: Apollo.MutationHookOptions<AddFakeUsersMutation, AddFakeUsersMutationVariables>,
) {
  return Apollo.useMutation<AddFakeUsersMutation, AddFakeUsersMutationVariables>(AddFakeUsersDocument, baseOptions);
}
export type AddFakeUsersMutationHookResult = ReturnType<typeof useAddFakeUsersMutation>;
export type AddFakeUsersMutationResult = Apollo.MutationResult<AddFakeUsersMutation>;
export type AddFakeUsersMutationOptions = Apollo.BaseMutationOptions<
  AddFakeUsersMutation,
  AddFakeUsersMutationVariables
>;
export const RootInfoDocument = gql`
  query rootInfo {
    totalUsers
    allUsers {
      githubLogin
      name
      avatar
    }
  }
`;

/**
 * __useRootInfoQuery__
 *
 * To run a query within a React component, call `useRootInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useRootInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRootInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useRootInfoQuery(baseOptions?: Apollo.QueryHookOptions<RootInfoQuery, RootInfoQueryVariables>) {
  return Apollo.useQuery<RootInfoQuery, RootInfoQueryVariables>(RootInfoDocument, baseOptions);
}
export function useRootInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RootInfoQuery, RootInfoQueryVariables>) {
  return Apollo.useLazyQuery<RootInfoQuery, RootInfoQueryVariables>(RootInfoDocument, baseOptions);
}
export type RootInfoQueryHookResult = ReturnType<typeof useRootInfoQuery>;
export type RootInfoLazyQueryHookResult = ReturnType<typeof useRootInfoLazyQuery>;
export type RootInfoQueryResult = Apollo.QueryResult<RootInfoQuery, RootInfoQueryVariables>;
