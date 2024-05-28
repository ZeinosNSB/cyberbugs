import { createApi } from '@reduxjs/toolkit/query/react'

import axiosBaseQuery from '../../services/axiosBaseQuery'

export const projectApi = createApi({
  reducerPath: 'projectApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Project'],
  endpoints: build => ({
    getAllProjects: build.query({
      query: () => 'Project/getAllProject',
      providesTags: result =>
        result
          ? [
              ...result.content.map(({ id }) => ({ type: 'Project', id })),
              { type: 'Project', id: 'LIST' }
            ]
          : [{ type: 'Project', id: 'LIST' }]
    }),
    createProject: build.mutation({
      query: body => ({
        url: 'Project/createProjectAuthorize',
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: 'Project', id: 'LIST' }]
    }),
    getProjectDetail: build.query({
      query: id => ({
        url: 'Project/getProjectDetail',
        params: { id }
      })
    })
  })
})

export const {
  useGetAllProjectsQuery,
  useCreateProjectMutation,
  useGetProjectDetailQuery
} = projectApi
