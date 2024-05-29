import { notification } from 'antd'

const notificationFunc = (message, description, type) =>
  notification[type]({
    message: message,
    description: description
  })

export default notificationFunc
