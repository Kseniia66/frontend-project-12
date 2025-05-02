import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Channel', 'Message'],

  endpoints: builder => ({
    getChannels: builder.query({
      query: () => '/channels',
      providesTags: ['Channels'],
    }),
    addChannel: builder.mutation({
      query: channel => ({
        url: '/channels',
        method: 'POST',
        body: channel,
      }),
      invalidatesTags: ['Channels'],
    }),
    renameChannel: builder.mutation({
      query: ({ name, id }) => ({
        url: `/channels/${id}`,
        method: 'PATCH',
        body: { name },
      }),
      invalidatesTags: ['Channels'],
    }),
    removeChannel: builder.mutation({
      query: id => ({
        url: `/channels/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Channels'],
    }),

    getMessages: builder.query({
      query: () => '/messages',
      providesTags: ['Message'],
    }),
    addMessage: builder.mutation({
      query: newMessege => ({
        url: 'messages',
        method: 'POST',
        body: newMessege,
      }),
      invalidatesTags: ['Message'],
    }),
  }),
})

export const {
  useGetChannelsQuery,
  useGetMessagesQuery,
  useAddChannelMutation,
  useAddMessageMutation,
  useRenameChannelMutation,
  useRemoveChannelMutation,
} = api
