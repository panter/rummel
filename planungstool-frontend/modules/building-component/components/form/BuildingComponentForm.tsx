import {
  BuildingComponentPhase,
  BuildingComponentState,
  Condition,
  HarmfulSubstances,
  QuantityUnit,
  ReusePotential,
} from '../../../../@generated/graphql';
import {
  FormCol,
  FormRow,
  InputsRow,
} from '../../../forms/components/antd/FormsLayout';
import {
  Base as AssetDownloadButtonBase,
  AssetExportButton,
} from '../../../forms/components/assets-upload/components/AssetExportButton';

import { Collapse, Divider, Row, Space, Typography } from 'antd';
import { omit } from 'lodash';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { UploadedFile } from '../../../../lib/AssetUploader';
import { gotoMaterialsDepot } from '../../../../lib/locations';
import { AutocompleteFormInput } from '../../../autocomplete/components/AutocompleteSelect';
import { CategoryReferenceSelect } from '../../../category/resource';
import { EbkphCategoryReferenceSelect } from '../../../ebkphCategory/resource';
import { CheckboxFormInput } from '../../../forms/components/antd/input/CheckboxFormInput';
import { EnumSelectInput } from '../../../forms/components/antd/input/EnumSelectInput';
import { NumberFormInput } from '../../../forms/components/antd/input/NumberFormInput';
import { ReferenceSelectFormInput } from '../../../forms/components/antd/input/ReferenceSelectFormInput';
import { TextAreaFormInput } from '../../../forms/components/antd/input/TextAreaFormInput';
import { TextFormInput } from '../../../forms/components/antd/input/TextFormInput';
import { IMAGE_MIME_TYPE_KEYS } from '../../../forms/components/assets-upload/components/AssetInput';
import { AssetsFormInput } from '../../../forms/components/assets-upload/components/AssetsFormInput';
import { SearchRequestInterestsTable } from '../../../search-request-interest/components/list/SearchRequestInterestsTable';
import { StorageLocationReferenceSelect } from '../../../storage-location/resource';
import { ExtractUseFormReturn } from '../../../ui/form/hooks/usePrismaForms';
import {
  BuildingComponentCreateResource,
  BuildingComponentUpdateResource,
} from '../../resource';
import { BuildingComponentContactsInput } from './BuildingComponentContactsInput';
import { BuildingComponentDimensionInput } from './BuildingComponentDimensionInput';

type BuildingComponentFormProps = {
  style?: React.CSSProperties;
  className?: string;
  form: ExtractUseFormReturn<
    typeof BuildingComponentCreateResource,
    typeof BuildingComponentUpdateResource
  >;
};

const Base = styled.div``;

const RowDivider = styled(Divider)`
  .ant-divider-inner-text {
    display: flex;
    flex-direction: row;

    ${AssetDownloadButtonBase} {
      margin-left: 12px;
    }
  }
`;

export const BuildingComponentForm: React.FC<BuildingComponentFormProps> = ({
  style,
  className,
  form,
}) => {
  const { t } = useTranslation();
  const { formItem, control, getValues } = form;

  const id = getValues('id');
  const contacts = getValues('contacts');
  const materialDepot = getValues('materialsDepot');

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
      <Collapse defaultActiveKey={1}>
        <Collapse.Panel
          key={1}
          header={
            <Row justify="space-between">
              <Typography.Text>
                {t('common:resources.BuildingComponent.formSections.general')}
              </Typography.Text>
              {materialDepot ? (
                <Link {...gotoMaterialsDepot(materialDepot.id || '')}>
                  <Typography.Link>
                    {materialDepot.name} - {materialDepot.shortName}
                  </Typography.Link>
                </Link>
              ) : null}
            </Row>
          }
        >
          <FormRow>
            <FormCol>
              <TextFormInput
                formItem={formItem}
                name="componentId"
                readOnly
                disabled
              />
              <TextFormInput formItem={formItem} name="name" />
              <ReferenceSelectFormInput
                name="categoryId"
                formItem={formItem}
                selectProps={{ isMultiple: false, ...CategoryReferenceSelect }}
                rules={{ required: true }}
              />
              <ReferenceSelectFormInput
                name="ebkphCategoryId"
                formItem={formItem}
                selectProps={{
                  isMultiple: false,
                  ...EbkphCategoryReferenceSelect,
                }}
              />
              <TextAreaFormInput formItem={formItem} name="description" />
              <CheckboxFormInput formItem={formItem} name="showInMatching" />
            </FormCol>
            <FormCol>
              <EnumSelectInput
                formItem={formItem}
                name="state"
                keys={BuildingComponentState}
                label={t('common:common.status')}
                inputProps={{
                  i18nPrefix: `common:enums.BuildingComponentState`,
                }}
                rules={{ required: true }}
              />
              <EnumSelectInput
                formItem={formItem}
                name="phase"
                keys={BuildingComponentPhase}
                label={t('common:resources.BuildingComponent.fields.phase')}
                inputProps={{
                  i18nPrefix: `common:enums.BuildingComponentPhase`,
                }}
              />
              <InputsRow xs={[10, 6, 8]}>
                <NumberFormInput formItem={formItem} name="co2Savings" />
                <EnumSelectInput
                  formItem={formItem}
                  name="co2Unit"
                  keys={QuantityUnit}
                />
                <CheckboxFormInput formItem={formItem} name="co2SavingsExact" />
              </InputsRow>
              <InputsRow xs={[10, 6, 8]}>
                <NumberFormInput formItem={formItem} name="quantity" />
                <EnumSelectInput
                  formItem={formItem}
                  name="quantityUnit"
                  keys={QuantityUnit}
                />
                <CheckboxFormInput formItem={formItem} name="quantityExact" />
              </InputsRow>
              <TextAreaFormInput formItem={formItem} name="quantityNotes" />
            </FormCol>
          </FormRow>
        </Collapse.Panel>
        <Collapse.Panel
          key={2}
          header={t(
            'common:resources.BuildingComponent.formSections.dimensions',
          )}
        >
          <BuildingComponentDimensionInput form={form} />
        </Collapse.Panel>
        <Collapse.Panel
          header={t(
            'common:resources.BuildingComponent.formSections.moreInformation',
          )}
          key={3}
        >
          <FormRow>
            <FormCol>
              <EnumSelectInput
                formItem={formItem}
                name="condition"
                keys={Condition}
              />

              <EnumSelectInput
                formItem={formItem}
                name="harmfulSubstances"
                keys={HarmfulSubstances}
              />
              <EnumSelectInput
                formItem={formItem}
                name="reusePotential"
                keys={ReusePotential}
              />
              <TextAreaFormInput
                formItem={formItem}
                name="reusePotentialNotes"
              />
              <TextFormInput formItem={formItem} name="demolitionPhase" />
              <TextAreaFormInput
                formItem={formItem}
                name="reusePotentialConclusion"
              />
            </FormCol>
            <FormCol>
              <InputsRow xs={[6, 4]}>
                <NumberFormInput formItem={formItem} name="constructionYear" />
                <CheckboxFormInput
                  formItem={formItem}
                  name="constructionYearExact"
                />
              </InputsRow>
              <TextAreaFormInput
                formItem={formItem}
                name="constructionYearNotes"
              />
              <AutocompleteFormInput
                formItem={formItem}
                name="locationInBuilding"
                labelKey="locationInBuilding"
              />
              <AutocompleteFormInput
                formItem={formItem}
                name="locationInBuildingDetail"
                labelKey="locationInBuildingDetail"
              />
              <ReferenceSelectFormInput
                name="storageLocationId"
                label={t(
                  'common:resources.BuildingComponent.fields.storageLocationId.id',
                )}
                formItem={formItem}
                selectProps={{
                  isMultiple: false,
                  ...StorageLocationReferenceSelect,
                }}
              />
            </FormCol>
          </FormRow>
        </Collapse.Panel>
        <Collapse.Panel
          key={4}
          header={t(
            'common:resources.BuildingComponent.formSections.moreInformation2',
          )}
        >
          <TextAreaFormInput formItem={formItem} name="sparePartsNotes" />
          <NumberFormInput formItem={formItem} name="quantitySpare" />
          <TextAreaFormInput formItem={formItem} name="storageLocationNotes" />
          <TextAreaFormInput formItem={formItem} name="dimensionsNotes" />
          <TextFormInput formItem={formItem} name="demolitionPhase" />
          <TextAreaFormInput formItem={formItem} name="potentialInterests" />
          <TextAreaFormInput formItem={formItem} name="warrantyDetails" />
        </Collapse.Panel>
        <Collapse.Panel
          key={5}
          header={t(
            'common:resources.BuildingComponent.formSections.co2SavingsTable',
          )}
        >
          <FormRow>
            <FormCol fullWidth>
              <InputsRow xs={[6, 6, 6, 6]}>
                <div>
                  <Typography.Text>
                    Treibhausgasbilanzierung
                    <br />
                    <Typography.Text style={{ fontSize: '75%' }}>
                      für einen Bauteilnutzungszyklus
                    </Typography.Text>
                  </Typography.Text>
                </div>
                <Typography.Text>Beschreibung</Typography.Text>
                <EnumSelectInput
                  formItem={formItem}
                  name="co2Unit"
                  keys={QuantityUnit}
                />
                <NumberFormInput formItem={formItem} name="co2QuantityUsed" />
              </InputsRow>
              <InputsRow xs={[6, 6, 6, 6]}>
                <Typography.Text>Wiederbeschaffungswert</Typography.Text>
                <TextFormInput
                  formItem={formItem}
                  name="reuseValueDescription"
                />
                <NumberFormInput formItem={formItem} name="reuseValuePerUnit" />
                <NumberFormInput formItem={formItem} name="reuseValueTotal" />
              </InputsRow>
              <InputsRow xs={[6, 6, 6, 6]}>
                <Typography.Text>RU1 - Demontage</Typography.Text>
                <TextAreaFormInput
                  rows={1}
                  formItem={formItem}
                  name="ru1Explanation"
                />
                <NumberFormInput formItem={formItem} name="ru1PerUnit" />
                <NumberFormInput
                  formItem={formItem}
                  name="ru1Total"
                  readOnly
                  disabled
                />
              </InputsRow>
              <InputsRow xs={[6, 6, 6, 6]}>
                <Typography.Text>RU2 - Transport</Typography.Text>
                <TextAreaFormInput
                  rows={1}
                  formItem={formItem}
                  name="ru2Explanation"
                />
                <NumberFormInput formItem={formItem} name="ru2PerUnit" />
                <NumberFormInput
                  formItem={formItem}
                  name="ru2Total"
                  readOnly
                  disabled
                />
              </InputsRow>
              <InputsRow xs={[6, 6, 6, 6]}>
                <Typography.Text>RU3 - Aufbereitung</Typography.Text>
                <TextAreaFormInput
                  rows={1}
                  formItem={formItem}
                  name="ru3Explanation"
                />
                <NumberFormInput formItem={formItem} name="ru3PerUnit" />
                <NumberFormInput
                  formItem={formItem}
                  name="ru3Total"
                  readOnly
                  disabled
                />
              </InputsRow>
              <InputsRow xs={[6, 6, 6, 6]}>
                <div>
                  <Typography.Text>
                    THG für ReUse Bauteil
                    <br />
                    <Typography.Text style={{ fontSize: '75%' }}>
                      RU1 + RU2 + RU3
                    </Typography.Text>
                  </Typography.Text>
                </div>
                <div></div>

                <NumberFormInput formItem={formItem} name="ruPerUnitSum" />

                <NumberFormInput
                  formItem={formItem}
                  name="ruTotalSum"
                  readOnly
                  disabled
                />
              </InputsRow>
              <InputsRow xs={[6, 6, 6, 6]}>
                <Typography.Text>THG für Rückfallebene</Typography.Text>
                <TextFormInput
                  formItem={formItem}
                  name="fallbackLevel"
                  readOnly
                  disabled
                />
                <NumberFormInput
                  formItem={formItem}
                  name="fallbackLevelCO2PerUnit"
                  readOnly
                  disabled
                />
                <NumberFormInput
                  formItem={formItem}
                  name="fallbackLevelCO2Total"
                  readOnly
                  disabled
                />
              </InputsRow>
              <InputsRow xs={[6, 6, 6, 6]}>
                <div>
                  <Typography.Text>
                    Einsparung
                    <br />
                    <Typography.Text style={{ fontSize: '75%' }}>
                      im Vergleich zur Rückfallebene
                    </Typography.Text>
                  </Typography.Text>
                </div>
                <div></div>
                <NumberFormInput
                  formItem={formItem}
                  name="co2SavingsPerUnit"
                  readOnly
                  disabled
                />
                <NumberFormInput
                  formItem={formItem}
                  name="co2SavingsTotal"
                  readOnly
                  disabled
                />
              </InputsRow>

              <NumberFormInput
                formItem={formItem}
                name="transportDistanceInKm"
              />
              <TextFormInput formItem={formItem} name="transportVehicleName" />
            </FormCol>
          </FormRow>
        </Collapse.Panel>
        <Collapse.Panel
          key={6}
          header={`${t(
            'common:resources.BuildingComponent.formSections.contacts',
          )} (${contacts?.length || ''})`}
        >
          <BuildingComponentContactsInput form={form} />
        </Collapse.Panel>
        <Collapse.Panel key={7} header={t('common:common.assets')}>
          <RowDivider orientation="right" orientationMargin={0}>
            <AssetExportButton
              label={t('common:common.download')}
              apiHref={`/assets-export/documents/building-component/${id}`}
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
        </Collapse.Panel>
        <Collapse.Panel
          key={8}
          header={<Space>{t('common:common.images')}</Space>}
        >
          <RowDivider orientation="right" orientationMargin={0}>
            <AssetExportButton
              label={t('common:common.download')}
              apiHref={`/assets-export/images/building-component/${id}`}
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
        </Collapse.Panel>
        {id ? (
          <Collapse.Panel
            key={9}
            header={t(
              'common:resources.BuildingComponent.formSections.searchRequestInterests',
            )}
          >
            <SearchRequestInterestsTable
              where={{
                buildingComponent: id
                  ? {
                      id: {
                        equals: id,
                      },
                    }
                  : undefined,
              }}
            />
          </Collapse.Panel>
        ) : null}
      </Collapse>
    </Base>
  );
};
