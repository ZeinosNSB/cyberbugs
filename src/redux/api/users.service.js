import { createApi } from '@reduxjs/toolkit/query/react'

import axiosBaseQuery from '../../services/axiosBaseQuery'

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Users'],
  endpoints: build => ({
    signIn: build.mutation({
      query: body => ({
        url: 'Users/signin',
        method: 'POST',
        data: body
      })
    }),
    getUser: build.query({
      query: keyword => ({
        url: 'Users/getUser',
        params: { keyword }
      }),
      providesTags: result =>
        result
          ? [
              ...result.content.map(({ id }) => ({ type: 'Users', id })),
              { type: 'Users', id: 'LIST' }
            ]
          : [{ type: 'Users', id: 'LIST' }]
    })
  })
})

export const { useSignInMutation, useGetUserQuery } = usersApi
