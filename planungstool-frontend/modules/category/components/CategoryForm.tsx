import React from 'react';
import { NumberFormInput } from '../../forms/components/antd/input/NumberFormInput';
import { ReferenceSelectFormInput } from '../../forms/components/antd/input/ReferenceSelectFormInput';
import { TextAreaFormInput } from '../../forms/components/antd/input/TextAreaFormInput';
import { TextFormInput } from '../../forms/components/antd/input/TextFormInput';
import { ExtractUseFormReturn } from '../../ui/form/hooks/usePrismaForms';
import {
  CategoryCreateResource,
  CategoryReferenceSelect,
  CategoryUpdateResource,
} from '../resource';

export type CategoryFormProps = {
  form: ExtractUseFormReturn<
    typeof CategoryUpdateResource,
    typeof CategoryCreateResource
  >;
};
export const CategoryForm: React.FC<CategoryFormProps> = ({ form }) => {
  const { formItem } = form;
  return (
    <div>
      <TextFormInput name="name" formItem={formItem} />
      <NumberFormInput name="sortOrder" formItem={formItem} />
      <TextAreaFormInput name="description" formItem={formItem} />

      <ReferenceSelectFormInput
        name="parent"
        formItem={formItem}
        selectProps={{ isMultiple: false, ...CategoryReferenceSelect }}
      />
    </div>
  );
};
