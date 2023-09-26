import { message, UploadFile, UploadProps } from 'antd';
import { PublicRuntimeConfig } from '../lib/config';
import { UploadChangeParam } from 'antd/lib/upload';

export interface UploadPropsOptions {
  queryParams?: Record<string, any>;
  onSuccess?: (info: UploadChangeParam<UploadFile>) => void;
  onError?: (info: UploadChangeParam<UploadFile>) => void;
}

const backendEndpoint = PublicRuntimeConfig.getOrThrow('GRAPHQL_ENDPOINT');

const defaultOnSuccess = (info: UploadChangeParam<UploadFile>) => {
  message.success(`${info.file.name} processed successfully`);
};
const defaultOnError = (info: UploadChangeParam<UploadFile>) => {
  message.error(`import of ${info.file.name} failed.`);
};

export const getUploadProps = (
  resource: string,
  options: UploadPropsOptions,
) => {
  let url = `${backendEndpoint}/${resource}/import/csv`;
  if (options.queryParams) {
    url += '?';
    Object.entries(options.queryParams || {})
      .filter(([, value]) => value)
      .forEach(([key, value]) => {
        url += `${key}=${value}&`;
      });
    url = url.slice(0, -1);
  }

  const uploadProps: UploadProps = {
    name: 'file',
    action: url,
    method: 'POST',
    withCredentials: true,
    showUploadList: false,
    onChange(info) {
      if (info.file.status !== 'uploading') {
        // eslint-disable-next-line no-console
        console.debug(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        options.onSuccess ? options.onSuccess(info) : defaultOnSuccess(info);
      } else if (info.file.status === 'error') {
        options.onError ? options.onError(info) : defaultOnError(info);
      }
    },
  };
  return uploadProps;
};
