import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const login = e => {
    e.preventDefault()
    axios.post('http://localhost:8000/api/login',
      {email, password},
      {withCredentials: true}
    )
    .then(res => {
      console.log(res)
      navigate('/users')
    })
    .catch(err => {
      console.log(err)
      setErrorMessage('Incorrect username or password')
    })
  }
  
  return (
    <div className='flex-fill'>
      <h2>Sign In</h2>
      <form onSubmit={login}>
        { errorMessage && <div className='text-danger mb-1'>{errorMessage}</div>}
        <label>Email:</label>
        <input type="text" onChange={(e) => setEmail(e.target.value)} className="form-control input-lg textbox mb-2"/>
        <label>Password:</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control mb-2"/>
        <input type="submit" className="btn btn-primary" />
      </form>
    </div>
  )
}

export default SignIn