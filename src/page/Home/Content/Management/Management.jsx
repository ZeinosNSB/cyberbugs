import { ProjectOutlined, UserOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom'

function Management() {
  return (
    <div className='grid grid-cols-2 gap-4 divide-x divide-neutral-700'>
      <NavLink
        to='/project-management'
        className='flex w-full flex-col items-center justify-center py-2 text-neutral-400 transition-colors hover:text-neutral-50'
      >
        <ProjectOutlined className='mb-2 text-xl text-indigo-300' />
        <span className='text-xs'>Project</span>
      </NavLink>
      <NavLink
        to='/project-management'
        className='flex w-full flex-col items-center justify-center py-2 text-neutral-400 transition-colors hover:text-neutral-50'
      >
        <UserOutlined className='mb-2 text-xl text-indigo-300' />
        <span className='text-xs'>Users</span>
      </NavLink>
    </div>
  )
}

export default Management
