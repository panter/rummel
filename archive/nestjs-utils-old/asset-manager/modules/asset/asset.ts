import { v4 } from 'uuid';
import { AssetAccess } from './interface';

export class Asset {
  id: string;
  url?: string;
  originalFilename: string;
  size: number;
  mimeType: string;
  createdAt: Date;
  confirmedAt?: Date;
  ownerId: string;
  storage: string;
  access: AssetAccess;

  constructor(
    id: string,
    originalFilename: string,
    mimeType: string,
    size: number,
    storage: string,
    ownerId: string,
    access: AssetAccess,
    createdAt: Date,
  ) {
    this.id = id;
    this.originalFilename = originalFilename;
    this.size = size;
    this.mimeType = mimeType;
    this.storage = storage;
    this.ownerId = ownerId;
    this.access = access;
    this.createdAt = createdAt;
  }

  static create(
    originalFilename: string,
    mimeType: string,
    size: number,
    storage: string,
    ownerId: string,
    access: AssetAccess,
  ): Asset {
    return new this(
      v4(),
      originalFilename,
      mimeType,
      size,
      storage,
      ownerId,
      access,
      new Date(),
    );
  }

  getName(): string {
    const extension = this.originalFilename.split('.').pop();
    if (extension?.length && extension?.length > 1) {
      return `${this.ownerId}/${this.id}.${extension}`;
    } else {
      return `${this.ownerId}/${this.id}`;
    }
  }

  confirm(): void {
    this.confirmedAt = new Date();
  }
}
