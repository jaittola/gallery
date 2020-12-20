import {
    GalleryModel,
    Photo,
    PartialGalleryModel,
} from '../../../common/types/gallery-types';

export type { GalleryModel, Photo };

export interface GalleryProps {
    gallery: GalleryModel;
}

export async function loadGalleryModel(
    fromFile: string
): Promise<GalleryModel> {
    const response = await fetch(fromFile);
    try {
        const sampleContent = (await response.json()) as PartialGalleryModel;
        return {
            title: '<Please add a title>',
            description: '<Please add a description>',
            photos: [],
            ...sampleContent,
        };
    } catch (e) {
        console.log('Loading gallery description failed', e);
        return Promise.reject(e);
    }
}

export function photoFilePath(gallery: GalleryModel, photo: Photo): string {
    const dir = gallery.photoDir ?? '';
    const dirWithSlash = !dir || dir.endsWith('/') ? dir : `${dir}/`;
    return `/${dirWithSlash}/${photo.filename}`;
}

export function photoLinkPath(photo: Photo): string {
    return photoFileName(photo.filename);
}

export function photoRoutePattern(): string {
    return photoFileName(':filename');
}

function photoFileName(namePart: string): string {
    return `/photo/${namePart}`;
}
