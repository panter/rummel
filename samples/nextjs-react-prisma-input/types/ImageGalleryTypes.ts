import type { ReactImageGalleryItem } from 'react-image-gallery';

export interface ImageGalleryItemDef extends ReactImageGalleryItem {
  youtubeVideoId?: string;
  isFirst?: boolean;
}
