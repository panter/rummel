import {
  LogoutMutation,
  LogoutMutationVariables,
} from '../../../@generated/graphql';
import { gql, useMutation } from '@apollo/client';

const logoutMutation = gql`
  mutation Logout {
    logout {
      id
    }
  }
`;

export const useLogout = () => {
  const [logout, { error, loading, data }] = useMutation<
    LogoutMutation,
    LogoutMutationVariables
  >(logoutMutation);

  return { logout, error, data, loading };
};
