import {
  AssetExportButton,
  Base as AssetExportButtonBase,
} from '../../../forms/components/assets-upload/components/AssetExportButton';
import { ExtractUseFormReturn } from '../../../ui/form/hooks/usePrismaForms';

import { Divider } from 'antd';
import { omit } from 'lodash';
import { useTranslation } from 'next-i18next';
import React from 'react';
import styled from 'styled-components';
import { ProjectPhase, ProjectState } from '../../../../@generated/graphql';
import { UploadedFile } from '../../../../lib/AssetUploader';
import {
  FormCol,
  FormRow,
  InputsRow,
} from '../../../forms/components/antd/FormsLayout';
import { EnumSelectInput } from '../../../forms/components/antd/input/EnumSelectInput';
import { ReferenceSelectFormInput } from '../../../forms/components/antd/input/ReferenceSelectFormInput';
import { TextAreaFormInput } from '../../../forms/components/antd/input/TextAreaFormInput';
import { TextFormInput } from '../../../forms/components/antd/input/TextFormInput';
import { IMAGE_MIME_TYPE_KEYS } from '../../../forms/components/assets-upload/components/AssetInput';
import { AssetsFormInput } from '../../../forms/components/assets-upload/components/AssetsFormInput';
import { useCantonWatch } from '../../../materials-depot/hooks/useCantonWatch';
import { UserReferenceSelect } from '../../../user/resource';
import { ProjectCreateResource, ProjectUpdateResource } from '../../resource';
import { ProjectContactsInput } from './ProjectContactsInput';

type ProjectFormProps = {
  style?: React.CSSProperties;
  className?: string;
  form: ExtractUseFormReturn<
    typeof ProjectCreateResource,
    typeof ProjectUpdateResource
  >;
};

const Base = styled.div``;

const RowDivider = styled(Divider)`
  .ant-divider-inner-text {
    display: flex;
    flex-direction: row;

    ${AssetExportButtonBase} {
      margin-left: 12px;
    }
  }
`;

export const ProjectForm: React.FC<ProjectFormProps> = ({
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
            keys={ProjectState}
            label={t('common:common.status')}
            inputProps={{
              i18nPrefix: `common:enums.ProjectState`,
            }}
          />
          <EnumSelectInput
            formItem={formItem}
            name="phase"
            keys={ProjectPhase}
            label={t('common:common.phase')}
            inputProps={{
              i18nPrefix: `common:enums.ProjectPhase`,
            }}
          />
          <ReferenceSelectFormInput
            name="responsableUserPM"
            formItem={formItem}
            selectProps={{ isMultiple: false, ...UserReferenceSelect }}
          />
          <ReferenceSelectFormInput
            name="responsableUserSearch"
            formItem={formItem}
            selectProps={{ isMultiple: false, ...UserReferenceSelect }}
          />
        </FormCol>
        <FormCol>
          <TextFormInput formItem={formItem} name="street" />
          <InputsRow xs={[6, 10, 8]}>
            <TextFormInput formItem={formItem} name="postalCode" />
            <TextFormInput formItem={formItem} name="city" />
            <TextFormInput
              formItem={formItem}
              disabled
              // @ts-ignore
              name="canton"
              label={t('common:address.canton')}
            />
          </InputsRow>
          <TextAreaFormInput formItem={formItem} name="notes" />
        </FormCol>
      </FormRow>
      <FormRow>
        <FormCol fullWidth>
          <ProjectContactsInput form={form} />
        </FormCol>
      </FormRow>
      <FormRow>
        <FormCol fullWidth>
          <RowDivider orientation="left" orientationMargin={0}>
            {t('common:common.images')}
            <AssetExportButton
              label={t('common:common.download')}
              apiHref={`/assets-export/images/project/${id}`}
            />
          </RowDivider>
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
          <RowDivider orientation="left" orientationMargin={0}>
            {t('common:common.assets')}
            <AssetExportButton
              label={t('common:common.download')}
              apiHref={`/assets-export/documents/project/${id}`}
            />
          </RowDivider>
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
