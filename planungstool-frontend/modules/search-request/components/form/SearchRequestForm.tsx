import {
  QuantityUnit,
  SearchRequestState,
} from '../../../../@generated/graphql';
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
import styled from 'styled-components';
import { UploadedFile } from '../../../../lib/AssetUploader';
import { AutocompleteFormInput } from '../../../autocomplete/components/AutocompleteSelect';
import { CategoryReferenceSelect } from '../../../category/resource';
import { EbkphCategoryReferenceSelect } from '../../../ebkphCategory/resource';
import { DatePickerFormInput } from '../../../forms/components/antd/input/DatePickerFormInput';
import { EnumSelectInput } from '../../../forms/components/antd/input/EnumSelectInput';
import { NumberFormInput } from '../../../forms/components/antd/input/NumberFormInput';
import { ReferenceSelectFormInput } from '../../../forms/components/antd/input/ReferenceSelectFormInput';
import { TextAreaFormInput } from '../../../forms/components/antd/input/TextAreaFormInput';
import { TextFormInput } from '../../../forms/components/antd/input/TextFormInput';
import { IMAGE_MIME_TYPE_KEYS } from '../../../forms/components/assets-upload/components/AssetInput';
import { AssetsFormInput } from '../../../forms/components/assets-upload/components/AssetsFormInput';
import { ProjectReferenceSelect } from '../../../project/resource';
import { UserReferenceSelect } from '../../../user/resource';
import {
  SearchRequestCreateResource,
  SearchRequestUpdateResource,
} from '../../resource';
import { SearchRequestDimensionRangeInput } from './SearchRequestDimensionRangeInput';
import { ExtractUseFormReturn } from '../../../ui/form/hooks/usePrismaForms';

type SearchRequestFormProps = {
  style?: React.CSSProperties;
  className?: string;
  form: ExtractUseFormReturn<
    typeof SearchRequestCreateResource,
    typeof SearchRequestUpdateResource
  >;
};

const Base = styled.div``;

export const SearchRequestForm: React.FC<SearchRequestFormProps> = ({
  style,
  className,
  form,
}) => {
  const { t } = useTranslation();
  const { formItem, control, getValues } = form;
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
    <Base style={style} className={className}>
      <FormRow>
        <FormCol>
          <ReferenceSelectFormInput
            readOnly
            name="projectId"
            formItem={formItem}
            selectProps={{ isMultiple: false, ...ProjectReferenceSelect }}
            rules={{ required: true }}
          />

          <ReferenceSelectFormInput
            name="categoryId"
            formItem={formItem}
            selectProps={{ isMultiple: false, ...CategoryReferenceSelect }}
            rules={{ required: true }}
          />
          <ReferenceSelectFormInput
            name="ebkphCategoryId"
            formItem={formItem}
            selectProps={{ isMultiple: false, ...EbkphCategoryReferenceSelect }}
          />
          <TextFormInput
            formItem={formItem}
            name="buildingComponentName"
            rules={{ required: true }}
          />
          <TextAreaFormInput
            formItem={formItem}
            name="buildingComponentDescription"
          />
          <TextAreaFormInput formItem={formItem} name="searchConceptNotes" />
        </FormCol>
        <FormCol>
          <EnumSelectInput
            formItem={formItem}
            name="state"
            keys={SearchRequestState}
            label={t('common:common.status')}
            inputProps={{
              i18nPrefix: `common:enums.SearchRequestState`,
            }}
            rules={{ required: true }}
          />
          <ReferenceSelectFormInput
            name="responsibleUserId"
            formItem={formItem}
            selectProps={{ isMultiple: false, ...UserReferenceSelect }}
            rules={{ required: true }}
          />
          <DatePickerFormInput
            name="createdAt"
            label={t('common:common.createdAt')}
            formItem={formItem}
            disabled
          />
          <InputsRow xs={[6, 18]}>
            <NumberFormInput formItem={formItem} name="quantity" />
            <EnumSelectInput
              formItem={formItem}
              name="quantityUnit"
              keys={QuantityUnit}
            />
          </InputsRow>
          <InputsRow xs={[12, 12]}>
            <NumberFormInput
              formItem={formItem}
              name="quantity"
              label="todo"
              disabled
            />
            <NumberFormInput
              formItem={formItem}
              name="quantity"
              label="todo"
              disabled
            />
          </InputsRow>
          <InputsRow xs={[12, 12]}>
            <DatePickerFormInput name="deadlineFound" formItem={formItem} />
            <DatePickerFormInput name="deadlineShipment" formItem={formItem} />
          </InputsRow>
          <TextAreaFormInput formItem={formItem} name="huntingStatusNotes" />
        </FormCol>
      </FormRow>
      <FormRow>
        <FormCol fullWidth>
          <SearchRequestDimensionRangeInput form={form} />
        </FormCol>
      </FormRow>
      <FormRow>
        <FormCol>
          <AutocompleteFormInput
            formItem={formItem}
            name="fallbackLevel"
            labelKey="search-request-fallback-level"
          />
          <NumberFormInput name="fallbackLevelCO2PerUnit" formItem={formItem} />
          <NumberFormInput name="fallbackLevelCO2Total" formItem={formItem} />
          <TextAreaFormInput formItem={formItem} name="fireProtectionNotes" />
          <TextAreaFormInput formItem={formItem} name="securityNotes" />
        </FormCol>
        <FormCol>
          <NumberFormInput name="budgetInRappens" formItem={formItem} />
          <TextAreaFormInput formItem={formItem} name="budgetNotes" />
          <TextAreaFormInput formItem={formItem} name="soundProofNotes" />
          <TextAreaFormInput formItem={formItem} name="comments" />
        </FormCol>

        <FormCol fullWidth>
          <AssetExportRowDivider orientation="left" orientationMargin={0}>
            {t('common:common.images')}
            <AssetExportButton
              label={t('common:common.download')}
              apiHref={`/assets-export/images/search-request/${id}`}
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
            mimeTypes={IMAGE_MIME_TYPE_KEYS}
            i18nName="images"
          />
          <AssetExportRowDivider orientation="left" orientationMargin={0}>
            {t('common:common.assets')}
            <AssetExportButton
              label={t('common:common.download')}
              apiHref={`/assets-export/documents/search-request/${id}`}
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
        </FormCol>
      </FormRow>
    </Base>
  );
};
