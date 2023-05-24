import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const UserList = () => {
  const [users, setUsers] = useState([])
  const navigate = useNavigate()

  const getLoggedInUser = () => {
    axios.get('http://localhost:8000/api/users',
      {withCredentials: true})
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  useEffect(() => {
    axios.get('http://localhost:8000/api/users',
      {withCredentials: true})
    .then(res => {
      setUsers(res.data)
      console.log(res)
    })
    .catch(err => {
      console.log('not authorized')
      console.log(err)
      navigate('/')
    })
  },[])
  
  return (
    <div className='container'>
      <table>
        <tbody>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Created On</th>
          </tr>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList