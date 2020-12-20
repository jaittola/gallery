export interface GalleryModel {
  title: string;
  description: string;
  photoDir?: string;
  subgalleries?: string[];
  photos: Photo[];
}

export interface Photo {
  filename: string;
  title: string;
  description: string;
  taken?: Date;
}

export type PartialGalleryModel = Partial<GalleryModel>;

export type PartialPhoto = Partial<Photo>;
