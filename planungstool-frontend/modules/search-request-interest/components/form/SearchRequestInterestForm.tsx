import React from 'react';
import styled from 'styled-components';
import { BuildingComponentReferenceSelect } from '../../../building-component/resource';
import { FormContainer } from '../../../forms/components/antd/FormComponents';
import { ReferenceSelectFormInput } from '../../../forms/components/antd/input/ReferenceSelectFormInput';
import { TextAreaFormInput } from '../../../forms/components/antd/input/TextAreaFormInput';
import { SearchRequestReferenceSelect } from '../../../search-request/resource';
import { ExtractUseFormReturn } from '../../../ui/form/hooks/usePrismaForms';
import { UserReferenceSelect } from '../../../user/resource';
import {
  SearchRequestInterestCreateResource,
  SearchRequestInterestUpdateResource,
} from '../../resource';

type SearchRequestInterestFormProps = {
  style?: React.CSSProperties;
  className?: string;
  form: ExtractUseFormReturn<
    typeof SearchRequestInterestCreateResource,
    typeof SearchRequestInterestUpdateResource
  >;
};

const Base = styled.div``;

export const SearchRequestInterestForm: React.FC<
  SearchRequestInterestFormProps
> = ({ style, className, form }) => {
  const { formItem } = form;

  return (
    <Base style={style} className={className}>
      <FormContainer>
        <ReferenceSelectFormInput
          // readOnly
          name="searchRequest"
          formItem={formItem}
          selectProps={{ isMultiple: false, ...SearchRequestReferenceSelect }}
          rules={{ required: true }}
        />
        <ReferenceSelectFormInput
          name="responsibleUser"
          formItem={formItem}
          selectProps={{ isMultiple: false, ...UserReferenceSelect }}
          rules={{ required: true }}
        />
        <ReferenceSelectFormInput
          name="buildingComponent"
          formItem={formItem}
          selectProps={{
            isMultiple: false,
            ...BuildingComponentReferenceSelect,
          }}
          rules={{ required: true }}
        />
        <TextAreaFormInput formItem={formItem} name="notes" />
      </FormContainer>
    </Base>
  );
};
