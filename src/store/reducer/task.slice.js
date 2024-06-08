import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  taskTypeArr: []
}

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTaskTypeArr: (state, action) => {
      state.taskTypeArr = action.payload
    }
  }
})

export const { setTaskTypeArr } = taskSlice.actions
export default taskSlice.reducer
