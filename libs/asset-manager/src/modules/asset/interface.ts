export enum AssetAccess {
  public = 'public',
  private = 'private',
}

interface CreatedAssetData {
  id: string;
  name: string;
  mimeType: string;
  size: number;
  publicUrl?: string;
}

export class CreatedAsset {
  readonly id: string;
  readonly name: string;
  readonly mimeType: string;
  readonly size: number;
  readonly publicUrl?: string;

  constructor(data: CreatedAssetData) {
    this.id = data.id;
    this.name = data.name;
    this.mimeType = data.mimeType;
    this.size = data.size;
    this.publicUrl = data.publicUrl;
  }
}

interface DownloadedAssetData extends CreatedAssetData {
  buffer: Buffer;
}

export class DownloadedAsset extends CreatedAsset {
  readonly buffer: Buffer;

  constructor(data: DownloadedAssetData) {
    super(data);
    this.buffer = data.buffer;
  }
}

interface NewAssetFileData {
  readonly name: string;
  readonly mimeType: string;
  readonly size: number;
  readonly buffer: Buffer;
}

export class NewAssetFile {
  readonly name: string;
  readonly mimeType: string;
  readonly size: number;
  readonly buffer: Buffer;

  constructor(data: NewAssetFileData) {
    this.name = data.name;
    this.mimeType = data.mimeType;
    this.size = data.size;
    this.buffer = data.buffer;
  }
}
