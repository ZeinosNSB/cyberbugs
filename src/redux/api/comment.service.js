import { createApi } from '@reduxjs/toolkit/query/react'

import axiosBaseQuery from '../../services/axiosBaseQuery'

export const commentApi = createApi({
  reducerPath: 'commentApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Comment'],
  endpoints: build => ({
    getAllComments: build.query({
      query: id => ({
        url: 'Comment/getAll',
        params: { taskId: id }
      }),
      providesTags: result =>
        result
          ? [
              ...result.content.map(({ id }) => ({ type: 'Comment', id })),
              { type: 'Comment', id: 'LIST' }
            ]
          : [{ type: 'Comment', id: 'LIST' }]
    }),
    insertComment: build.mutation({
      query: body => ({
        url: 'Comment/insertComment',
        method: 'POST',
        data: body
      }),
      invalidatesTags: [{ type: 'Comment', id: 'LIST' }]
    }),
    updateComment: build.mutation({
      query: body => ({
        url: 'Comment/updateComment',
        method: 'PUT',
        params: {
          id: body.id,
          contentComment: body.comment
        }
      }),
      invalidatesTags: (result, error, body) => [{ type: 'Comment', id: body.id }]
    }),
    deleteComment: build.mutation({
      query: id => ({
        url: 'Comment/deleteComment',
        method: 'DELETE',
        params: { idComment: id }
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Comment', id }]
    })
  })
})

export const {
  useGetAllCommentsQuery,
  useInsertCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation
} = commentApi
