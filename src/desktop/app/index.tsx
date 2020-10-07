import React from 'react';
import {render} from 'react-dom';

import {Provider} from "react-redux";
import {ConnectedRouter} from "connected-react-router";

import _c from 'js-cookie'

import {AppState, history} from "../../common/store";
import {ListStyle, Theme} from "../../common/store/global/types";
import {Global} from "../../common/store/global/types";
import {activeUserMaker} from "../../common/store/active-user";
import configureStore from "../../common/store/configure";
import initialState from "../../common/store/initial-state";

import App from "../../common/app";

import defaults from "../../common/constants/defaults.json";

import * as ls from "../../common/util/local-storage";

import "typeface-ibm-plex-sans";

import "../../style/theme-day.scss";
import "../../style/theme-night.scss";


// Create store

const theme = _c.get("theme") || defaults.theme;
const intro = !_c.get("hide-intro");
const listStyle = _c.get("list-style") || defaults.listStyle;

const globalState: Global = {
    ...initialState.global,
    theme: Theme[theme],
    listStyle: ListStyle[listStyle],
    intro
};

const activeUser = ls.get("active_user");

const preloadedState: AppState = {
    ...initialState,
    global: globalState,
    activeUser: activeUser ? activeUserMaker(activeUser) : initialState.activeUser,
}

const store = configureStore(preloadedState);

document.addEventListener('DOMContentLoaded', () => {
    render(
        <Provider store={store}>
            <ConnectedRouter history={history!}>
                <App/>
            </ConnectedRouter>
        </Provider>,
        document.getElementById('root')
    );
});
