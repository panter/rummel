import { ExtractUseFormReturn } from '@panter/react-forms';
import {
  AutocompleteCreateResource,
  AutocompleteUpdateResource,
} from '../resource';
import { TextFormInput, useFormItem } from '@rummel/react-forms-ant';

export type AutocompleteFormProps = {
  form: ExtractUseFormReturn<
    typeof AutocompleteCreateResource,
    typeof AutocompleteUpdateResource
  >;
};

export const AutocompleteForm: React.FC<AutocompleteFormProps> = ({ form }) => {
  const formItem = useFormItem({ resourceId: 'autocomplete', form });
  return (
    <div>
      <TextFormInput
        name="key"
        formItem={formItem}
        rules={{ required: true }}
      />
      <TextFormInput
        name="value"
        formItem={formItem}
        rules={{ required: true }}
      />
    </div>
  );
};
