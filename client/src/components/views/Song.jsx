import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Song = () => {
  const [song, setSong] = useState({})
  const { id } = useParams()
  const navigate = useNavigate()
  
  useEffect(() => {
    axios.get(`http://localhost:8000/api/songs/${id}`)
    .then(res => setSong(res.data))
    .catch(err => console.log(err))
  }, [])

  return (
    <div className='container mt-4'>
      {song.title !== undefined && <>
        <div className="d-flex justify-content-between">
          <h2>Song: {song.title}</h2>
          <div>
            <button className='btn btn-primary' onClick={()=>navigate('/songs')}>Back to Songs</button>
          </div>
        </div>
        <table className="card p-4">
          <tbody>
            <tr>
              <td className='pb-3 pe-3' valign='top'><b>Title:</b></td>
              <td className='pb-3'>{song.title}</td>
            </tr>
            <tr>
              <td className='pb-3 pe-3' valign='top'><b>Composer:</b></td>
              <td className='pb-3'>{song.composer}</td>
            </tr>
            <tr>
              <td className='pb-3 pe-3' valign='top'><b>Genre:</b></td>
              <td className='pb-3'>{song.genre}</td>
            </tr>
            <tr>
              <td className='pb-3 pe-3' valign='top'><b>Tempo:</b></td>
              <td className='pb-3'>{song.tempo}</td>
            </tr>
            <tr>
              <td className='pb-3 pe-3' valign='top'><b>Comments:</b></td>
              <td className='pb-3'>{song.comments}</td>
            </tr>
          </tbody>
        </table>
      </> }
    </div>
  )
}

export default Song