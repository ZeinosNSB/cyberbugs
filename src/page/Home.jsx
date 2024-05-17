import { useSelector } from 'react-redux'

function Home() {
  const userLogin = useSelector(state => state.users.userSignIn)
  console.log(userLogin)
  return <div></div>
}

export default Home
