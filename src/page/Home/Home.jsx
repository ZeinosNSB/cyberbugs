import { DownOutlined } from '@ant-design/icons'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

import Content from './Content'
import Management from './Content/Management'

const Home = () => {
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
    <div className='flex h-full w-full justify-start bg-neutral-950 p-8 text-neutral-200 md:justify-center'>
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
            className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-sm transition-colors ${
              selected === tab.id
                ? ' bg-neutral-800 text-neutral-100'
                : 'text-neutral-400'
            }`}
            to={tab.path}
          >
            <span>{tab.title}</span>
            {tab.content && (
              <DownOutlined
                className={`transition-transform ${selected === tab.id ? 'rotate-180' : ''} w-4 pl-1`}
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
    </div>
  )
}

const TABS = [
  {
    id: 1,
    title: 'Cyberbugs',
    path: 'cyberbugs'
  },
  {
    id: 2,
    title: 'Create Project',
    path: 'create-project'
  },
  {
    id: 3,
    title: 'Management',
    Component: Management,
    content: true
  }
]

export default Home
