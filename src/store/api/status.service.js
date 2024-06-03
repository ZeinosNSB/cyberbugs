import { createApi } from '@reduxjs/toolkit/query/react'

import axiosBaseQuery from '../../services/axiosBaseQuery'

export const statusApi = createApi({
  reducerPath: 'statusApi',
  baseQuery: axiosBaseQuery(),
  endpoints: build => ({
    getStatus: build.query({
      query: () => 'Status/getAll'
    })
  })
})

export const { useGetStatusQuery } = statusApi
