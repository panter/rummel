import { fromPairs } from 'lodash';

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

export const DOCUMENT_MIME_TYPE_KEYS = Object.keys(
  GENERIC_ASSETS_MIME_TYPES,
).filter(
  (key) =>
    !IMAGE_MIME_TYPE_KEYS.includes(key as GENERIC_ASSETS_MIME_TYPES_KEYS),
) as Array<keyof typeof MIME_TYPES_KEYS>;
