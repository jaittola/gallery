import React, { useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Description, IconAttribution, Title } from './Components';
import {
    GalleryModel,
    GalleryProps,
    Photo,
    photoFilePath,
    photoLinkPath,
} from './model/gallery-model';
import * as S from './styles';

interface NextAndPrevNavigation {
    next?: () => void;
    prev?: () => void;
}

export function PhotoView({ gallery }: GalleryProps) {
    const history = useHistory();
    const { filename } = useParams<Record<string, string | undefined>>();

    const photoIdx = gallery.photos.findIndex((p) =>
        filename ? p.filename === filename : false
    );
    const photo = gallery.photos[photoIdx];

    const nextAndPrev = {
        prev:
            photoIdx > 0
                ? () =>
                      history.push(photoLinkPath(gallery.photos[photoIdx - 1]))
                : undefined,
        next:
            photoIdx <= gallery.photos.length - 2
                ? () =>
                      history.push(photoLinkPath(gallery.photos[photoIdx + 1]))
                : undefined,
    };

    useEffect(() => {
        document.onkeydown = (event) => {
            switch (event.code) {
                case 'ArrowLeft':
                    if (nextAndPrev.prev) nextAndPrev.prev();
                    break;
                case 'ArrowRight':
                    if (nextAndPrev.next) nextAndPrev.next();
                    break;
                default:
                    break;
            }
        };
    });

    const bodyElement = photo ? (
        <SinglePhotoView
            gallery={gallery}
            photo={photo}
            nextAndPrev={nextAndPrev}
        />
    ) : (
        <p>Photo with filename {filename} not found</p>
    );

    return (
        <div>
            <Link to="/">
                <Title gallery={gallery} />
            </Link>
            <Description gallery={gallery} />
            {bodyElement}
            <IconAttribution />
        </div>
    );
}

interface SinglePhotoProps {
    gallery: GalleryModel;
    photo: Photo;
    nextAndPrev: NextAndPrevNavigation;
}

function SinglePhotoView({ gallery, photo, nextAndPrev }: SinglePhotoProps) {
    const takenDate = photo.taken?.toLocaleDateString();

    return (
        <>
            <S.PhotoContainer>
                {nextAndPrev.prev ? (
                    <S.PhotoBackLink onClick={nextAndPrev.prev} />
                ) : undefined}
                <S.Photo
                    src={photoFilePath(gallery, photo)}
                    alt={photo.title}
                />
                {nextAndPrev.next ? (
                    <S.PhotoForwardLink onClick={nextAndPrev.next} />
                ) : undefined}
            </S.PhotoContainer>
            <S.PhotoDescriptionContainer>
                <S.PhotoTitle>{photo.title}</S.PhotoTitle>
                <S.PhotoDescription>{photo.description}</S.PhotoDescription>
                {takenDate ? (
                    <S.PhotoDescription>{takenDate}</S.PhotoDescription>
                ) : undefined}
            </S.PhotoDescriptionContainer>
        </>
    );
}
