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
        body
      })
    })
  })
})

export const { useSignInMutation } = usersApi
