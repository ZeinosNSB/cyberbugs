import { createApi } from '@reduxjs/toolkit/query/react'

import axiosBaseQuery from '../../services/axiosBaseQuery'

export const projectCategoryApi = createApi({
  reducerPath: 'projectCategoryApi',
  baseQuery: axiosBaseQuery(),
  endpoints: build => ({
    getProjectsCategory: build.query({
      query: () => 'ProjectCategory'
    })
  })
})

export const { useGetProjectsCategoryQuery } = projectCategoryApi
