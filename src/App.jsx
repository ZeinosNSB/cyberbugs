import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UsersSignTemplate from './template/UsersSignTemplate'
import UserSignIn from './page/UserSignIn'
import PageNotFound from './page/PageNotFound'
import Home from './page/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route element={<UsersSignTemplate />}>
          <Route path='signin' element={<UserSignIn />} />
          <Route path='signup' element={<h1>Register</h1>} />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
