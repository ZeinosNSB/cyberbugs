import { createApi } from '@reduxjs/toolkit/query/react'

import axiosBaseQuery from '../../services/axiosBaseQuery'

export const projectApi = createApi({
  reducerPath: 'projectApi',
  baseQuery: axiosBaseQuery(),

  // baseQuery: fetchBaseQuery({
  //   baseUrl: DOMAIN_API,
  //   prepareHeaders: headers => {
  //     const token = localStorage.getItem(TOKEN)
  //     if (token) {
  //       headers.set('Authorization', `Bearer ${token}`)
  //     }
  //     return headers
  //   }
  // }),
  tagTypes: ['Project', 'Project Detail', 'Task Detail'],
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
    }),
    assignUserProject: build.mutation({
      query: body => ({
        url: 'Project/assignUserProject',
        method: 'POST',
        data: body
      }),
      invalidatesTags: (result, error, body) => [{ type: 'Project', id: body.projectID }]
    }),
    removeUserFromProject: build.mutation({
      query: body => ({
        url: 'Project/removeUserFromProject',
        method: 'POST',
        data: body
      }),
      invalidatesTags: (result, error, body) => [{ type: 'Project', id: body.projectID }]
    }),
    getProjectDetail: build.query({
      query: id => ({
        url: 'Project/getProjectDetail',
        params: { id }
      }),
      providesTags: result =>
        result ? [{ type: 'Project Detail', id: result.content.id }] : []
    }),
    createTask: build.mutation({
      query: body => ({
        url: 'Project/createTask',
        method: 'POST',
        data: body
      }),
      invalidatesTags: (result, error, body) => [
        { type: 'Project Detail', id: body.projectId }
      ]
    }),
    getTaskDetail: build.query({
      query: id => ({
        url: 'Project/getTaskDetail',
        params: { taskId: id }
      }),
      providesTags: result =>
        result ? [{ type: 'Task Detail', id: result.content.id }] : []
    })
  })
})

export const {
  useGetAllProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useAssignUserProjectMutation,
  useRemoveUserFromProjectMutation,
  useGetProjectDetailQuery,
  useCreateTaskMutation,
  useGetTaskDetailQuery
} = projectApi
