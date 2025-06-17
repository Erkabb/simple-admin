import * as Types from '../graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type LoginMutationVariables = Types.Exact<{
  input: Types.LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', token: string, user: { __typename?: 'User', _id: string, email: string, password: string, firstname?: string | null, lastname?: string | null, role?: string | null, phoneNumber?: string | null, otp?: string | null, newPassword?: string | null, passwordResetToken?: string | null, passwordResetTokenExpire?: string | null, age?: string | null, isCompany?: boolean | null, companyName?: string | null, companyRegister?: string | null, pfp?: string | null, birthDate?: string | null, cookie?: string | null, status?: string | null, info?: string | null, nickname?: string | null, companyPhoneNumber?: string | null, createdAt: any, updatedAt: any } } };


export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    user {
      _id
      email
      password
      firstname
      lastname
      role
      phoneNumber
      otp
      newPassword
      passwordResetToken
      passwordResetTokenExpire
      age
      isCompany
      companyName
      companyRegister
      pfp
      birthDate
      cookie
      status
      info
      nickname
      companyPhoneNumber
      createdAt
      updatedAt
    }
    token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;