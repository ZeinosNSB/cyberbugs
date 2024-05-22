import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import http from '../../utils/http'
import { TOKEN } from '../../utils/settingSystems'

const initialState = {
  projectsPriority: [],
  createProjects: []
}

export const getProjectsPriority = createAsyncThunk(
  'project/getProjectsPriority',
  async (_, thunkAPI) => {
    try {
      const response = await http.get('ProjectCategory', {
        signal: thunkAPI.signal
      })
      return response.data.content
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const createProject = createAsyncThunk(
  'project/createProjectAuthorize',
  async (data, thunkAPI) => {
    try {
      const response = await http.post('Project/createProjectAuthorize', data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(TOKEN)}`
        },
        signal: thunkAPI.signal
      })
      return response.data.content
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getProjectsPriority.fulfilled, (state, action) => {
      state.projectsPriority = action.payload
    })
    builder.addCase(createProject.fulfilled, (state, action) => {
      state.createProjects.push(action.payload)
    })
  }
})

const projectReducer = projectSlice.reducer
export default projectReducer
