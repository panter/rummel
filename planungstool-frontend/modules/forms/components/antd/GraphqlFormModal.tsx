import { OperationVariables } from '@apollo/client';
import { useCallback, useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useVisibilityReducer } from '../../../ui/core/hooks/visiblityToggleReducer';
import { useGraphqlForm } from '../../../ui/form/hooks/useGraphqlForms';
import { FormModal } from './FormModal';
import { GraphqlFormModalProps } from '../../types';

export const GraphqlFormModal = <
  QData = any,
  QVariables extends OperationVariables = OperationVariables,
  MData = any,
  MVariables extends OperationVariables = OperationVariables,
  FModel extends FieldValues = MVariables,
>({
  isOpen,
  title,
  editTitlei18nKey = 'form.graphqlModal.title.edit',
  createTitlei18nKey = 'form.graphqlModal.title.create',
  modalProps,
  renderForm,
  children,
  ...graphQlFormProps
}: GraphqlFormModalProps<QData, QVariables, MData, MVariables, FModel>) => {
  const { t } = useTranslation();

  const { formQuery: queryInfo, formMutation: schemaForm } =
    useGraphqlForm(graphQlFormProps);

  return (
    <FormModal
      {...modalProps}
      open={isOpen}
      title={
        title ||
        t(
          // we take a leap of faith here and assume that if the query is not skipped, we are editing
          graphQlFormProps.skipQuery
            ? ('form.graphqlModal.title.edit' as any)
            : ('form.graphqlModal.title.create' as any),
        )
      }
      queryInfo={queryInfo}
      schemaForm={schemaForm}
      renderForm={
        renderForm
          ? () => {
              return renderForm({
                schemaForm,
                queryInfo,
                readOnly: graphQlFormProps.readOnly,
              });
            }
          : undefined
      }
    >
      {children}
    </FormModal>
  );
};

type UseGraphqlFormModalProps<
  QData = any,
  QVariables extends OperationVariables = OperationVariables,
  MData = any,
  MVariables extends OperationVariables = OperationVariables,
  FModel extends FieldValues = MVariables,
> = Omit<
  GraphqlFormModalProps<QData, QVariables, MData, MVariables, FModel>,
  'queryVariables' | 'skipQuery'
>;

export function useGraphqlFormModal<
  QData = any,
  QVariables extends OperationVariables = OperationVariables,
  MData = any,
  MVariables extends OperationVariables = OperationVariables,
  FModel extends FieldValues = MVariables,
>(
  props: UseGraphqlFormModalProps<QData, QVariables, MData, MVariables, FModel>,
): [
  (where?: QVariables, skipQuery?: boolean) => void,
  GraphqlFormModalProps<QData, QVariables, MData, MVariables, FModel>,
] {
  const { state: isOpen, show: doOpen, hide: doClose } = useVisibilityReducer();
  const [queryVariables, setQueryVariables] = useState<QVariables>();
  const [skipQuery, setSkipQuery] = useState<boolean>(true);

  const openForm = useCallback((where?: QVariables, skipQuery?: boolean) => {
    setQueryVariables(where);
    setSkipQuery(skipQuery || false);
    doOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClose = useCallback(() => {
    setQueryVariables(undefined);
    setSkipQuery(true);
    props.onClose?.();
    doClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.onClose]);

  return [
    openForm,
    {
      ...props,
      onClose,
      isOpen,
      skipQuery,
      queryVariables,
    },
  ];
}
