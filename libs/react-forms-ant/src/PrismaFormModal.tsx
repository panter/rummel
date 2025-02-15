import { OperationVariables } from '@apollo/client';
import { FieldValues } from 'react-hook-form';
import { PrismaInputArgs } from '@panter/prisma-inputs';
import { PrismaFormModalProps, usePrismaForm } from '@panter/react-forms';
import { useTranslation } from 'next-i18next';
import { FormModal } from './FormModal';

export const PrismaFormModal = <
  QData extends FieldValues,
  QVariables extends OperationVariables,
  MData extends FieldValues,
  MVariables extends OperationVariables,
  FModel extends FieldValues,
  SchemaModel,
>({
  isOpen,
  title,
  editTitlei18nKey = 'form.graphqlModal.title.edit',
  createTitlei18nKey = 'form.graphqlModal.title.create',
  modalProps,
  renderForm,
  children,
  ...graphQlFormProps
}: PrismaFormModalProps<
  QData,
  QVariables,
  MData,
  MVariables,
  FModel,
  PrismaInputArgs<MVariables>,
  SchemaModel
>) => {
  const { t } = useTranslation();

  const { formQuery: queryInfo, formMutation: schemaForm } =
    usePrismaForm(graphQlFormProps);

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
