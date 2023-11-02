import { ExtractUseFormReturn } from '@panter/react-forms';
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
  return (
    <div>
      <input {...form.register('key')} />
      <input {...form.register('key', { required: true })} />
    </div>
  );
};
