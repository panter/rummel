import {
  FormCol,
  FormRow,
  InputsRow,
} from '../../../forms/components/antd/FormsLayout';
import {
  AssetExportButton,
  AssetExportRowDivider,
} from '../../../forms/components/assets-upload/components/AssetExportButton';

import { omit } from 'lodash';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { FormProvider } from 'react-hook-form';
import styled from 'styled-components';
import { MaterialsDepotState } from '../../../../@generated/graphql';
import { UploadedFile } from '../../../../lib/AssetUploader';
import { AutocompleteFormInput } from '../../../autocomplete/components/AutocompleteSelect';
import { CheckboxFormInput } from '../../../forms/components/antd/input/CheckboxFormInput';
import { EnumSelectInput } from '../../../forms/components/antd/input/EnumSelectInput';
import { NumberFormInput } from '../../../forms/components/antd/input/NumberFormInput';
import { ReferenceSelectFormInput } from '../../../forms/components/antd/input/ReferenceSelectFormInput';
import { TextAreaFormInput } from '../../../forms/components/antd/input/TextAreaFormInput';
import { TextFormInput } from '../../../forms/components/antd/input/TextFormInput';
import { IMAGE_MIME_TYPE_KEYS } from '../../../forms/components/assets-upload/components/AssetInput';
import { AssetsFormInput } from '../../../forms/components/assets-upload/components/AssetsFormInput';
import { ExtractUseFormReturn } from '../../../ui/form/hooks/usePrismaForms';
import { UserReferenceSelect } from '../../../user/resource';
import { useCantonWatch } from '../../hooks/useCantonWatch';
import {
  MaterialsDepotCreateResource,
  MaterialsDepotUpdateResource,
} from '../../resource';
import { MaterialsDepotContactsInput } from './MaterialsDepotContactsInput';
import { MaterialsDepotTasksInput } from './MaterialsDepotTasksInput';
import { MaterialsDepotTimelinesInput } from './MaterialsDepotTimelinesInput';

type MaterialsDepotFormProps = {
  style?: React.CSSProperties;
  className?: string;
  form: ExtractUseFormReturn<
    typeof MaterialsDepotUpdateResource,
    typeof MaterialsDepotCreateResource
  >;
};
const Base = styled.div``;

export const MaterialsDepotForm: React.FC<MaterialsDepotFormProps> = ({
  style,
  className,
  form,
}) => {
  const { t } = useTranslation();
  const { control, formItem, getValues } = form;
  useCantonWatch(form);

  const id = getValues('id');

  const newAssetFile = (file?: UploadedFile) => {
    if (!file) {
      return;
    }
    return {
      asset: {
        ...omit(file, 'publicUrl'),
        url: file?.publicUrl,
      },
    };
  };
  return (
    <FormProvider {...form}>
      <Base style={style} className={className}>
        <FormRow>
          <FormCol>
            <TextFormInput
              formItem={formItem}
              name="shortName"
              rules={{ required: true }}
            />
            <TextFormInput
              formItem={formItem}
              name="name"
              rules={{ required: true }}
            />
            <EnumSelectInput
              formItem={formItem}
              name="state"
              keys={MaterialsDepotState}
              label={t('common:common.status')}
              inputProps={{
                i18nPrefix: `common:enums.MaterialsDepotState`,
              }}
              rules={{ required: true }}
            />
            <AutocompleteFormInput
              formItem={formItem}
              name="complex"
              labelKey="materials-depot-complex"
            />
            <AutocompleteFormInput
              formItem={formItem}
              name="typology"
              labelKey="materials-depot-typology"
            />
            <AutocompleteFormInput
              formItem={formItem}
              name="interventionDepth"
              labelKey="materials-depot-interventionDepth"
            />
            <AutocompleteFormInput
              formItem={formItem}
              name="phase"
              labelKey="materials-depot-phase"
            />
            <NumberFormInput formItem={formItem} name="reUseRating" />
            <InputsRow xs={[6, 18]}>
              <NumberFormInput formItem={formItem} name="constructionYear" />
              <CheckboxFormInput
                formItem={formItem}
                name="constructionYearExact"
              />
            </InputsRow>
          </FormCol>
          <FormCol>
            <ReferenceSelectFormInput
              name="responsableUserId"
              formItem={formItem}
              selectProps={{ isMultiple: false, ...UserReferenceSelect }}
              rules={{ required: true }}
            />
            <TextFormInput formItem={formItem} name="googleMapsLink" />
            <TextFormInput formItem={formItem} name="street" />
            <InputsRow xs={[6, 10, 8]}>
              <TextFormInput formItem={formItem} name="postalCode" />
              <TextFormInput formItem={formItem} name="city" />
              <TextFormInput formItem={formItem} disabled name="canton" />
            </InputsRow>
            <TextAreaFormInput formItem={formItem} name="notes" />
            <TextAreaFormInput formItem={formItem} name="historyNotes" />
          </FormCol>
        </FormRow>
        <FormRow>
          <FormCol fullWidth>
            <MaterialsDepotContactsInput form={form} />
            <MaterialsDepotTasksInput form={form} />
            <MaterialsDepotTimelinesInput form={form} />
            <AssetExportRowDivider orientation="left" orientationMargin={0}>
              {t('common:common.assets')}
              <AssetExportButton
                label={t('common:common.download')}
                apiHref={`/assets-export/documents/materials-depot/${id}`}
              />
            </AssetExportRowDivider>
            <AssetsFormInput
              name="assets"
              control={control}
              assetToInput={({ field, file }) => {
                return {
                  ...field,
                  ...(newAssetFile(file) || (field?.asset as any)),
                };
              }}
              skipMimeTypes={IMAGE_MIME_TYPE_KEYS}
              i18nName="images"
            />
            <AssetExportRowDivider orientation="left" orientationMargin={0}>
              {t('common:common.images')}
              <AssetExportButton
                label={t('common:common.download')}
                apiHref={`/assets-export/images/materials-depot/${id}`}
              />
            </AssetExportRowDivider>
            <AssetsFormInput
              name="assets"
              control={control}
              assetToInput={({ field, file }) => {
                return {
                  id: '',
                  ...field,
                  ...(newAssetFile(file) || (field?.asset as any)),
                };
              }}
              mimeTypes={IMAGE_MIME_TYPE_KEYS}
              i18nName="images"
            />
          </FormCol>
        </FormRow>
      </Base>
    </FormProvider>
  );
};
