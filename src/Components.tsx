import React from 'react';
import * as S from './styles';
import { GalleryComponentProps } from './ui-types';

export function Title({ gallery }: GalleryComponentProps) {
    return <S.PageTitleText>{gallery.title}</S.PageTitleText>;
}

export function Description({ gallery }: GalleryComponentProps) {
    return <S.DescriptionText>{gallery.description}</S.DescriptionText>;
}

export function IconAttribution() {
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
