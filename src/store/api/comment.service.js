import { createApi } from '@reduxjs/toolkit/query/react'

import axiosBaseQuery from '../../services/axiosBaseQuery'

export const commentApi = createApi({
  reducerPath: 'commentApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Comment'],
  endpoints: build => ({
    getAllComments: build.query({
      query: () => 'Comment/getAllComment',
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
        params: { commentId: body.id },
        method: 'PUT',
        data: body.data
      }),
      invalidatesTags: (result, error, body) => [{ type: 'Comment', id: body.id }]
    }),
    deleteComment: build.mutation({
      query: id => ({
        url: 'Comment/deleteComment',
        method: 'DELETE',
        params: { commentID: id }
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
