import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { Breadcrumb, Layout, Menu, theme } from 'antd'
import { useState } from 'react'

import SideBar from '../components/SideBar'

const { Sider, Content } = Layout

function CyberBugsTemplate() {
  const [collapsed, setCollapsed] = useState(true)
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()
  const toggle = () => {
    setCollapsed(!collapsed)
  }
  return (
    <div className='h-screen font-normal flex'>
      <Layout>
        <Sider width={64}>
          <SideBar />
        </Sider>
        <Sider width={250} collapsible collapsed={collapsed} onCollapse={toggle}>
          <div className='py-5 flex justify-around'>
            <img
              className='w-14 h-auto rounded-full cursor-pointer'
              src='./img/download.jfif'
              alt='Logo'
            />
            {!collapsed && (
              <div>
                <p className='font-medium text-lg text-gray-500'>Cyberlearn.vn</p>
                <p className='text-xs text-amber-600'>Report Bugs</p>
              </div>
            )}
          </div>
          <Menu
            style={{ borderInlineEnd: 'none' }}
            mode='inline'
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <UserOutlined />,
                label: 'nav 1'
              },
              {
                key: '2',
                icon: <VideoCameraOutlined />,
                label: 'nav 2'
              },
              {
                key: '3',
                icon: <UploadOutlined />,
                label: 'nav 3'
              }
            ]}
          />
        </Sider>
        <Layout>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG
            }}
          >
            <Breadcrumb>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet assumenda
              commodi corporis cum, delectus dolores eaque est in ipsam nostrum placeat
              quae quia quisquam tempora tempore, vel vero voluptates.
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default CyberBugsTemplate
