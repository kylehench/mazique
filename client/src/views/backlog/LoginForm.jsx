import React from 'react'

const LoginForm = () => {
  return (
    <div>
      <h2>Login Form</h2>
      <form className='form'>
        <label>Label:</label>
        <input type="text" name="" id="" className='form-control' />
        <input type="submit" value="Register" className='mt-2 btn btn-primary' />
      </form>
    </div>
  )
}

export default LoginForm