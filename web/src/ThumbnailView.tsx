import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Description, IconAttribution, Title } from './Components';
import {
    GalleryModel,
    GalleryProps,
    Photo,
    photoFilePath,
    photoLinkPath,
} from './model/gallery-model';
import * as S from './styles';

export function ThumbnailView({ gallery }: GalleryProps) {
    useEffect(() => {
        document.onkeydown = () => {};
    });

    return (
        <div>
            <Title gallery={gallery} />
            <Description gallery={gallery} />
            <ThumbnailArray gallery={gallery} />
            <IconAttribution />
        </div>
    );
}

function ThumbnailArray({ gallery }: GalleryProps) {
    const [thumbnailHeight, setThumbnailHeight] = useState(
        getThumbnailSizeFromCookies()
    );

    useEffect(() => {
        setThumbnailSizeToCookies(thumbnailHeight);
    });

    return (
        <>
            <ThumbnailSizeSelect
                selectedSize={thumbnailHeight}
                onSelectSize={setThumbnailHeight}
            />
            <S.GalleryPhotosContainer>
                {gallery.photos.map((p, idx) =>
                    PhotoThumbnail(gallery, p, idx, thumbnailHeight)
                )}
            </S.GalleryPhotosContainer>
        </>
    );
}

interface ThumbnailSizeSelectProps {
    selectedSize: number;
    onSelectSize: (newSize: number) => void;
}

function ThumbnailSizeSelect({
    selectedSize,
    onSelectSize,
}: ThumbnailSizeSelectProps) {
    function sizeSelected(e: React.ChangeEvent<HTMLSelectElement>) {
        const newSize = parseInt(e.target.value);
        if (S.ThumbnailHeights.indexOf(newSize) >= 0) {
            onSelectSize(newSize);
        }
    }

    const thumbnailSizes = S.ThumbnailHeights.map((s) => (
        <option value={s} key={`thumbnail_size_${s}`}>{`${s} px`}</option>
    ));
    return (
        <S.ThumbnailSizeSelectContainer>
            <S.SelectExplanation>Thumbnail height:</S.SelectExplanation>
            <S.Select value={selectedSize} onChange={sizeSelected}>
                {thumbnailSizes}
            </S.Select>
        </S.ThumbnailSizeSelectContainer>
    );
}

function PhotoThumbnail(
    gallery: GalleryModel,
    p: Photo,
    index: number,
    thumbnailHeight: number
) {
    const key = `thumbnail_${index}`;
    const element = (
        <Link to={photoLinkPath(p)} key={key}>
            <S.ThumbnailContainer>
                <S.Thumbnail
                    src={photoFilePath(gallery, p)}
                    alt={p.title}
                    height={thumbnailHeight}
                />

                <ThumbnailOverlay photo={p} />
            </S.ThumbnailContainer>
        </Link>
    );
    return element;
}

function ThumbnailOverlay(props: { photo: Photo }) {
    return (
        <S.ThumbnailOverlay>
            <S.ThumbnailOverlayTextBox>
                {props.photo.title}
            </S.ThumbnailOverlayTextBox>
        </S.ThumbnailOverlay>
    );
}

function setThumbnailSizeToCookies(size: number) {
    document.cookie = `thumbnailSize=${size}`;
}

function getThumbnailSizeFromCookies(): number {
    const sizeCookie =
        document?.cookie
            ?.split('; ')
            ?.find((row) => row.startsWith('thumbnailSize='))
            ?.split('=')[1] ?? '';
    const thumbnailSize = parseInt(sizeCookie);
    return thumbnailSize >= 0 && S.ThumbnailHeights.includes(thumbnailSize)
        ? thumbnailSize
        : S.defaultThumbnailHeight;
}
