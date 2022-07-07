import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SongForm from '../components/SongForm'

const SongsNew = () => {
  const [song, setSong] = useState({title: '', composer: '', genre: '', tempo: '120', comments: ''})
  const [validationErrors, setValidationErrors] = useState({})
  const navigate = useNavigate()

  const createSong = () => {
    axios.post('http://localhost:8000/api/songs', song)
      .then(res => {
        setValidationErrors({})
        navigate('/songs')
      })
      .catch(err => setValidationErrors(err.response.data.errors))
  }

  return (
    <div className='container mt-2'>
      <div className="d-flex justify-content-between mb-2">
        <h2>Add a new song</h2>
        <div>
          <button className='btn btn-primary' onClick={()=>navigate('/songs')}>Back to Songs</button>
        </div>
      </div>
      <SongForm song={song} setSong={setSong} validationErrors={validationErrors} onSubmitProp={createSong} />
    </div>
  )
}

export default SongsNew