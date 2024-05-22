import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import http from '../../utils/http'

const initialState = {
  setUserSignIn: {},
  SignIn: []
}

export const usersSignIn = createAsyncThunk('users/signIn', async (data, thunkAPI) => {
  try {
    const response = await http.post('Users/signin', data, {
      signal: thunkAPI.signal
    })
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserSignIn: (state, action) => {
      state.userSignIn = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(usersSignIn.fulfilled, (state, action) => {
      state.SignIn = action.payload
    })
  }
})

export const { setUserSignIn } = usersSlice.actions
export default usersSlice.reducer
