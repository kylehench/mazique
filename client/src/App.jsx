import { Routes, Route } from 'react-router-dom'
// import axios from 'axios'

import Songs from "./views/Songs"
import SongsNew from './views/SongsNew'
import SongsEdit from './views/SongsEdit'
import Song from './views/Song'

import ScoreEdit from './views/ScoreEdit'

import './styles/App.css'

function App() {
  
  // const logout = () => {
  //   axios.post('http://localhost:8000/api/logout',
  //   {},
  //   // need to send cookie in request so the server can clear it
  //   {withCredentials: true}) 
  //   .then(res => {
  //     console.log(res)
  //       navigate('/')
  //     })
  //     .catch(err => console.log(err))
  // }

  return (
    <>
      <Routes>
        <Route path="/" element={<Songs />} />
        <Route path="/songs" element={<Songs />} />
        <Route path="/songs/new" element={<SongsNew />} />
        <Route path="/songs/:id/edit" element={<SongsEdit />} />
        <Route path="/songs/:id/" element={<Song />} />

        <Route path="/scores/:id/" element={<ScoreEdit />} />
        {/* <Route path="/users" element={<UserList />} />
        <Route path="/login" element={<LoginForm />} /> */}
      </Routes>
    </>
  )
}

export default App
