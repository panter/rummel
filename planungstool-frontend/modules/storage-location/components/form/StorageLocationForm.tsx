import { Row } from 'antd';
import {
  FormCol,
  FormRow,
  InputsRow,
} from '../../../forms/components/antd/FormsLayout';
import {
  AssetExportButton,
  AssetExportRowDivider,
} from '../../../forms/components/assets-upload/components/AssetExportButton';

import { LinkOutlined } from '@ant-design/icons';
import { omit } from 'lodash';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { FormProvider } from 'react-hook-form';
import styled from 'styled-components';
import { UploadedFile } from '../../../../lib/AssetUploader';
import { TextAreaFormInput } from '../../../forms/components/antd/input/TextAreaFormInput';
import { TextFormInput } from '../../../forms/components/antd/input/TextFormInput';
import { IMAGE_MIME_TYPE_KEYS } from '../../../forms/components/assets-upload/components/AssetInput';
import { AssetsFormInput } from '../../../forms/components/assets-upload/components/AssetsFormInput';
import { useCantonWatch } from '../../../materials-depot/hooks/useCantonWatch';
import { ExtractUseFormReturn } from '../../../ui/form/hooks/usePrismaForms';
import {
  StorageLocationCreateResource,
  StorageLocationUpdateResource,
} from '../../resource';
import { StorageLocationContactsInput } from './StorageLocationContactsInput';

type StorageLocationFormProps = {
  style?: React.CSSProperties;
  className?: string;
  form: ExtractUseFormReturn<
    typeof StorageLocationCreateResource,
    typeof StorageLocationUpdateResource
  >;
};

const Base = styled.div``;

export const StorageLocationForm: React.FC<StorageLocationFormProps> = ({
  style,
  className,
  form,
}) => {
  const { t } = useTranslation();
  const { control, formItem, getValues, watch } = form;
  useCantonWatch(form);

  const id = getValues('id');
  const googleMapsLink = watch('googleMapsLink');

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
              name="name"
              rules={{ required: true }}
            />
            <Row>
              <TextFormInput formItem={formItem} name="googleMapsLink" />
              <a
                target="_blank"
                href={googleMapsLink || ''}
                style={{ marginLeft: 10, marginTop: 26 }}
              >
                <LinkOutlined />
              </a>
            </Row>
            <TextFormInput formItem={formItem} name="street" />
            <InputsRow xs={[6, 10, 8]}>
              <TextFormInput formItem={formItem} name="postalCode" />
              <TextFormInput formItem={formItem} name="city" />
              <TextFormInput formItem={formItem} disabled name="canton" />
            </InputsRow>
            <TextAreaFormInput formItem={formItem} name="notes" />
          </FormCol>
        </FormRow>
        <FormRow>
          <FormCol fullWidth>
            <StorageLocationContactsInput form={form} />
            <AssetExportRowDivider orientation="left" orientationMargin={0}>
              {t('common:common.images')}
              <AssetExportButton
                label={t('common:common.download')}
                apiHref={`/assets-export/images/storage-location/${id}`}
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
                apiHref={`/assets-export/documents/storage-location/${id}`}
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
    </FormProvider>
  );
};
