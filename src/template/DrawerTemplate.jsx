import { Button, Drawer, Space } from 'antd'
import { useDispatch } from 'react-redux'

import { closeDrawer } from '../redux/reducer/drawer.slice'

function DrawerTemplate({ children, onSubmitCallback, placement, title, open }) {
  const dispatch = useDispatch()

  const onClose = () => {
    dispatch(closeDrawer())
  }

  return (
    <div>
      <Drawer
        title={title}
        placement={placement || 'right'}
        closable={false}
        onClose={onClose}
        open={open}
        key='left'
        width={720}
        destroyOnClose={true}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button htmlType='submit' onClick={onSubmitCallback} type='primary'>
              Submit
            </Button>
          </Space>
        }
      >
        {children}
      </Drawer>
    </div>
  )
}

export default DrawerTemplate
