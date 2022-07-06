import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validationErrors, setValidationErrors] = useState({})

  const navigate = useNavigate()
  
  const register = e => {
    e.preventDefault()
    axios.post('http://localhost:8000/api/register',
      {username, email, password, confirmPassword},
      {withCredentials: true}
    )
    .then(res => {
      console.log(res)
      setUsername('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      setValidationErrors({})
      navigate('/users')
    })
    .catch(err => {
      console.log(err)
      setValidationErrors(err.response.data.errors)
      console.log(validationErrors)
    })
  }
  
  return (
    <div className='flex-fill'>
      <h2>Sign Up</h2>
      <form onSubmit={register}>
        <label>Username:</label>
        { validationErrors.username && <div className='text-danger mb-1'>{validationErrors.username.message}</div> }
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control mb-2"/>
        <label>Email:</label>
        { validationErrors.email && <div className='text-danger mb-1'>{validationErrors.email.message}</div> }
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control mb-2"/>
        <label>Password:</label>
        { validationErrors.password && <div className='text-danger mb-1'>{validationErrors.password.message}</div> }
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control mb-2"/>
        <label>Confirm Password:</label>
        { validationErrors.confirmPassword && <div className='text-danger mb-1'>{validationErrors.confirmPassword.message}</div> }
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="form-control mb-2"/>
        <input type="submit" className="btn btn-primary" />
    </form>
  </div>
  )
}

export default SignUp