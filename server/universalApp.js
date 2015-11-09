import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import * as receiptService from './api/service/receipts';

import rootReducer from '../universal/reducers';
import Yaap2AppContainer from '../universal/containers/Yaap2AppContainer';

export function handleRender(req, res) {
    receiptService.getReceipts()
    .then(initialReceipts => {
        // Create a new Redux store instance
        const store = createStore(rootReducer, {receipts: initialReceipts, userId: 'baseUser'});

        // Render the component to a strng
        const html = ReactDOMServer.renderToString(
            <Provider store={store}>
                <Yaap2AppContainer />
            </Provider>
        );

        console.log("Initial receipts: " + store.getState());

        // Send the rendered page back to the client
        res.render('index', { html: html, initialState: JSON.stringify(store.getState()) });
    });
}
