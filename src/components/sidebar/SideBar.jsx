import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { openDrawer } from '../../redux/reducer/drawer.slice'
import CreateTask from '../drawer/CreateTask'

function SideBar() {
  const dispatch = useDispatch()

  const handleOpen = () => {
    dispatch(openDrawer('createTask'))
  }

  return (
    <div className='fixed z-10 overflow-x-hidden h-screen w-16 bg-orange-400 transition-all duration-200 ease-linear group hover:w-48 rounded-r-2xl'>
      <div className='flex text-3xl items-center text-white transition-all duration-100 ease-linear px-4 pt-8 mb-6 cursor-pointer'>
        <Link to='/'>
          <i className='fab fa-jira' />
        </Link>
      </div>
      <div
        onClick={handleOpen}
        className='flex items-center text-white transition-all duration-100 ease-linear px-6 py-3 mb-6 text-lg cursor-pointer hover:bg-white hover:bg-opacity-10 rounded-r-full'
      >
        <i className='fa fa-plus' />
        <span className='ml-6 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-linear'>
          CREATE TASK
        </span>
      </div>
      <div className='flex items-center text-white transition-all duration-100 ease-linear px-6 py-3 mb-6 text-lg cursor-pointer hover:bg-white hover:bg-opacity-10 rounded-r-full'>
        <i className='fa fa-search' />
        <span className='ml-6 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-linear'>
          SEARCH ISSUES
        </span>
      </div>
      <div className='absolute bottom-10 left-0 w-full flex items-center text-white transition-all duration-100 ease-linear px-6 py-3 mb-6 text-lg cursor-pointer hover:bg-white hover:bg-opacity-10 rounded-r-full'>
        <i className='fa fa-question-circle' />
        <span className='ml-6 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-linear'>
          ABOUT
        </span>
      </div>
      <CreateTask />
    </div>
  )
}

export default SideBar
