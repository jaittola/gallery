import React from 'react';
import ReactDOM from 'react-dom';
import * as S from './styles';

export function renderGallery(rootElementName: string) {
    ReactDOM.render(
        <React.StrictMode>
            <Gallery />
        </React.StrictMode>,
        document.getElementById(rootElementName)
    );
}

function Gallery() {
    return (
        <div>
            <Title />
            <Description />
            <ThumbnailArray />
            <IconAttribution />
        </div>
    );
}

function Title() {
    return <S.PageTitleText>Gallery</S.PageTitleText>;
}

function Description() {
    return <S.DescriptionText>Description</S.DescriptionText>;
}

function ThumbnailArray() {
    return (
        <>
            <p>Just testing</p>
        </>
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
