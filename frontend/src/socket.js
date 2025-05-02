import { io } from 'socket.io-client';
import { api } from './api.js';

const createSocket = (store) => {
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
    return socket;
};

export  default createSocket;
