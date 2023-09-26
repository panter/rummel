import { useTranslation } from 'next-i18next';
import React from 'react';
import { useFieldArray } from 'react-hook-form';
import styled from 'styled-components';
import { AutocompleteFormInput } from '../../../autocomplete/components/AutocompleteSelect';
import {
  FormCol,
  FormRow,
  InputsRow,
} from '../../../forms/components/antd/FormsLayout';
import { ManyRelationActions } from '../../../forms/components/antd/ManyRelationActions';
import { NumberFormInput } from '../../../forms/components/antd/input/NumberFormInput';
import { ExtractUseFormReturn } from '../../../ui/form/hooks/usePrismaForms';
import {
  SearchRequestCreateResource,
  SearchRequestUpdateResource,
} from '../../resource';

type SearchRequestDimensionRangeInputProps = {
  style?: React.CSSProperties;
  className?: string;
  form: ExtractUseFormReturn<
    typeof SearchRequestCreateResource,
    typeof SearchRequestUpdateResource
  >;
};
const Base = styled.div``;

export const SearchRequestDimensionRangeInput: React.FC<
  SearchRequestDimensionRangeInputProps
> = ({ style, className, form }) => {
  const { control, formItem } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'dimensionRanges',
  });

  const newItem = () => ({
    id: null as any,
    minWidth: null,
    maxWidth: null,
    minHeight: null,
    maxHeight: null,
    minDepth: null,
    maxDepth: null,
  });

  const { t } = useTranslation();
  return (
    <Base style={style} className={className}>
      <ManyRelationActions
        dividerTitle={`Dimensionen in cm`}
        append={() => append(newItem())}
      />
      {fields.map((field, index) => (
        <div key={field.id}>
          <ManyRelationActions
            remove={() => remove(index)}
            append={() => append(newItem())}
          />
          <FormRow>
            <FormCol fullWidth>
              <InputsRow xs={[12, 12, 12, 12, 12, 12]} md={[4, 4, 4, 4, 4, 4]}>
                <NumberFormInput
                  label={t('common:resources.DimensionRange.fields.minWidth')}
                  name={`dimensionRanges.${index}.minWidth`}
                  formItem={formItem}
                />
                <NumberFormInput
                  label={t('common:resources.DimensionRange.fields.maxWidth')}
                  name={`dimensionRanges.${index}.maxWidth`}
                  formItem={formItem}
                />
                <NumberFormInput
                  label={t('common:resources.DimensionRange.fields.minHeight')}
                  name={`dimensionRanges.${index}.minHeight`}
                  formItem={formItem}
                />
                <NumberFormInput
                  label={t('common:resources.DimensionRange.fields.maxHeight')}
                  name={`dimensionRanges.${index}.maxHeight`}
                  formItem={formItem}
                />
                <NumberFormInput
                  label={t('common:resources.DimensionRange.fields.minDepth')}
                  name={`dimensionRanges.${index}.minDepth`}
                  formItem={formItem}
                />
                <NumberFormInput
                  label={t('common:resources.DimensionRange.fields.maxDepth')}
                  name={`dimensionRanges.${index}.maxDepth`}
                  formItem={formItem}
                />
              </InputsRow>
            </FormCol>
            <FormCol>
              <AutocompleteFormInput
                formItem={formItem}
                name={`dimensionRanges.${index}.type`}
                label={t('common:resources.Dimension.fields.type')}
                labelKey="search-request-dimension-range-type"
              />
            </FormCol>
          </FormRow>
        </div>
      ))}
    </Base>
  );
};
