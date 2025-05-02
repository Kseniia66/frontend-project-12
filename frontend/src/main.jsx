import React from 'react';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import * as filter from 'leo-profanity';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

import App from './App.jsx';
import i18n from './i18next.js';
import createSocket from './socket.js';
import getRollbarConfig from './rollbar.js';
import createStore from './store/store.js';

const init = async () => {
  const i18nInstance = await i18n;
  const store = createStore();
  const socket = createSocket(store);

  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));

  return (
    <RollbarProvider config={getRollbarConfig}>
      <StrictMode>
        <I18nextProvider i18n={i18nInstance}>
          <ErrorBoundary>
            <Provider store={store}>
              <App socket={socket} />
              <ToastContainer />
            </Provider>
          </ErrorBoundary>
        </I18nextProvider>
      </StrictMode>
    </RollbarProvider>
  );
};

export default init;
