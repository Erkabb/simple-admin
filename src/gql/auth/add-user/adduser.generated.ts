import type * as Types from "../../graphql";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type AddUserMutationVariables = Types.Exact<{
  input: Types.AddUserInput;
}>;

export type AddUserMutation = {
  __typename?: "Mutation";
  addUser: {
    __typename?: "User";
    _id: string;
    email: string;
    password: string;
    firstname?: string | null;
    lastname?: string | null;
    role?: string | null;
    phoneNumber?: string | null;
    otp?: string | null;
    newPassword?: string | null;
    passwordResetToken?: string | null;
    passwordResetTokenExpire?: string | null;
    age?: string | null;
    isCompany?: boolean | null;
    companyName?: string | null;
    companyRegister?: string | null;
    pfp?: string | null;
    birthDate?: string | null;
    cookie?: string | null;
    status?: string | null;
    info?: string | null;
    nickname?: string | null;
    companyPhoneNumber?: string | null;
    createdAt: any;
    updatedAt: any;
  };
};

export const AddUserDocument = gql`
  mutation AddUser($input: AddUserInput!) {
    addUser(input: $input) {
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
  }
`;
export type AddUserMutationFn = Apollo.MutationFunction<
  AddUserMutation,
  AddUserMutationVariables
>;

/**
 * __useAddUserMutation__
 *
 * To run a mutation, you first call `useAddUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserMutation, { data, loading, error }] = useAddUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddUserMutation,
    AddUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddUserMutation, AddUserMutationVariables>(
    AddUserDocument,
    options,
  );
}
export type AddUserMutationHookResult = ReturnType<typeof useAddUserMutation>;
export type AddUserMutationResult = Apollo.MutationResult<AddUserMutation>;
export type AddUserMutationOptions = Apollo.BaseMutationOptions<
  AddUserMutation,
  AddUserMutationVariables
>;
