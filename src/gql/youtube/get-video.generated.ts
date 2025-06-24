import type * as Types from "../graphql";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type GetVideosQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetVideosQuery = {
  __typename?: "Query";
  getVideos: Array<{
    __typename?: "VideoUpload";
    _id: string;
    title: string;
    description?: string | null;
    thumbnail?: string | null;
    publishedAt?: any | null;
    duration?: string | null;
    viewCount?: number | null;
    likeCount?: number | null;
    videoId?: string | null;
    youtubeUrl: string;
    channelTitle?: string | null;
  }>;
};

export const GetVideosDocument = gql`
  query GetVideos {
    getVideos {
      _id
      title
      description
      thumbnail
      publishedAt
      duration
      viewCount
      likeCount
      videoId
      youtubeUrl
      channelTitle
    }
  }
`;

/**
 * __useGetVideosQuery__
 *
 * To run a query within a React component, call `useGetVideosQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVideosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVideosQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetVideosQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetVideosQuery,
    GetVideosQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetVideosQuery, GetVideosQueryVariables>(
    GetVideosDocument,
    options,
  );
}
export function useGetVideosLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetVideosQuery,
    GetVideosQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetVideosQuery, GetVideosQueryVariables>(
    GetVideosDocument,
    options,
  );
}
export function useGetVideosSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetVideosQuery, GetVideosQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetVideosQuery, GetVideosQueryVariables>(
    GetVideosDocument,
    options,
  );
}
export type GetVideosQueryHookResult = ReturnType<typeof useGetVideosQuery>;
export type GetVideosLazyQueryHookResult = ReturnType<
  typeof useGetVideosLazyQuery
>;
export type GetVideosSuspenseQueryHookResult = ReturnType<
  typeof useGetVideosSuspenseQuery
>;
export type GetVideosQueryResult = Apollo.QueryResult<
  GetVideosQuery,
  GetVideosQueryVariables
>;
