import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
  }
})

export default store
