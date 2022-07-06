import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import LogReg from "./views/LogReg"
import UserList from './views/UserList'
import LoginForm from './views/LoginForm'


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
    <div className='container mt-2'>
      <div className="d-flex justify-content-between">
        <h2>MERN Users</h2>
        <button onClick={logout} className='btn btn-secondary'>Logout</button>
      </div>
      <Routes>
        <Route path="/" element={<LogReg />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
      <div className='mt-2'>
        <Link to='/users'>Get Users List</Link>
      </div>
    </div>
  );
}

export default App;
