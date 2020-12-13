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

export function PhotoView({ gallery }: GalleryProps) {
    const history = useHistory();
    const { filename } = useParams<Record<string, string | undefined>>();

    const photoIdx = gallery.photos.findIndex((p) =>
        filename ? p.filename === filename : false
    );
    const photo = gallery.photos[photoIdx];

    const nextAndPrev = createNextAndPrev(photoIdx);

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
            <PhotoNavigation nextAndPrev={nextAndPrev} />
            {bodyElement}
            <IconAttribution />
        </div>
    );

    function createNextAndPrev(photoIdx: number): NextAndPrevNavigation {
        const prevLink =
            photoIdx > 0
                ? photoLinkPath(gallery.photos[photoIdx - 1])
                : undefined;
        const nextLink =
            photoIdx <= gallery.photos.length - 2
                ? photoLinkPath(gallery.photos[photoIdx + 1])
                : undefined;
        const prev = prevLink ? () => history.push(prevLink) : undefined;
        const next = nextLink ? () => history.push(nextLink) : undefined;

        return {
            prevLink,
            nextLink,
            prev,
            next,
        };
    }
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

interface NextAndPrevNavigation {
    next?: () => void;
    prev?: () => void;

    nextLink?: string;
    prevLink?: string;
}

interface PhotoNavigationProps {
    nextAndPrev: NextAndPrevNavigation;
}

function PhotoNavigation({ nextAndPrev }: PhotoNavigationProps) {
    return (
        <S.PhotoNavigation>
            {nextAndPrev.prevLink ? (
                <S.RRLink to={nextAndPrev.prevLink}>Previous</S.RRLink>
            ) : (
                <div>&nbsp;</div>
            )}
            <S.RRLink to="/">Up</S.RRLink>
            {nextAndPrev.nextLink ? (
                <S.RRLink to={nextAndPrev.nextLink}>Next</S.RRLink>
            ) : (
                <div>&nbsp;</div>
            )}
        </S.PhotoNavigation>
    );
}
