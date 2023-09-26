import React from 'react';
import { ReferenceSelectFormInput } from '../../forms/components/antd/input/ReferenceSelectFormInput';
import { TextAreaFormInput } from '../../forms/components/antd/input/TextAreaFormInput';
import { TextFormInput } from '../../forms/components/antd/input/TextFormInput';
import { ExtractUseFormReturn } from '../../ui/form/hooks/usePrismaForms';
import {
  EbkphCategoryCreateResource,
  EbkphCategoryReferenceSelect,
  EbkphCategoryUpdateResource,
} from '../resource';

export type EbkphCategoryFormProps = {
  form: ExtractUseFormReturn<
    typeof EbkphCategoryCreateResource,
    typeof EbkphCategoryUpdateResource
  >;
};
export const EbkphCategoryForm: React.FC<EbkphCategoryFormProps> = ({
  form,
}) => {
  const { formItem } = form;
  return (
    <div>
      <TextFormInput name="name" formItem={formItem} />
      <TextAreaFormInput name="description" formItem={formItem} />

      <ReferenceSelectFormInput
        name="parentId"
        formItem={formItem}
        selectProps={{ isMultiple: false, ...EbkphCategoryReferenceSelect }}
      />
    </div>
  );
};
