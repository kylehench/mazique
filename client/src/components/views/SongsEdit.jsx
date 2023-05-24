import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SongForm from '../components/SongForm'

const SongsEdit = () => {
  const [song, setSong] = useState({title: '', composer: '', genre: '', tempo: '', comments: ''})
  const [validationErrors, setValidationErrors] = useState({})
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_SERVER_URI}/api/songs/${id}`)
      .then(res => setSong({...song, ...res.data}))
      .catch(err => console.log(err))
  },[])

  const updateSong = () => {
    axios.put(`${import.meta.env.VITE_SERVER_URI}/api/songs/${id}`, song)
      .then(res => {
        setValidationErrors({})
        navigate('/songs')
      })
      .catch(err => setValidationErrors(err.response.data.errors))
  }

  return (
    <div className='container mt-4'>
      <div className="d-flex justify-content-between mb-2">
        <h2>Add a new song</h2>
        <div>
          <button className='btn btn-primary' onClick={()=>navigate('/songs')}>Back to Songs</button>
        </div>
      </div>
      {song._id !== undefined &&
        <SongForm song={song} setSong={setSong} validationErrors={validationErrors} onSubmitProp={updateSong} submitText="Edit Song" />
      }
    </div>
  )
}

export default SongsEdit