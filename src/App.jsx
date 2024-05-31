import { BrowserRouter, Route, Routes } from 'react-router-dom'

import CreateProject from './page/CreateProject'
import CyberBoard from './page/CyberBoard'
import Home from './page/Home'
import PageNotFound from './page/PageNotFound'
import ProjectManagement from './page/ProjectManagement'
import UserSignIn from './page/UserSignIn'
import CyberBugsTemplate from './template/CyberBugsTemplate'
import UsersSignTemplate from './template/UsersSignTemplate'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route element={<UsersSignTemplate />}>
          <Route path='signin' element={<UserSignIn />} />
          <Route path='signup' element={<h1>Register</h1>} />
        </Route>
        <Route element={<CyberBugsTemplate />}>
          <Route path='cyberbugs' element={<CyberBoard />} />
          <Route path='create-project' element={<CreateProject />} />
          <Route path='project-management' element={<ProjectManagement />} />
          <Route path='project-detail/:projectId' element={<h1>Project Detail</h1>} />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
