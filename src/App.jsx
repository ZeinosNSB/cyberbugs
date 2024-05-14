import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginRegister from './page/Login/UserLogin'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/home' element={<h1>Home</h1>} />
        <Route path='/' element={<LoginRegister />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
