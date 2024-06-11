import { createApi } from '@reduxjs/toolkit/query/react'

import axiosBaseQuery from '../../services/axiosBaseQuery'

export const priorityApi = createApi({
  reducerPath: 'priorityApi',
  baseQuery: axiosBaseQuery(),
  endpoints: build => ({
    getPriorities: build.query({
      query: id => ({
        url: `Priority/getAll`,
        params: { id }
      })
    })
  })
})

export const { useGetPrioritiesQuery } = priorityApi
