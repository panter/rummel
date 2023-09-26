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
import { CheckboxFormInput } from '../../../forms/components/antd/input/CheckboxFormInput';
import { NumberFormInput } from '../../../forms/components/antd/input/NumberFormInput';
import { ExtractUseFormReturn } from '../../../ui/form/hooks/usePrismaForms';
import {
  BuildingComponentCreateResource,
  BuildingComponentUpdateResource,
} from '../../resource';

type BuildingComponentDimensionInputProps = {
  style?: React.CSSProperties;
  className?: string;
  form: ExtractUseFormReturn<
    typeof BuildingComponentCreateResource,
    typeof BuildingComponentUpdateResource
  >;
};
const Base = styled.div``;

export const BuildingComponentDimensionInput: React.FC<
  BuildingComponentDimensionInputProps
> = ({ style, className, form }) => {
  const { control, formItem } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'dimensions',
  });

  const newItem = () => ({
    id: null as any,
    width: null,
    height: null,
    depth: null,
    isExact: null,
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
              <InputsRow xs={[6, 6, 6, 6, 24]} md={[4, 4, 4, 2, 10]}>
                <NumberFormInput
                  label={t('common:resources.Dimension.fields.width')}
                  name={`dimensions.${index}.width`}
                  formItem={formItem}
                />
                <NumberFormInput
                  label={t('common:resources.Dimension.fields.height')}
                  name={`dimensions.${index}.height`}
                  formItem={formItem}
                />
                <NumberFormInput
                  label={t('common:resources.Dimension.fields.depth')}
                  name={`dimensions.${index}.depth`}
                  formItem={formItem}
                />
                <CheckboxFormInput
                  label={t('common:resources.Dimension.fields.isExact')}
                  name={`dimensions.${index}.isExact`}
                  formItem={formItem}
                />
                <AutocompleteFormInput
                  formItem={formItem}
                  label={t('common:resources.Dimension.fields.type')}
                  name={`dimensions.${index}.type`}
                  labelKey="building-component-dimension-type"
                />
              </InputsRow>
            </FormCol>
          </FormRow>
        </div>
      ))}
    </Base>
  );
};
