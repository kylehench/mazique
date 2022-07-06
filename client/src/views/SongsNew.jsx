import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SongForm from '../components/SongForm'

const SongsNew = () => {
  const [song, setSong] = useState({name: '', type: '', description: ''})
  const [validationErrors, setValidationErrors] = useState({})
  const navigate = useNavigate()

  return (
    <div className='container mt-2'>
      <div className="d-flex justify-content-between mb-2">
        <h2>Add a new song</h2>
        <button className='btn btn-primary' onClick={()=>navigate('/songs')}>Back to Songs</button>
      </div>
      <SongForm song={song} setSong={setSong} validationErrors={validationErrors} />
    </div>
  )
}

export default SongsNew