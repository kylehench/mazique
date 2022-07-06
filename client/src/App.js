import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import Songs from "./views/Songs"
import Dashboard from './views/Dashboard'
import SongsNew from './views/SongsNew'
// import UserList from './views/UserList'
// import LoginForm from './views/LoginForm'


function App() {
  const navigate = useNavigate()
  
  const logout = () => {
    axios.post('http://localhost:8000/api/logout',
    {},
    // need to send cookie in request so the server can clear it
    {withCredentials: true}) 
    .then(res => {
      console.log(res)
        navigate('/')
      })
      .catch(err => console.log(err))
  }
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/songs" element={<Songs />} />
        <Route path="/songs/new" element={<SongsNew />} />
        {/* <Route path="/users" element={<UserList />} />
        <Route path="/login" element={<LoginForm />} /> */}
      </Routes>
    </div>
  );
}

export default App;