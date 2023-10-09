import { Alert } from 'antd';

export interface GenericErrorAlertProps {
  error: Error | undefined | null;
}

/**
 * GenericGraphQLErrorAlert renders an graphql error alert based on the provided error.
 */
export const GenericGraphQLErrorAlert: React.FC<GenericErrorAlertProps> = ({
  error,
}) => {
  if (!error) {
    return null;
  }
  return <Alert type="warning" message={error.message}></Alert>;
};
