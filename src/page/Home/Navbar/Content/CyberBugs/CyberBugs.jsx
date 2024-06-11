import { NavLink } from 'react-router-dom'

function CyberBugs() {
  return (
    <div>
      <div className='flex gap-4'>
        <div>
          <h3 className='mb-2 font-bold text-neutral-900'>Startup</h3>
          <NavLink
            to='cyberbugs'
            className='mb-1 block text-sm text-neutral-600 transition-colors hover:text-amber-500'
          >
            Board Template
          </NavLink>
          <NavLink
            to='cyberbugs/15074'
            className='block text-sm text-neutral-600 transition-colors hover:text-amber-500'
          >
            Project 15074
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default CyberBugs
