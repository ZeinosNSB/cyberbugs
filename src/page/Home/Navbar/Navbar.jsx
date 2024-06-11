import { DownOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

import Content from './Content'
import CyberBugs from './Content/CyberBugs'
import Management from './Content/Management'

function Navbar() {
  const [selected, setSelected] = useState(null)
  const [dir, setDir] = useState(null)

  const handleSetSelected = val => {
    if (typeof selected === 'number' && typeof val === 'number') {
      setDir(selected > val ? 'r' : 'l')
    } else if (val === null) {
      setDir(null)
    }

    setSelected(val)
  }

  return (
    <div className='container mx-auto flex items-center h-full justify-between py-4 bg-transparent'>
      <Link to='/'>
        <img src='/img/logo.png' className='mr-10 h-32' alt='Logo' />
      </Link>
      <div
        onMouseLeave={() => handleSetSelected(null)}
        className='relative flex h-fit gap-2'
      >
        {TABS.map(tab => (
          <NavLink
            key={tab.id}
            id={`shift-tab-${tab.id}`}
            onMouseEnter={() => handleSetSelected(tab.id)}
            onClick={() => handleSetSelected(tab.id)}
            className={`flex items-center gap-1 rounded-full px-3 py-1.5 transition-colors ${
              selected === tab.id
                ? ' bg-neutral-200 text-neutral-900'
                : 'text-neutral-600'
            }`}
            to={tab.path}
          >
            <span>{tab.title}</span>
            {tab.content && (
              <DownOutlined
                className={`transition-transform ${selected === tab.id ? 'rotate-180' : ''} w-3 pl-1`}
              />
            )}
          </NavLink>
        ))}

        <AnimatePresence>
          {selected && TABS[selected - 1].content && (
            <Content dir={dir} selected={selected} TABS={TABS} />
          )}
        </AnimatePresence>
      </div>
      <div>
        <Button type='text' className='mr-3 text-neutral-500' size='large'>
          <Link to='signin'>Sign in</Link>
        </Button>
        <Button type='primary' size='large'>
          <Link to='signup'>Sign up</Link>
        </Button>
      </div>
    </div>
  )
}

const TABS = [
  {
    title: 'Home',
    path: ''
  },
  {
    title: 'CyberBugs',
    Component: CyberBugs,
    content: true
  },
  {
    title: 'Management',
    Component: Management,
    content: true
  },
  {
    title: 'About',
    path: ''
  }
].map((tab, index) => ({ ...tab, id: index + 1 }))

export default Navbar
