import React, { useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { Description, IconAttribution, Title } from './Components';
import * as S from './styles';
import { Photo } from './types/gallery-types';
import { GalleryComponentProps } from './ui-types';

export function PhotoView({ gallery }: GalleryComponentProps) {
    const history = useHistory();
    const { filename } = useParams<Record<string, string | undefined>>();

    const photoIdx = gallery.photos.findIndex((p) =>
        filename ? p.filename === filename : false
    );
    const photo = gallery.photos[photoIdx];

    const prevPhotoUrl =
        photoIdx > 0
            ? `/photo/${gallery.photos[photoIdx - 1].filename}`
            : undefined;
    const nextPhotoUrl =
        photoIdx <= gallery.photos.length - 2
            ? `/photo/${gallery.photos[photoIdx + 1].filename}`
            : undefined;

    useEffect(() => {
        document.onkeydown = (event) => {
            switch (event.code) {
                case 'ArrowRight':
                    if (nextPhotoUrl) history.push(nextPhotoUrl);
                    break;
                case 'ArrowLeft':
                    if (prevPhotoUrl) history.push(prevPhotoUrl);
                    break;
                default:
                    break;
            }
        };
    });

    const bodyElement = photo ? (
        <SinglePhotoView
            photo={photo}
            nextPhotoUrl={nextPhotoUrl}
            prevPhotoUrl={prevPhotoUrl}
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
    photo: Photo;
    nextPhotoUrl?: string;
    prevPhotoUrl?: string;
}

function SinglePhotoView(props: SinglePhotoProps) {
    const history = useHistory();

    const photo = props.photo;
    const takenDate = photo.taken?.toLocaleDateString();

    function nextPhoto() {
        if (props.nextPhotoUrl) history.push(props.nextPhotoUrl);
    }

    function prevPhoto() {
        if (props.prevPhotoUrl) history.push(props.prevPhotoUrl);
    }

    return (
        <>
            <S.PhotoContainer>
                {props.prevPhotoUrl ? (
                    <S.PhotoBackLink onClick={prevPhoto} />
                ) : undefined}
                <S.Photo src={`/${props.photo.filename}`} alt={photo.title} />
                {props.nextPhotoUrl ? (
                    <S.PhotoForwardLink onClick={nextPhoto} />
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
