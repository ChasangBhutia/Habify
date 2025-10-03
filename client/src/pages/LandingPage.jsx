import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen gap-2'>
      <nav>
        <h1 className='text-3xl poppins'>Habify</h1>
      </nav>
      <Link to="/task-manager">
        <button className='bg-blue-400 h-10 px-3 text-white rounded hover:bg-blue-600'>Start Managing Task</button>
      </Link>

      <div className='flex gap-2'>
        <Link to='/login'>
          <button className='bg-blue-400 h-10 px-3 text-white rounded hover:bg-blue-600'>Login</button>
        </Link>
        <Link to='/signup'>
          <button className='bg-blue-400 h-10 px-3 text-white rounded hover:bg-blue-600'>Create Account</button>
        </Link>
      </div>
    </div>
  )
}

export default LandingPage