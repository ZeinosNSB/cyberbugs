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
    signUp: build.mutation({
      query: body => ({
        url: 'Users/signup',
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
              ...result.content.map(({ userId }) => ({ type: 'Users', id: userId })),
              { type: 'Users', id: 'LIST' }
            ]
          : [{ type: 'Users', id: 'LIST' }]
    }),
    editUser: build.mutation({
      query: body => ({
        url: 'Users/editUser',
        method: 'PUT',
        data: body
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Users', id }]
    }),
    deleteUser: build.mutation({
      query: id => ({
        url: 'Users/deleteUser',
        method: 'DELETE',
        params: { id }
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Users', id }]
    })
  })
})

export const {
  useSignInMutation,
  useGetUserQuery,
  useSignUpMutation,
  useEditUserMutation,
  useDeleteUserMutation
} = usersApi
