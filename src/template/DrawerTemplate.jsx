import { Button, Drawer, Space } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { closeDrawer } from '../store/reducer/drawer.slice'

function DrawerTemplate({ children, onSubmitCallback, placement }) {
  const { open } = useSelector(state => state.drawer)
  const dispatch = useDispatch()

  const onClose = () => {
    dispatch(closeDrawer())
  }

  return (
    <div>
      <Drawer
        title='Basic Drawer'
        placement={placement || 'right'}
        closable={false}
        onClose={onClose}
        open={open}
        key='left'
        width={720}
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
