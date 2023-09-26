import { ACCESS_TOKEN_KEY } from '../../../lib/apollo-client';
import { IsAuthenticatedQueryPoller } from './useIsAuthenticatedPoller';
import { UseFormSetError } from 'react-hook-form';
import { graphql } from '../../../@generated';
import { useOtpLoginFlow } from '../../ui/auth/hooks/useOtpLoginFlow';
import { useTranslation } from 'next-i18next';

export type LoginFormFields = { email?: string; otp?: string }; // TODO type

const FinishOtpLoginFlowMutation = graphql(/* GraphQL */ `
  mutation FinishOtpFlowLogin($input: FinishOtpLoginInput!) {
    finishOtpLogin(input: $input) {
      user {
        id
      }
      access_token
    }
  }
`);

const TriggerOtpLoginFlowMutation = graphql(/* GraphQL */ `
  mutation TriggerOtpFlowLogin($input: TriggerOtpLoginInput!) {
    triggerOtpLogin(input: $input)
  }
`);

export const useZkuLoginFlow = (setError: UseFormSetError<LoginFormFields>) => {
  const { t } = useTranslation();
  return useOtpLoginFlow({
    triggerMutation: TriggerOtpLoginFlowMutation,
    finishMutation: FinishOtpLoginFlowMutation,
    triggerVariables: (email) => ({ input: { email } }),
    finishVariables: (email, otp) => ({ input: { email, otp } }),
    onTriggerError: () => {
      setError('email', { message: t('common:auth.loginForm.email.error') });
    },
    onFinishError: () => {
      setError('otp', { message: t('common:auth.loginForm.otpCode.error') });
    },
    onFinish: (cache, result) => {
      const meId = result?.data?.finishOtpLogin?.user?.id;

      if (result?.data?.finishOtpLogin?.access_token) {
        localStorage.setItem(
          ACCESS_TOKEN_KEY,
          result.data.finishOtpLogin.access_token,
        );
      }

      if (meId) {
        cache.writeQuery({
          query: IsAuthenticatedQueryPoller,
          data: {
            me: { id: meId },
          },
        });
      }
    },
  });
};
