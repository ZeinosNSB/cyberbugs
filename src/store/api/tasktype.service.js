import { createApi } from '@reduxjs/toolkit/query/react'

import axiosBaseQuery from '../../services/axiosBaseQuery'

export const taskTypeApi = createApi({
  reducerPath: 'taskTypeApi',
  baseQuery: axiosBaseQuery(),
  endpoints: build => ({
    getTaskTypes: build.query({
      query: () => 'TaskType/getAll'
    })
  })
})

export const { useGetTaskTypesQuery } = taskTypeApi
