export interface GalleryModel {
    title: string;
    description: string;
    subgalleries: string[];
    photos: Photo[];
}

export interface Photo {
    filename: string;
    title: string;
    description: string;
    taken?: Date;
}
