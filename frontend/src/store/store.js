import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { api } from '../api.js';
import modalsReducer from './modalSlices.js';
import activeChannelReducer from './channelsSlice.js';

const createStore = () => {
  const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    activeChannel: activeChannelReducer,
    modals: modalsReducer,
  });

  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });
};

export default createStore;
