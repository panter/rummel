import { PublicRuntimeConfig } from './config';

export type UploadedFile = {
  id: string;
  name: string;
  mimeType: string;
  size: number;
  publicUrl?: string;
};

class AssetUploader {
  private endpoint: string;
  private pendingUploads: any = [];
  private static instance = new AssetUploader();
  private ongoingUploads: number = 0;
  private readonly MAX_CONCURRENT_UPLOADS: number = 3;

  public static getInstance(): AssetUploader {
    return AssetUploader.instance;
  }

  constructor() {
    this.endpoint = PublicRuntimeConfig.getOrThrow<string>(
      'ASSET_SERVER_ENDPOINT',
    );
  }

  private async waitForSlot(): Promise<void> {
    return new Promise((resolve) => {
      const check = () => {
        if (this.ongoingUploads < this.MAX_CONCURRENT_UPLOADS) {
          this.ongoingUploads++;
          resolve();
        } else {
          setTimeout(check, 100); // Check every 100ms
        }
      };
      check();
    });
  }

  private releaseSlot() {
    this.ongoingUploads--;
  }

  // TODO: consider about using octet-stream instead of formdata
  public async uploadFile(asset: File, access = 'public') {
    await this.waitForSlot();

    try {
      const fileUploadData = new FormData();
      fileUploadData.append('file', asset, asset.name);
      fileUploadData.append('access', access);

      const response = await fetch(`${this.endpoint}/upload`, {
        method: 'POST',
        body: fileUploadData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        credentials: 'include',
      });
      return (await response.json()) as UploadedFile;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      // TODO: aborting
      // TODO: response error
    } finally {
      this.releaseSlot();
    }
  }

  private clearUploads() {
    this.pendingUploads = [];
  }
  setEndpoint(newEndpoint: string) {
    this.endpoint = newEndpoint;
  }

  async uploadAssetsList(assets: File[]) {
    assets.forEach((a) => {
      this.pendingUploads.push(this.uploadFile(a));
    });

    const results = await Promise.all(this.pendingUploads);
    this.clearUploads();

    return results;
  }
}

export const assetUploader = AssetUploader.getInstance();
