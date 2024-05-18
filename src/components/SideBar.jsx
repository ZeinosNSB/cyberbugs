import '../styles/css/SideBarStyle.css'

function SideBar() {
  return (
    <div className='sideBar'>
      <div className='sideBar-top'>
        <div className='sideBar-icon'>
          <i className='fab fa-jira'></i>
        </div>
        <div className='sideBar-icon' data-toggle='modal' data-target='#searchModal'>
          <i className='fa fa-search'></i>
          <span className='title'>SEARCH ISSUES</span>
        </div>
        <div className='sideBar-icon'>
          <i className='fa fa-plus'></i>
          <span className='title'>CREATE ISSUES</span>
        </div>
      </div>
      <div className='sideBar-bottom'>
        <div className='sideBar-icon'>
          <i className='fa fa-question-circle'></i>
          <span className='title'>ABOUT</span>
        </div>
      </div>
    </div>
  )
}

export default SideBar
