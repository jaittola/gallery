import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import {
    GalleryProps,
    loadGalleryModel,
    photoRoutePattern,
} from './model/gallery-model';
import { PhotoView } from './PhotoView';
import { ThumbnailView } from './ThumbnailView';

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

function Gallery({ gallery }: GalleryProps) {
    useEffect(() => {
        document.title = gallery.title;
    });

    return (
        <HashRouter>
            <Switch>
                <Route exact path="/">
                    <ThumbnailView gallery={gallery} />
                </Route>
                <Route
                    path={photoRoutePattern()}
                    children={<PhotoView gallery={gallery} />}
                />
            </Switch>
        </HashRouter>
    );
}
