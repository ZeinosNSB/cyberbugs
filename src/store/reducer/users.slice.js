import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userSignIn: []
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserSignIn: (state, action) => {
      state.userSignIn = action.payload
    }
  }
})

export const { setUserSignIn } = usersSlice.actions
export default usersSlice.reducer
