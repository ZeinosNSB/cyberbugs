import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './reducer/usersSlice'

const store = configureStore({
  reducer: {
    users: usersReducer
  }
})

export default store
