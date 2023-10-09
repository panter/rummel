import {
  AssetInput,
  IMAGE_MIME_TYPE_KEYS,
  MIME_TYPES_KEYS,
} from './AssetInput';
import { Card, Checkbox, Col, Row, Select, Spin } from 'antd';
import {
  Control,
  FieldArray,
  FieldArrayPath,
  FieldArrayWithId,
  FieldValues,
  useController,
  useFormContext,
  useWatch,
} from 'react-hook-form';

import { UploadedFile } from '../../../../../lib/AssetUploader';
import { notNil } from '../../../../ui/core/utils/arrays';
import styled from 'styled-components';
import { uid } from 'uid';
import { useTranslation } from 'next-i18next';
import { useUploadFieldArray } from '../hooks/useUploadFieldArray';

const Base = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const UploadPanel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ImageTagsInput = styled(Select)`
  width: 100%;
  margin-top: 8px;
`;

const DefaultImageCheckbox = styled(Checkbox)`
  margin-top: 8px;
`;

type AssetsFormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TFieldArrayName extends
    FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>,
  TKeyName extends string = 'id',
> = {
  name: TFieldArrayName;
  control?: Control<TFieldValues> | undefined;
  i18nName?: string;
  footer?: (assetId: string) => React.ReactElement;
  mimeTypes?: Array<keyof typeof MIME_TYPES_KEYS>;
  skipMimeTypes?: Array<keyof typeof MIME_TYPES_KEYS>;
  assetToInput: (props: {
    field?: FieldArrayWithId<TFieldValues, TFieldArrayName, TKeyName>;
    file?: UploadedFile;
  }) => FieldArray<TFieldValues, TFieldArrayName>;
};

export function AssetsFormInput<
  TFieldValues extends FieldValues = FieldValues,
  TFieldArrayName extends
    FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>,
>({ ...props }: AssetsFormInputProps<TFieldValues, TFieldArrayName, '_id'>) {
  const { t } = useTranslation();

  const {
    update,
    currentUpdates,
    currentUploads,
    fields,
    remove,
    updateFile,
    uploadFiles,
  } = useUploadFieldArray({
    control: props.control,
    assetToInput: props.assetToInput,
    name: props.name,
  });

  const { field: mainImageField } = useController({
    name: 'mainImageId.id' as any,
    control: props.control,
  });

  return (
    <Base>
      <Row gutter={24}>
        {fields
          .map((field: any, index) => {
            if (
              props.skipMimeTypes?.includes((field as any)?.asset?.mimeType)
            ) {
              return null;
            }
            if (
              props.mimeTypes &&
              !props.mimeTypes?.includes((field as any)?.asset?.mimeType)
            ) {
              return null;
            }

            return (
              <Col key={field._id} span={12}>
                <AssetInput
                  style={{ margin: '12px 0' }}
                  uploading={Boolean(
                    currentUpdates.find((f) => f.id === field.id),
                  )}
                  id={field._id}
                  assetId={field.asset.id}
                  url={field.asset.url}
                  urlMimeType={field.asset.mimeType}
                  onChange={(f) =>
                    f ? updateFile(index, field, f) : remove(index)
                  }
                />
                <ImageTagsInput
                  mode="tags"
                  value={field.tags || []}
                  onChange={(value: any) => {
                    update(index, {
                      ...field,
                      tags: value,
                    });
                  }}
                />
                {IMAGE_MIME_TYPE_KEYS.includes(field.asset.mimeType) ? (
                  <DefaultImageCheckbox
                    {...mainImageField}
                    checked={field.asset.id === mainImageField.value}
                    onChange={(event) => {
                      mainImageField.onChange(
                        event?.target?.checked ? field.asset.id : null,
                      );
                    }}
                  >
                    {t('common:common.mainImage')}
                  </DefaultImageCheckbox>
                ) : null}
              </Col>
            );
          })
          .filter(notNil)}

        <Col span={12}>
          <AssetInput
            style={{ margin: '12px 0' }}
            multiple
            mimeTypes={props.mimeTypes}
            skipMimeTypes={props.skipMimeTypes}
            id={uid()}
            onChange={(f) => f && uploadFiles(f)}
          />
        </Col>
      </Row>
      {currentUploads?.map((upload) => (
        <Card key={upload.file.name}>
          <UploadPanel>
            <Spin style={{ marginRight: 12 }} />
            <span>{upload.file.name}</span>
          </UploadPanel>
        </Card>
      ))}
    </Base>
  );
}
