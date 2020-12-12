import styled from 'styled-components';

const textColor = '#101010';

export const PageTitleText = styled.h1`
    font-size: 2rem;
    color: ${textColor};
`;
export const DescriptionText = styled.p`
    color: ${textColor};
`;

export const FooterText = styled.footer`
    margin-top: 20px;
    color: #a0a0a0;
    font-size: 0.6rem;
`;

export const GalleryPhotosContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
`;

export const Thumbnail = styled.img`
    object-fit: cover;
`;

const thumbnailContainerOffset = '5px';

export const ThumbnailContainer = styled.figure`
    display: inline-block;
    position: relative;
    margin: ${thumbnailContainerOffset};
`;

export const ThumbnailOverlay = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0;
    transition: all 0.4s ease;
    &:hover {
        opacity: 0.9;
    }
`;

export const ThumbnailOverlayTextBox = styled.figcaption`
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 20%;
    margin-bottom: ${thumbnailContainerOffset};
    padding: ${thumbnailContainerOffset} 10px ${thumbnailContainerOffset} 10px;
    background-color: #323232;
    color: white;
    overflow: hidden;
`;

export const PhotoContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
`;

export const PhotoBackLink = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 40%;
`;

export const PhotoForwardLink = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 40%;
`;

export const Photo = styled.img`
    max-height: 80vh;
    max-width: 90vw;
`;

export const PhotoDescriptionContainer = styled.figcaption`
    margin-top: 10px;
    margin-left: 10px;
`;

export const PhotoTitle = styled.div`
    font-size: 1.2rem;
    margin-bottom: 5px;
`;

export const PhotoDescription = styled.div`
    margin-bottom: 5px;
`;

export const ThumbnailSizeSelectContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: none;
    justify-content: flex-end;
    margin-right: 20px;
    margin-bottom: 10px;
`;

export const Select = styled.select`
    font-size: inherit;
    margin-top: -3px;
`;

export const SelectExplanation = styled.div`
    margin-right: 0.4em;
`;

export const defaultThumbnailHeight = 200;

export const ThumbnailHeights = [50, 100, defaultThumbnailHeight, 300, 400];
