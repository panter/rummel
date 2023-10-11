import { DownloadResponse, Storage } from '@google-cloud/storage';
import { BucketsNotFoundException } from './buckets-not-found.exception';
import { GoogleCloudStorageServiceConfig } from './google-cloud-storage-service.config';
import { AssetAccess } from '../../../asset';
import { StorageFile } from '../../interface';
import { StorageService } from '../../storage.service';
import { BucketsNotConfiguredException } from './buckets-not-configured.exception';
import * as Buffer from 'buffer';
import { InvalidConfigurationException } from '@panter/nestjs-utils';

export class GcloudStorageService extends StorageService {
  private readonly storage: Storage;
  private readonly publicBucket?: string;
  private readonly privateBucket?: string;

  constructor(config: GoogleCloudStorageServiceConfig) {
    super();
    this.storage = new Storage({
      projectId: config.projectId,
      credentials: {
        client_email: config.clientEmail,
        private_key: config.privateKey,
      },
    });
    if (!config.publicBucket && !config.privateBucket) {
      throw new InvalidConfigurationException(
        `Any buckets were not found. Please use 'GCLOUD_BUCKET_PRIVATE' or 'GCLOUD_BUCKET_PUBLIC' environment variables to specify your buckets`,
      );
    }
    this.publicBucket = config.publicBucket;
    this.privateBucket = config.privateBucket;
  }

  async init() {
    await this.ensureBuckets();
  }

  async save(path: string, data: Buffer, access: AssetAccess) {
    const file = await this.storage.bucket(this.getBucket(access)).file(path);
    await file.save(data, {
      public: access === AssetAccess.public,
    });
    return file.publicUrl();
  }

  async delete(path: string, access: AssetAccess) {
    await this.storage
      .bucket(this.getBucket(access))
      .file(path)
      .delete({ ignoreNotFound: true });
  }

  async get(path: string, access: AssetAccess): Promise<StorageFile> {
    const fileResponse: DownloadResponse = await this.storage
      .bucket(this.getBucket(access))
      .file(path)
      .download();
    const [buffer] = fileResponse;
    const storageFile = new StorageFile();
    storageFile.buffer = buffer;
    // storageFile.metadata = new Map<string, string>();
    return storageFile;
  }

  public async ensureBuckets() {
    const notFoundBuckets = [];
    for (const bucket of [this.privateBucket, this.publicBucket].filter(
      (b): b is string => !!b,
    )) {
      const [exists] = await this.storage.bucket(bucket).exists();
      if (!exists) {
        notFoundBuckets.push(bucket);
      }
    }
    if (notFoundBuckets.length) {
      throw new BucketsNotFoundException(notFoundBuckets);
    }
  }

  private getBucket(access: AssetAccess): string {
    const bucketName =
      access === AssetAccess.private ? this.privateBucket : this.publicBucket;
    if (!bucketName) {
      throw new BucketsNotConfiguredException(access);
    }

    return bucketName;
  }

  async copy(
    path: string,
    newPath: string,
    access: AssetAccess,
  ): Promise<string> {
    const [file] = await this.storage
      .bucket(this.getBucket(access))
      .file(path)
      .copy(newPath);
    return file.publicUrl();
  }
}
