import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  projectDetail: {}
}

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProjectDetail: (state, action) => {
      state.projectDetail = action.payload
    }
  }
})

export const { setProjectDetail } = projectSlice.actions
export default projectSlice.reducer
