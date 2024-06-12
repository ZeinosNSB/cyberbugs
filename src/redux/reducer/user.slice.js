import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userDetail: {}
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetail: (state, action) => {
      state.userDetail = action.payload
    }
  }
})

export const { setUserDetail } = userSlice.actions
export default userSlice.reducer
