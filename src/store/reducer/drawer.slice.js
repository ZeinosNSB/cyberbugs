import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentDrawer: null
}

const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    openDrawer: (state, action) => {
      state.currentDrawer = action.payload
    },
    closeDrawer: state => {
      state.currentDrawer = null
    }
  }
})

export const { openDrawer, closeDrawer } = drawerSlice.actions
export default drawerSlice.reducer
