import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { loadGalleryModel } from './model/gallery-model';
import { PhotoView } from './PhotoView';
import { ThumbnailView } from './ThumbnailView';
import { GalleryComponentProps } from './ui-types';

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
        <Router>
            <Switch>
                <Route exact path="/">
                    <ThumbnailView gallery={gallery} />
                </Route>
                <Route
                    path="/photo/:filename+"
                    children={<PhotoView gallery={gallery} />}
                />
            </Switch>
        </Router>
    );
}
