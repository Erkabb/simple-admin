import type * as Types from "../graphql";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type UploadVideoMutationVariables = Types.Exact<{
  input: Types.VideoUploadInput;
}>;

export type UploadVideoMutation = {
  __typename?: "Mutation";
  uploadVideo: {
    __typename?: "VideoUploadResponse";
    message: string;
    success: boolean;
    video?: {
      __typename?: "VideoUpload";
      _id: string;
      title: string;
      description?: string | null;
      thumbnail?: string | null;
      unitPrice?: number | null;
      level: string;
      category?: string | null;
      channelTitle?: string | null;
      youtubeUrl: {
        __typename?: "YoutubeUrlType";
        id: string;
        name?: string | null;
        url?: string | null;
      };
    } | null;
  };
};

export const UploadVideoDocument = gql`
  mutation UploadVideo($input: VideoUploadInput!) {
    uploadVideo(input: $input) {
      message
      success
      video {
        _id
        title
        description
        thumbnail
        unitPrice
        level
        category
        youtubeUrl {
          id
          name
          url
        }
        channelTitle
      }
    }
  }
`;
export type UploadVideoMutationFn = Apollo.MutationFunction<
  UploadVideoMutation,
  UploadVideoMutationVariables
>;

/**
 * __useUploadVideoMutation__
 *
 * To run a mutation, you first call `useUploadVideoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadVideoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadVideoMutation, { data, loading, error }] = useUploadVideoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUploadVideoMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UploadVideoMutation,
    UploadVideoMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UploadVideoMutation, UploadVideoMutationVariables>(
    UploadVideoDocument,
    options,
  );
}
export type UploadVideoMutationHookResult = ReturnType<
  typeof useUploadVideoMutation
>;
export type UploadVideoMutationResult =
  Apollo.MutationResult<UploadVideoMutation>;
export type UploadVideoMutationOptions = Apollo.BaseMutationOptions<
  UploadVideoMutation,
  UploadVideoMutationVariables
>;
