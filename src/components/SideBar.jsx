function SideBar() {
  return (
    <div className='fixed z-10 overflow-x-hidden h-screen w-16 bg-orange-400 transition-all duration-200 ease-linear group hover:w-48 rounded-r-2xl'>
      <div className='flex text-3xl items-center text-white transition-all duration-100 ease-linear px-4 pt-8 mb-6 cursor-pointer'>
        <i className='fab fa-jira'></i>
      </div>
      <div className='flex items-center text-white transition-all duration-100 ease-linear px-6 py-3 mb-6 text-lg cursor-pointer hover:bg-white hover:bg-opacity-10 rounded-r-full'>
        <i className='fa fa-search'></i>
        <span className='ml-6 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-linear'>
          SEARCH ISSUES
        </span>
      </div>
      <div className='flex items-center text-white transition-all duration-100 ease-linear px-6 py-3 mb-6 text-lg cursor-pointer hover:bg-white hover:bg-opacity-10 rounded-r-full'>
        <i className='fa fa-plus'></i>
        <span className='ml-6 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-linear'>
          CREATE ISSUES
        </span>
      </div>
      <div className='absolute bottom-10 left-0 w-full flex items-center text-white transition-all duration-100 ease-linear px-6 py-3 mb-6 text-lg cursor-pointer hover:bg-white hover:bg-opacity-10 rounded-r-full'>
        <i className='fa fa-question-circle'></i>
        <span className='ml-6 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-linear'>
          ABOUT
        </span>
      </div>
    </div>
  )
}

export default SideBar
