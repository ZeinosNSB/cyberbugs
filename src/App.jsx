import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './page/Home'
import PageNotFound from './page/PageNotFound'
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
          <Route index path='cyberbugs' element={<h1>Ronaldo</h1>} />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
