import './index.css'

import { ConfigProvider } from 'antd'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './App.jsx'
import store from './store/store'
import { config } from './theme/config'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={config}>
        <App />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
)
