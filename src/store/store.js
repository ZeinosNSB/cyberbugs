import { configureStore } from '@reduxjs/toolkit'

import { commentApi } from './api/comment.service'
import { priorityApi } from './api/priority.service'
import { projectApi } from './api/project.service'
import { projectCategoryApi } from './api/projectCategory.service'
import { statusApi } from './api/status.service'
import { taskTypeApi } from './api/tasktype.service'
import { usersApi } from './api/users.service'
import drawerReducer from './reducer/drawer.slice'
import notificationReducer from './reducer/notification.slice'
import priorityReducer from './reducer/priority.slice'
import projectReducer from './reducer/project.slice'
import statusReducer from './reducer/status.slice'
import taskReducer from './reducer/task.slice'
import usersReducer from './reducer/users.slice'

const store = configureStore({
  reducer: {
    users: usersReducer,
    drawer: drawerReducer,
    project: projectReducer,
    notification: notificationReducer,
    status: statusReducer,
    priority: priorityReducer,
    task: taskReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [projectCategoryApi.reducerPath]: projectCategoryApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
    [priorityApi.reducerPath]: priorityApi.reducer,
    [statusApi.reducerPath]: statusApi.reducer,
    [taskTypeApi.reducerPath]: taskTypeApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(projectCategoryApi.middleware)
      .concat(projectApi.middleware)
      .concat(usersApi.middleware)
      .concat(priorityApi.middleware)
      .concat(statusApi.middleware)
      .concat(taskTypeApi.middleware)
      .concat(commentApi.middleware)
})

export default store
