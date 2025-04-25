import { createSlice } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { api } from '../api.js';
import modalsReducer from './modalSlices.js';
import activeChannelReducer from './channelsSlice.js';

export default configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        activeChannel: activeChannelReducer,
        modals: modalsReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(api.middleware),
});
