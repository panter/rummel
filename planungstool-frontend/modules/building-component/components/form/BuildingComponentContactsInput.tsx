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
import { TextAreaFormInput } from '../../../forms/components/antd/input/TextAreaFormInput';
import { TextFormInput } from '../../../forms/components/antd/input/TextFormInput';
import { useCantonWatch } from '../../../materials-depot/hooks/useCantonWatch';
import { ExtractUseFormReturn } from '../../../ui/form/hooks/usePrismaForms';
import {
  BuildingComponentCreateResource,
  BuildingComponentUpdateResource,
} from '../../resource';

type BuildingComponentContactsInputProps = {
  style?: React.CSSProperties;
  className?: string;
  form: ExtractUseFormReturn<
    typeof BuildingComponentUpdateResource,
    typeof BuildingComponentCreateResource
  >;
};
const Base = styled.div``;

export const BuildingComponentContactsInput: React.FC<
  BuildingComponentContactsInputProps
> = ({ style, className, form }) => {
  const { control, formItem } = form;
  useCantonWatch(form);

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: 'contacts',
    },
  );

  const newContact = () => ({
    id: null as any,
    city: null,
    country: null,
    firstName: null,
    lastName: null,
    postalCode: null,
    street: null,
    type: null,
    contact1: null,
    contact2: null,
    firstLine: null,
    notes: null,
  });

  const { t } = useTranslation();
  return (
    <Base style={style} className={className}>
      <ManyRelationActions
        append={() => append(newContact())}
        dividerTitle="Kontakte"
      />
      {fields.map((field, index) => (
        <div key={field.id}>
          <ManyRelationActions
            append={() => append(newContact())}
            remove={() => remove(index)}
          />
          <FormRow>
            <FormCol>
              <AutocompleteFormInput
                label={t('common:resources.Contact.fields.type')}
                formItem={formItem}
                name={`contacts.${index}.type`}
                labelKey="materials-depot-contact-type"
              />
              <TextFormInput
                label={t('common:resources.Contact.fields.firstLine')}
                name={`contacts.${index}.firstLine`}
                formItem={formItem}
              />
              <TextFormInput
                label={t('common:resources.Contact.fields.firstName')}
                name={`contacts.${index}.firstName`}
                formItem={formItem}
              />
              <TextFormInput
                label={t('common:resources.Contact.fields.lastName')}
                name={`contacts.${index}.lastName`}
                formItem={formItem}
              />
              <TextFormInput
                label={t('common:resources.Contact.fields.contact1')}
                name={`contacts.${index}.contact1`}
                formItem={formItem}
              />
              <TextFormInput
                label={t('common:resources.Contact.fields.contact2')}
                name={`contacts.${index}.contact2`}
                formItem={formItem}
              />
            </FormCol>
            <FormCol>
              <TextFormInput
                label={t('common:resources.Contact.fields.street')}
                name={`contacts.${index}.street`}
                formItem={formItem}
              />
              <InputsRow xs={[6, 10, 8]}>
                <TextFormInput
                  label={t('common:resources.Contact.fields.postalCode')}
                  name={`contacts.${index}.postalCode`}
                  formItem={formItem}
                />
                <TextFormInput
                  label={t('common:resources.Contact.fields.canton')}
                  name={`contacts.${index}.canton`}
                  formItem={formItem}
                  disabled
                />

                <TextFormInput
                  label={t('common:resources.Contact.fields.city')}
                  name={`contacts.${index}.city`}
                  formItem={formItem}
                />
              </InputsRow>
              <TextFormInput
                label={t('common:resources.Contact.fields.country')}
                name={`contacts.${index}.country`}
                formItem={formItem}
              />
              <TextAreaFormInput
                label={t('common:resources.Contact.fields.notes')}
                name={`contacts.${index}.notes`}
                formItem={formItem}
              />
            </FormCol>
          </FormRow>
        </div>
      ))}
    </Base>
  );
};
