import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { loadGalleryModel } from './model/gallery-model';
import * as S from './styles';
import { GalleryModel, Photo } from './types/gallery-types';

interface GalleryComponentProps {
    gallery: GalleryModel;
}

export async function renderGallery(rootElementName: string) {
    var element: JSX.Element;

    try {
        const model = await loadGalleryModel('gallery.json');
        element = <Gallery gallery={model} />;
    } catch (e) {
        element = <p>Could not load gallery: {e.message}</p>;
    }
    ReactDOM.render(
        <React.StrictMode>{element}</React.StrictMode>,
        document.getElementById(rootElementName)
    );
}

function Gallery({ gallery }: GalleryComponentProps) {
    useEffect(() => {
        document.title = gallery.title;
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

function Title({ gallery }: GalleryComponentProps) {
    return <S.PageTitleText>{gallery.title}</S.PageTitleText>;
}

function Description({ gallery }: GalleryComponentProps) {
    return <S.DescriptionText>{gallery.description}</S.DescriptionText>;
}

function ThumbnailArray({ gallery }: GalleryComponentProps) {
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
                    PhotoThumbnail(p, idx, thumbnailHeight)
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

function PhotoThumbnail(p: Photo, index: number, thumbnailHeight: number) {
    const key = `thumbnail_${index}`;
    const element = (
        <S.ThumbnailContainer key={key}>
            <S.Thumbnail
                src={p.filename}
                alt={p.title}
                height={thumbnailHeight}
            />

            <ThumbnailOverlay photo={p} />
        </S.ThumbnailContainer>
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

function IconAttribution() {
    return (
        <S.FooterText>
            <span>Some icons made by </span>
            <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
                Freepik
            </a>
            <span> from </span>
            <a href="https://www.flaticon.com/" title="Flaticon">
                www.flaticon.com.
            </a>
        </S.FooterText>
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
