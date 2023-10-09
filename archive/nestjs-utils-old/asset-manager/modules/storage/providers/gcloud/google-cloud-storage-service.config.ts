export interface GoogleCloudStorageServiceConfig {
  projectId: string;
  privateKey: string;
  clientEmail: string;
  privateBucket?: string;
  publicBucket?: string;
}
