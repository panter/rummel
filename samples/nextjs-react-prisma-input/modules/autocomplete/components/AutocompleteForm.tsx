import { TextFormInput } from '../../forms/components/antd/input/TextFormInput';
import { ExtractUseFormReturn } from '../../ui/form/hooks/usePrismaForms';
import {
  AutocompleteCreateResource,
  AutocompleteUpdateResource,
} from '../resource';

export type AutocompleteFormProps = {
  form: ExtractUseFormReturn<
    typeof AutocompleteCreateResource,
    typeof AutocompleteUpdateResource
  >;
};

export const AutocompleteForm: React.FC<AutocompleteFormProps> = ({ form }) => {
  const { formItem } = form;
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
