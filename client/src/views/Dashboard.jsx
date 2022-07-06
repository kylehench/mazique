import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  
  return (
    <div className='container mt-2'>
      <h2>Home</h2>
      <Link to="/songs">Songs I want to learn</Link>
    </div>
  )
}

export default Dashboard