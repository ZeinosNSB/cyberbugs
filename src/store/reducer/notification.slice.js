import { createSlice } from '@reduxjs/toolkit'

import notificationFunc from '../../utils/notification'
import { projectApi } from '../api/project.service'

const initialState = {
  isDeleteAndFetch: false
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(projectApi.endpoints.deleteProject.matchFulfilled, state => {
        state.isDeleteAndFetch = true
      })
      .addMatcher(projectApi.endpoints.getAllProjects.matchFulfilled, state => {
        if (state.isDeleteAndFetch) {
          notificationFunc(
            'Deletion successful!',
            'Projects data has been completely deleted, bro',
            'success'
          )
          state.isDeleteAndFetch = false
        }
      })
  }
})

export default notificationSlice.reducer
