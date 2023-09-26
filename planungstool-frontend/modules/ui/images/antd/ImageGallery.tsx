import { Checkbox, Col, Image, Row } from 'antd';
import _, { concat, without } from 'lodash';
import React, { useState } from 'react';

import { useTranslation } from 'next-i18next';
import { styled } from 'styled-components';
import { IMAGE_MIME_TYPE_KEYS } from '../../../forms/components/assets-upload/components/AssetInput';

const ImageFooter = styled.div`
  background-color: white;
  border-radius: 4px;
  padding: 8px;
  color: black;
`;

type Asset = {
  id: string;
  url?: string | null | undefined;
  originalFilename: string;
  mimeType: string;
  updatedAt: any;
};
type AssetReference = {
  id: string;
  asset: Asset;
  tags?: string[] | null;
};

type ImageGallery = {
  style?: React.CSSProperties;
  className?: string;
  assetReferences?: AssetReference[] | null;
  selectable?: boolean;
  selectedAssetIds?: string[];
  setSelectedAssetIds?: (assetIds: string[]) => void;
};

const sortAndFilterAssets = (assetReferences: AssetReference[]) =>
  _(assetReferences || [])
    .sortBy((assetReference: AssetReference) => {
      return assetReference.asset.originalFilename;
    })
    .filter((asset: AssetReference) => {
      return IMAGE_MIME_TYPE_KEYS.includes(
        (asset?.asset?.mimeType || '') as any,
      );
    })
    .value();

export const ImageGallery: React.FC<ImageGallery> = ({
  assetReferences,
  selectable,
  selectedAssetIds = [],
  setSelectedAssetIds,
}) => {
  const { t } = useTranslation();

  const handleSelectImage = (assetId: string) => {
    if (selectedAssetIds.includes(assetId)) {
      setSelectedAssetIds?.(without(selectedAssetIds, assetId));
    } else {
      setSelectedAssetIds?.(concat(selectedAssetIds, assetId));
    }
  };

  return (
    <Row gutter={[16, 32]}>
      <Image.PreviewGroup
        preview={{
          toolbarRender: (_, { current }) => {
            const assetReference = assetReferences?.[current];
            const asset = assetReference?.asset;
            if (!asset) {
              return null;
            }
            return (
              <ImageFooter>
                {asset.originalFilename}
                {assetReference.tags
                  ? ` / ${assetReference.tags.join(', ')}`
                  : ''}
                {selectable ? (
                  <Checkbox
                    style={{ marginLeft: 12 }}
                    onChange={() => handleSelectImage(asset.id || '')}
                    checked={selectedAssetIds.includes(asset.id || '')}
                  >
                    Select
                  </Checkbox>
                ) : null}
              </ImageFooter>
            );
          },
        }}
      >
        {sortAndFilterAssets(assetReferences || []).map((assetReferences) => (
          <Col key={assetReferences.id} span={6}>
            {selectable ? (
              <Checkbox
                onChange={() => handleSelectImage(assetReferences.asset.id)}
                checked={selectedAssetIds.includes(assetReferences.asset.id)}
              >
                Select
              </Checkbox>
            ) : null}
            <Image
              src={assetReferences.asset.url || ''}
              alt={assetReferences.tags?.join(', ') || ''}
            />
          </Col>
        ))}
      </Image.PreviewGroup>
    </Row>
  );
};
