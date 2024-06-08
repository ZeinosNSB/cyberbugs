import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  statusArr: []
}

const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    setStatusArr: (state, action) => {
      state.statusArr = action.payload
    }
  }
})

export const { setStatusArr } = statusSlice.actions
export default statusSlice.reducer
