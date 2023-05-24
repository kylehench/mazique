import React from 'react'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'

const LogReg = () => {
  
  
  return (
    <div className='d-flex justify-content-between mt-2'>
      <SignIn />
      <div className='mx-2'></div>
      <SignUp />
    </div>
  )
}

export default LogReg