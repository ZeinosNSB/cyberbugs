import { configureStore } from '@reduxjs/toolkit'

import projectReducer from './reducer/projectSlice'
import usersReducer from './reducer/usersSlice'

const store = configureStore({
  reducer: {
    users: usersReducer,
    project: projectReducer
  }
})

export default store
