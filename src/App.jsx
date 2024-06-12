import { BrowserRouter, Route, Routes } from 'react-router-dom'

import SignIn from './page/Account/SignIn'
import SignUp from './page/Account/SignUp'
import CreateProject from './page/CreateProject'
import CyberBoard from './page/CyberBoard'
import Home from './page/Home'
import PageNotFound from './page/PageNotFound'
import ProjectDetailBoard from './page/ProjectDetailBoard'
import ProjectManagement from './page/ProjectManagement'
import UserManagement from './page/UserManagement'
import AccountTemplate from './template/AccountTemplate'
import CyberBugsTemplate from './template/CyberBugsTemplate'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route element={<AccountTemplate />}>
          <Route path='signin' element={<SignIn />} />
          <Route path='signup' element={<SignUp />} />
        </Route>
        <Route element={<CyberBugsTemplate />}>
          <Route path='cyberbugs' element={<CyberBoard />} />
          <Route path='cyberbugs/:projectID' element={<ProjectDetailBoard />} />
          <Route path='create-project' element={<CreateProject />} />
          <Route path='project-management' element={<ProjectManagement />} />
          <Route path='user-management' element={<UserManagement />} />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
