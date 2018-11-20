import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Transport } from 'cross-origin-communicator';

import { setResult } from 'checkout/actions';
import { ThemeProvider } from 'checkout/styled-components';
import { configureStore } from './configure-store';
import { App } from './components/app';
import { finalize } from './finalize';
import { initialize } from './initialize';
import theme from 'checkout/themes/main';

import './styles/main.scss';
import './styles/forms.scss';

initialize().then((res) => {
    const [transport, config] = res;
    const app = document.getElementById('app');
    const store = configureStore({ config });
    store.subscribe(() => {
        const state = store.getState();
        if (state.result) {
            finalize(state, transport as Transport, app, bindActionCreators(setResult, store.dispatch));
        }
    });
    ReactDOM.render(
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </Provider>,
        app
    );
});
