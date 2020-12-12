import { GalleryModel } from '../types/gallery-types';

type PartialGalleryModel = Partial<GalleryModel>;

export async function loadGalleryModel(
    fromFile: string
): Promise<GalleryModel> {
    const response = await fetch(fromFile);
    try {
        const sampleContent = (await response.json()) as PartialGalleryModel;
        return {
            title: '<Please add a title>',
            description: '<Please add a description>',
            subgalleries: [],
            photos: [],
            ...sampleContent,
        };
    } catch (e) {
        console.log('Loading gallery description failed', e);
        return Promise.reject(e);
    }
}
