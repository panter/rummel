import React from 'react';
import { AcceptSearchRequestInterestInput } from '../../../../@generated/graphql';
import {
  FormCol,
  FormRow,
  InputsRow,
} from '../../../forms/components/antd/FormsLayout';
import { useForm } from 'react-hook-form';
import { Alert, Input, Modal, Space, Typography } from 'antd';
import { FormContainer } from '../../../forms/components/antd/FormComponents';
import { NumberFormInput } from '../../../forms/components/antd/input/NumberFormInput';
import { FormInput } from '../../../forms/components/antd/FormInput';
import { NumberInput } from '../../../forms/components/antd/input/NumberInput';
import { ApolloError } from '@apollo/client';
import {
  getErrorCode,
  handleFormError,
} from '../../../../lib/graphqlErrorParser';
import { useTranslation } from 'next-i18next';
import { GraphQLErrorExtensions } from 'graphql/error';

interface SearchRequestInterestAcceptFormProps {
  open: boolean;
  onCreate: (reason: AcceptSearchRequestInterestInput) => void;
  onCancel: () => void;
  error?: ApolloError;
  searchRequestInterest: {
    id: string;
    buildingComponent: {
      id: string;
      name?: string | null;
      quantity?: number | null;
    };
  };
}

function parseDomainErrors(error: ApolloError) {
  const errorCode = getErrorCode(error);
  const errorExtensions: GraphQLErrorExtensions | undefined =
    error?.graphQLErrors['0']?.extensions;
  let domainErrors: string[] = [];
  if (errorExtensions) {
    const context: any = errorExtensions?.context;
    if (errorCode === 'UnableToAcceptSearchRequestInterestException') {
      domainErrors = context.errors || [];
    }
  }
  return domainErrors;
}

export const SearchRequestInterestAcceptForm: React.FC<
  SearchRequestInterestAcceptFormProps
> = ({ open, onCreate, onCancel, searchRequestInterest, error }) => {
  const { t } = useTranslation();
  const { control, handleSubmit, setError } =
    useForm<AcceptSearchRequestInterestInput>({
      defaultValues: {
        interestId: searchRequestInterest.id,
        buildingComponent: {
          buildingComponentId: searchRequestInterest.buildingComponent.id,
          amount: 1,
          amountReserved: 0,
        },
      },
    });

  let domainErrors: string[] = [];
  if (error) {
    handleFormError(error, { setError, t: t as any });
    domainErrors = parseDomainErrors(error);
  }

  return (
    <Modal
      open={open}
      title="Akzeptanz"
      okText="Akzeptieren"
      cancelText="Abbrechen"
      onCancel={onCancel}
      onOk={handleSubmit((data) => {
        onCreate(data);
      })}
    >
      <form>
        <FormContainer>
          <FormRow>
            <FormCol fullWidth>
              <InputsRow xs={[8, 6, 4, 4]}>
                <FormInput label="Bauteil">
                  <Input
                    value={searchRequestInterest.buildingComponent?.name || ''}
                    disabled
                  />
                </FormInput>
                <FormInput label="Available">
                  <NumberInput
                    value={
                      searchRequestInterest.buildingComponent.quantity || 0
                    }
                    disabled
                  />
                </FormInput>
                <NumberFormInput
                  control={control}
                  name={'buildingComponent.amount'}
                  label={`Anzahl`}
                  inputProps={{
                    min: 1,
                    max: searchRequestInterest.buildingComponent.quantity || 0,
                  }}
                />
                <NumberFormInput
                  control={control}
                  name={'buildingComponent.amountReserved'}
                  label={`Reserviert`}
                  inputProps={{
                    min: 1,
                    max: searchRequestInterest.buildingComponent.quantity || 0,
                  }}
                />
              </InputsRow>
            </FormCol>
          </FormRow>
        </FormContainer>
      </form>
      {domainErrors?.length ? (
        <Alert
          type="error"
          message={domainErrors.map((domainError, i) => {
            return (
              <Space key={i}>
                <Typography.Text>{domainError}</Typography.Text>
              </Space>
            );
          })}
        />
      ) : null}
    </Modal>
  );
};
