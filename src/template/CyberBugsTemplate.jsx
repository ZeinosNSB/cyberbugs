import { Layout, Menu } from 'antd'
import { useMemo, useState } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'

import logo from '../assets/img/download.jfif'
import SideBar from '../components/SideBar'
import { useTheme } from '../hooks/useTheme'
import CreateProject from '../page/CreateProject'
import CyberBoard from '../page/CyberBoard'
import ProjectDetailBoard from '../page/ProjectDetailBoard'
import ProjectManagement from '../page/ProjectManagement'

const { Sider, Content } = Layout

const menuItems = [
  {
    key: '/cyberbugs',
    icon: <i className='fa fa-credit-card' />,
    label: <Link to='/cyberbugs'>Cyber Boards</Link>
  },
  {
    key: '/create-project',
    icon: <i className='fa fa-file-alt' />,
    label: <Link to='/create-project'>Create Projects</Link>
  },
  {
    key: '/project-management',
    icon: <i className='fa fa-folder-open' />,
    label: <Link to='/project-management'>Project Management</Link>
  },
  {
    type: 'divider'
  },
  {
    key: '3',
    icon: <i className='fa fa-truck' />,
    label: 'Releases'
  },
  {
    key: '4',
    icon: <i className='fa fa-equals' />,
    label: 'Issues and filters'
  },
  {
    key: '5',
    icon: <i className='fa fa-paste' />,
    label: 'Pages'
  },
  {
    key: '6',
    icon: <i className='fa fa-location-arrow' />,
    label: 'Reports'
  },
  {
    key: '7',
    icon: <i className='fa fa-box' />,
    label: 'Components'
  }
]

function CyberBugsTemplate() {
  const [collapsed, setCollapsed] = useState(true)
  const { token } = useTheme()
  const location = useLocation()
  const toggle = () => setCollapsed(!collapsed)

  const activeKey = useMemo(() => {
    const keys = menuItems.map(item => item.key)
    return keys.find(key => location.pathname.startsWith(key))
  }, [location])

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
              src={logo}
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
            selectedKeys={[activeKey]}
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
            <Routes>
              <Route path='cyberbugs' element={<CyberBoard />} />
              <Route path='cyberbugs/:projectID' element={<ProjectDetailBoard />} />
              <Route path='create-project' element={<CreateProject />} />
              <Route path='project-management' element={<ProjectManagement />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default CyberBugsTemplate
