import { ReadStream } from 'fs';

export interface FileUpload {
  filename: string;
  mimeType: string;
  encoding: string;
  createReadStream: () => ReadStream;
}
