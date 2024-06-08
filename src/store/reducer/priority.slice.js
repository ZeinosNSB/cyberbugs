import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  priorityArr: []
}

const prioritySlice = createSlice({
  name: 'id',
  initialState,
  reducers: {
    setPriorityArr: (state, action) => {
      state.priorityArr = action.payload
    }
  }
})

export const { setPriorityArr } = prioritySlice.actions
export default prioritySlice.reducer
