import { LoginFormFields, useZkuLoginFlow } from '../hooks/useZkuLoginFlow';

import { Button } from 'antd';
import { FormContainer } from '../../forms/components/antd/FormComponents';
import React from 'react';
import { Spacer } from '../../ui/core/components/Spacer';
import { TextFormInput } from '../../forms/components/antd/input/TextFormInput';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';

type LoginFormProps = {};

export const LoginForm: React.FC<LoginFormProps> = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<LoginFormFields>();

  const { t } = useTranslation();

  const { triggerOtpLogin, finishOtpLogin, phase } = useZkuLoginFlow(setError);

  const onSubmit = async ({ email, otp }: LoginFormFields) => {
    clearErrors();

    if (!email) {
      return;
    }

    if (phase === 'trigger') {
      await triggerOtpLogin(email);
    } else if (phase === 'finish') {
      otp && (await finishOtpLogin(email, otp));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormContainer>
        {phase === 'finish' ? (
          <TextFormInput
            style={{ textAlign: 'center' }}
            name="otp"
            defaultValue="171323"
            control={control}
            rules={{ required: true }}
            label={t('common:auth.loginForm.otpCode.label')}
            inputProps={{ style: { textAlign: 'center' }, autoComplete: 'on' }}
          />
        ) : null}
        {phase === 'trigger' ? (
          <TextFormInput
            style={{ textAlign: 'center' }}
            name="email"
            control={control}
            rules={{ required: true }}
            label={t('common:auth.loginForm.email.label')}
            inputProps={{ style: { textAlign: 'center' }, autoComplete: 'on' }}
          />
        ) : null}
        <Spacer s={2} />
        <Button
          htmlType="submit"
          type="primary"
          style={{ alignSelf: 'center' }}
        >
          {t(
            phase === 'finish'
              ? 'common:auth.loginForm.submitLogin'
              : 'common:auth.loginForm.submitGetOptCode',
          )}
        </Button>
      </FormContainer>
    </form>
  );
};
