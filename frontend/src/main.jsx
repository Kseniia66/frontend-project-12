import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import * as filter from 'leo-profanity';
import { io } from 'socket.io-client';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

import App from './App.jsx';
import resources from './locales/index.js';
import { api } from './api.js';
import modalsReducer from './store/modalSlices.js';
import activeChannelReducer from './store/channelsSlice.js';

const i18n = i18next.createInstance();
i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'ru',
  interpolation: { escapeValue: false },
});

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  activeChannel: activeChannelReducer,
  modals: modalsReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

const socket = io();

socket.on('newChannel', (payload) => {
  store.dispatch(api.util.updateQueryData('getChannels', undefined, (draft) => {
    draft.push(payload);
  }));
});

socket.on('removeChannel', (payload) => {
  store.dispatch(api.util.updateQueryData('getChannels', undefined, (draft) => {
    return draft.filter((channel) => channel.id !== payload.id);
  }));
});

socket.on('renameChannel', (payload) => {
  store.dispatch(api.util.updateQueryData('getChannels', undefined, (draft) => {
    const channel = draft.find((c) => c.id === payload.id);
    if (channel) channel.name = payload.name;
  }));
});

socket.on('newMessage', (payload) => {
  store.dispatch(api.util.updateQueryData('getMessages', undefined, (draft) => {
    draft.push(payload);
  }));
});

filter.add(filter.getDictionary('en'));
filter.add(filter.getDictionary('ru'));

const rollbarConfig = {
  accessToken: 'cfab6ea4a3eb4ac1a3ac490902d06b7c',
  environment: 'testenv',
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <RollbarProvider config={rollbarConfig}>
    <StrictMode>
      <I18nextProvider i18n={i18n}>
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

