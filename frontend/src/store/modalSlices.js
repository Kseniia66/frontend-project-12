import { createSlice } from '@reduxjs/toolkit';

const modalsSlice = createSlice({
  name: 'modals',
  initialState: { type: null, channel: null },
  reducers: {
    openModal: (state, { payload }) => {
      state.type = payload.type;
      state.channel = payload.channel;
    },
    closeModal: (state) => {
      state.type = null;
      state.channel = null;
    },
  },
});

export const { openModal, closeModal } = modalsSlice.actions;
export default modalsSlice.reducer;
