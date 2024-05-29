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
        data: body
      }),
      invalidatesTags: [{ type: 'Project', id: 'LIST' }]
    }),
    getProjectDetail: build.query({
      query: id => ({
        url: 'Project/getProjectDetail',
        params: { id }
      })
    }),
    updateProject: build.mutation({
      query: body => ({
        url: 'Project/updateProject',
        params: { projectId: body.id },
        method: 'PUT',
        data: body.data
      }),
      invalidatesTags: (result, error, body) => [{ type: 'Project', id: body.id }]
    }),
    deleteProject: build.mutation({
      query: id => ({
        url: 'Project/deleteProject',
        method: 'DELETE',
        params: { projectID: id }
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Project', id }]
    })
  })
})

export const {
  useGetAllProjectsQuery,
  useCreateProjectMutation,
  useGetProjectDetailQuery,
  useUpdateProjectMutation,
  useDeleteProjectMutation
} = projectApi
