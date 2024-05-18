import { Breadcrumb, Layout, Menu } from 'antd'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import SideBar from '../components/SideBar'
import { useTheme } from '../hooks/useTheme'

const { Sider, Content } = Layout

const menuItems = [
  {
    key: '1',
    icon: <i className='fa fa-credit-card'></i>,
    label: 'Cyber Board'
  },
  {
    key: '2',
    icon: <i className='fa fa-cog'></i>,
    label: 'Project Settings'
  },
  {
    type: 'divider'
  },
  {
    key: '3',
    icon: <i className='fa fa-truck'></i>,
    label: 'Releases'
  },
  {
    key: '4',
    icon: <i className='fa fa-equals'></i>,
    label: 'Issues and filters'
  },
  {
    key: '5',
    icon: <i className='fa fa-paste'></i>,
    label: 'Pages'
  },
  {
    key: '6',
    icon: <i className='fa fa-location-arrow'></i>,
    label: 'Reports'
  },
  {
    key: '7',
    icon: <i className='fa fa-box'></i>,
    label: 'Components'
  }
]

function CyberBugsTemplate() {
  const [collapsed, setCollapsed] = useState(true)
  const { token } = useTheme()
  const toggle = () => setCollapsed(!collapsed)
  return (
    <div className='h-screen font-normal flex'>
      <Layout>
        <Sider width={64}>
          <SideBar />
        </Sider>
        <Sider width={250} collapsible collapsed={collapsed} onCollapse={toggle}>
          <div className='py-5 flex justify-evenly'>
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
            items={menuItems}
          />
        </Sider>
        <Layout>
          <Content
            style={{
              margin: '16px',
              padding: 24,
              minHeight: 280,
              background: token.colorBgContainer,
              borderRadius: token.borderRadiusLG
            }}
          >
            <Breadcrumb
              items={[
                { href: '', title: 'Project' },
                { href: '', title: 'CyberLearn' },
                { title: 'Cyber Board' }
              ]}
            />
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default CyberBugsTemplate
