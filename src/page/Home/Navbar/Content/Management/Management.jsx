import { ProjectOutlined, UserOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom'

function Management() {
  return (
    <div className='grid grid-cols-2 gap-4 divide-x divide-neutral-200'>
      <NavLink
        to='/project-management'
        className='group flex w-full items-center justify-center text-neutral-600'
      >
        <ProjectOutlined className='mb-2 p-3 text-xl rounded-lg border border-neutral-100 group-hover:text-white group-hover:bg-amber-500' />
        <span className='text-sm pl-4'>Project</span>
      </NavLink>
      <NavLink
        to='/user-management'
        className='group flex w-full items-center justify-center text-neutral-600'
      >
        <UserOutlined className='mb-2 p-3 text-xl rounded-lg border border-neutral-100 group-hover:text-white group-hover:bg-amber-500' />
        <span className='text-sm pl-4'>Users</span>
      </NavLink>
    </div>
  )
}

export default Management
