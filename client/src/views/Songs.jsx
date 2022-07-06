import React from 'react'
import { useNavigate } from 'react-router-dom'

const Songs = () => {
  const navigate = useNavigate()
  
  return (
    <div className='container mt-2'>
      <div className="d-flex justify-content-between">
        <h2>Songs I Want to Learn</h2>
        <button className='btn btn-primary' onClick={() => navigate('/songs/new')}>Add Song</button>
      </div>
      <table className="table">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Songs