import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Songs = () => {
  const navigate = useNavigate()
  const [songs, setSongs] = useState([])

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_SERVER_URI}/api/songs`)
      .then(res => setSongs(res.data))
      .catch(err => console.log(err))
    },[])
    
  const deleteSong = (_id) => {
    axios.delete(`${import.meta.env.VITE_SERVER_URI}/api/songs/${_id}`)
      .then(res => setSongs(songs.filter(song => song._id!==_id)))
      .catch(err => console.log(err))
  }
  
  return (
    <div className='container mt-4'>
      <div className="d-flex justify-content-between">
        <h2>Songs</h2>
        <div>
          {/* <button className='btn btn-secondary' onClick={() => navigate('/')}>Home</button> */}
        </div>
      </div>
      <table className="table">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Composer</th>
            <th>Genre</th>
            <th>Actions</th>
          </tr>
          {songs.map(song => <tr key={song._id}>
            <td>{song.title}</td>
            <td>{song.composer}</td>
            <td>{song.genre}</td>
            <td className="d-flex">
              <Link className='btn btn-sm btn-secondary me-2' to={`/songs/${song._id}`}>View Details</Link>
              <Link className='btn btn-sm btn-secondary me-2' to={`/songs/${song._id}/edit`}>Edit Details</Link>
              <Link className='btn btn-sm btn-success' to={`/scores/${song.score_id}`}>Edit Score</Link>
              <div className="vr mx-4"></div>
              <button className='btn btn-sm btn-danger' onClick={() => deleteSong(song._id)}>Delete</button>
            </td>
          </tr>)}
        </tbody>
      </table>
      <button className='btn btn-primary' onClick={() => navigate('/songs/new')}>Add Song</button>
    </div>
  )
}

export default Songs