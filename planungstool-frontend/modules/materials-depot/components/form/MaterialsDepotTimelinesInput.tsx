import {
  FormCol,
  FormRow,
  InputsRow,
} from '../../../forms/components/antd/FormsLayout';

import { sortBy } from 'lodash';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useFieldArray } from 'react-hook-form';
import styled from 'styled-components';
import { AutocompleteFormInput } from '../../../autocomplete/components/AutocompleteSelect';
import { ManyRelationActions } from '../../../forms/components/antd/ManyRelationActions';
import { DatePickerFormInput } from '../../../forms/components/antd/input/DatePickerFormInput';
import { ExtractUseFormReturn } from '../../../ui/form/hooks/usePrismaForms';
import {
  MaterialsDepotCreateResource,
  MaterialsDepotUpdateResource,
} from '../../resource';

type MaterialsDepotTimelinesInputProps = {
  style?: React.CSSProperties;
  className?: string;
  form: ExtractUseFormReturn<
    typeof MaterialsDepotUpdateResource,
    typeof MaterialsDepotCreateResource
  >;
};
const Base = styled.div``;

export const MaterialsDepotTimelinesInput: React.FC<
  MaterialsDepotTimelinesInputProps
> = ({ style, className, form }) => {
  const { control, formItem } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'timelines',
  });

  const newTimeline = () => ({
    id: null as any,
    description: undefined as any,
    startDate: new Date(),
    endDate: undefined,
    createdAt: new Date(),
  });

  const { t } = useTranslation();
  return (
    <Base style={style} className={className}>
      <ManyRelationActions
        append={() => append(newTimeline())}
        dividerTitle="Timelines"
      />
      {sortBy(fields, 'createdAt').map((field, index) => (
        <div key={field.id}>
          <ManyRelationActions
            append={() => append(newTimeline())}
            remove={() => remove(index)}
          />
          <FormRow>
            <FormCol fullWidth>
              <InputsRow xs={[12, 6, 6]}>
                <AutocompleteFormInput
                  label={t(
                    'common:resources.MaterialDepotTimeline.fields.description',
                  )}
                  formItem={formItem}
                  name={`timelines.${index}.description`}
                  labelKey="materials-depot-timeline-description"
                />
                <DatePickerFormInput
                  label={t(
                    'common:resources.MaterialDepotTimeline.fields.startDate',
                  )}
                  name={`timelines.${index}.startDate`}
                  formItem={formItem}
                />
                <DatePickerFormInput
                  label={t(
                    'common:resources.MaterialDepotTimeline.fields.endDate',
                  )}
                  name={`timelines.${index}.endDate`}
                  formItem={formItem}
                />
              </InputsRow>
            </FormCol>
          </FormRow>
        </div>
      ))}
    </Base>
  );
};
