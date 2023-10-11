import { Storage } from '@google-cloud/storage';
import dotenv from 'dotenv';

dotenv.config();

const projectId = process.env.PROJECT_ID ?? '';
const credentials = {
  client_email: process.env.CLIENT_EMAIL ?? '',
  private_key: process.env.PRIVATE_KEY ?? '',
};

export const storage = new Storage({
  projectId,
  credentials,
});

export const publicBucketName = process.env.GCLOUD_BUCKET_PUBLIC;
