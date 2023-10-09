import { Accept, useDropzone } from 'react-dropzone';
import {
  CloseCircleOutlined,
  DownloadOutlined,
  FileExcelOutlined,
  FileOutlined,
  FilePdfOutlined,
  FilePptOutlined,
  FileWordOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { fromPairs, keys, omit, pick } from 'lodash';

import { AssetExportButton } from './AssetExportButton';
import Image from 'next/image';
import React from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';

const IMAGE_MIME_TYPES = {
  'image/png': ['.png'],
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/gif': ['.gif'],
  'image/svg+xml': ['.svg'],
};

export const GENERIC_ASSETS_MIME_TYPES = {
  ...IMAGE_MIME_TYPES,
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc', '.docx'],
  'application/vnd.ms-excel': ['.xls', '.xlsx'],
  'application/vnd.ms-powerpoint': ['.ppt', '.pptx'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
    '.docx',
  ],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
    '.xlsx',
  ],
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': [
    '.pptx',
  ],
  'application/octet-stream': ['.vwx'], // For Vectorworks, using a generic MIME type
  'application/dxf': ['.dxf'],
  'application/ifc': ['.ifc'],
  'application/zip': ['.zip'],
};

type GENERIC_ASSETS_MIME_TYPES_KEYS = keyof typeof GENERIC_ASSETS_MIME_TYPES;
export const MIME_TYPES_KEYS = fromPairs(
  Object.keys(GENERIC_ASSETS_MIME_TYPES).map((key) => [key, key]),
) as {
  [key in GENERIC_ASSETS_MIME_TYPES_KEYS]: GENERIC_ASSETS_MIME_TYPES_KEYS;
};

export const IMAGE_MIME_TYPE_KEYS = [
  MIME_TYPES_KEYS['image/png'],
  MIME_TYPES_KEYS['image/gif'],
  MIME_TYPES_KEYS['image/jpeg'],
  MIME_TYPES_KEYS['image/svg+xml'],
];

const Base = styled.div``;

const FileName = styled.div`
  align-self: end;
  font-size: 12px;
  overflow: hidden;
  text-wrap: nowrap;
  text-overflow: ellipsis;
`;

const DeleteButton = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  border: 0px;
  background-color: #fff;
  display: flex;
  padding: 10px;
`;

const DownloadButton = styled(AssetExportButton)`
  position: absolute;
  left: 10px;
  top: 10px;
  background-color: #fff;
  display: flex;
  padding: 10px;
  color: black;
`;

const Label = styled.label`
  position: relative;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 6px;
  background-color: #eaeaea;
  border: 1px solid #e5e5e5;
  transition: background-color 0.25s linear;

  ${DeleteButton} {
    display: none;
    border-radius: 50%;

    svg {
      width: 12px;
      height: 12px;
    }
  }

  ${DownloadButton} {
    display: none;
    border-radius: 50%;

    svg {
      width: 12px;
      height: 12px;
    }
  }

  &:hover {
    background-color: #d3d3d3;

    ${DeleteButton} {
      display: flex;
    }
    ${DownloadButton} {
      display: flex;
    }
  }

  img {
    display: inline-block;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

type AssetInputProps = {
  style?: React.CSSProperties;
  className?: string;
  id: string;
  assetId?: string;
  url?: string;
  urlFileName?: string;
  urlMimeType?: keyof typeof MIME_TYPES_KEYS;
  mimeTypes?: Array<keyof typeof MIME_TYPES_KEYS>;
  skipMimeTypes?: Array<keyof typeof MIME_TYPES_KEYS>;
  onChange: (files?: FileList | null) => void;
  multiple?: boolean;
  uploading?: boolean;
};

export const AssetInput: React.FC<AssetInputProps> = ({
  style,
  className,
  id,
  assetId,
  url,
  urlMimeType,
  urlFileName,
  mimeTypes = [],
  skipMimeTypes = [],
  onChange,
  multiple,
  uploading,
}) => {
  const allowedMimeTypes = omit(
    mimeTypes?.length > 0
      ? pick(GENERIC_ASSETS_MIME_TYPES, mimeTypes)
      : GENERIC_ASSETS_MIME_TYPES,
    skipMimeTypes,
  ) as unknown as Accept;

  const { getRootProps } = useDropzone({
    accept: allowedMimeTypes,
    onDrop: async (acceptedFiles) => {
      onChange(acceptedFiles as any);
    },
    multiple: true,
  });

  const fileName =
    urlFileName || decodeURIComponent(url?.split('/').pop() || '');

  return (
    <>
      <Base style={style} className={className} {...getRootProps()}>
        <input
          className="sr-only"
          type="file"
          disabled={!!url}
          id={id}
          multiple={multiple}
          onBlur={(e) => onChange(e.target.files)}
          onChange={(e) => onChange(e.target.files)}
          accept={keys(allowedMimeTypes).join(', ')}
        />
        <Label htmlFor={id}>
          {uploading && <Spin style={{ position: 'absolute' }} />}
          {url ? (
            <>
              {urlMimeType?.startsWith('image') ? (
                <Image
                  src={url}
                  loading="lazy"
                  alt="preview image"
                  width={640}
                  height={360}
                />
              ) : (
                <AssetIcon mimeType={urlMimeType} />
              )}
              <DeleteButton
                onClick={(e) => {
                  onChange(null);
                  e.preventDefault();
                  e.stopPropagation();
                }}
                type={'button'}
              >
                <CloseCircleOutlined />
              </DeleteButton>
              {assetId ? (
                <DownloadButton
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  label={<DownloadOutlined />}
                  apiHref={`/assets-export/${assetId}`}
                />
              ) : null}
            </>
          ) : (
            <PlusCircleOutlined style={{ height: '20px', width: '20px' }} />
          )}
        </Label>
      </Base>
      <FileName>{fileName}</FileName>
    </>
  );
};

const AssetIcon: React.FC<{
  mimeType?: keyof typeof MIME_TYPES_KEYS;
}> = ({ mimeType }) => {
  if (mimeType === MIME_TYPES_KEYS['application/pdf']) {
    return <FilePdfOutlined />;
  } else if (
    mimeType === MIME_TYPES_KEYS['application/msword'] ||
    mimeType ===
      MIME_TYPES_KEYS[
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ]
  ) {
    return <FileWordOutlined />;
  } else if (
    mimeType === MIME_TYPES_KEYS['application/vnd.ms-excel'] ||
    mimeType ===
      MIME_TYPES_KEYS[
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ]
  ) {
    return <FileExcelOutlined />;
  } else if (
    mimeType === MIME_TYPES_KEYS['application/vnd.ms-powerpoint'] ||
    mimeType ===
      MIME_TYPES_KEYS[
        'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      ]
  ) {
    return <FilePptOutlined />;
  }

  return <FileOutlined />;
};
