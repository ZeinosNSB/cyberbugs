import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store'
import { ConfigProvider } from 'antd'
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
