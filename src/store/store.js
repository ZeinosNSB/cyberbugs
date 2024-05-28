import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { projectApi } from './api/project.service'
import { projectCategoryApi } from './api/projectCategory.service'
import { usersApi } from './api/users.service'
import drawerReducer from './reducer/drawer.slice'
import projectReducer from './reducer/project.slice'
import usersReducer from './reducer/users.slice'

const store = configureStore({
  reducer: {
    users: usersReducer,
    drawer: drawerReducer,
    project: projectReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [projectCategoryApi.reducerPath]: projectCategoryApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(projectCategoryApi.middleware)
      .concat(projectApi.middleware)
      .concat(usersApi.middleware)
})

setupListeners(store.dispatch)

export default store
