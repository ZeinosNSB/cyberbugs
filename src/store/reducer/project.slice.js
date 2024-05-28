import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  projectID: ''
}

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProjectID: (state, action) => {
      state.projectID = action.payload
    }
  }
})

export const { setProjectID } = projectSlice.actions
export default projectSlice.reducer
