import { Task } from '../../../../@generated/graphql';
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
import { DateCheckboxFormInput } from '../../../forms/components/antd/input/DateCheckboxFormInput';
import { DatePickerFormInput } from '../../../forms/components/antd/input/DatePickerFormInput';
import { ExtractUseFormReturn } from '../../../ui/form/hooks/usePrismaForms';
import {
  MaterialsDepotCreateResource,
  MaterialsDepotUpdateResource,
} from '../../resource';

type MaterialsDepotTasksInputProps = {
  style?: React.CSSProperties;
  className?: string;
  form: ExtractUseFormReturn<
    typeof MaterialsDepotUpdateResource,
    typeof MaterialsDepotCreateResource
  >;
};
const Base = styled.div``;

export const MaterialsDepotTasksInput: React.FC<
  MaterialsDepotTasksInputProps
> = ({ style, className, form }) => {
  const { control, formItem } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tasks',
  });

  const newTask = (): any =>
    ({
      id: null as any,
      name: undefined,
      closedAt: undefined,
      dueDate: undefined,
    } as { [key in keyof Task]?: Task[key] });

  const { t } = useTranslation();
  return (
    <Base style={style} className={className}>
      <ManyRelationActions
        append={() => append(newTask())}
        dividerTitle="Aufgaben"
      />
      {sortBy(fields, 'createdAt').map((field, index) => (
        <div key={field.id}>
          <ManyRelationActions
            append={() => append(newTask())}
            remove={() => remove(index)}
          />
          <FormRow>
            <FormCol fullWidth>
              <InputsRow xs={[10, 10, 4]}>
                <AutocompleteFormInput
                  label={t('common:resources.Task.fields.name')}
                  formItem={formItem}
                  name={`tasks.${index}.name`}
                  labelKey="materials-depot-task-name"
                />
                <DatePickerFormInput
                  label={t('common:resources.Task.fields.dueDate')}
                  formItem={formItem}
                  name={`tasks.${index}.dueDate`}
                />
                <DateCheckboxFormInput
                  label={t('common:resources.Task.fields.closedAt')}
                  formItem={formItem}
                  name={`tasks.${index}.closedAt`}
                />
              </InputsRow>
            </FormCol>
          </FormRow>
        </div>
      ))}
    </Base>
  );
};
