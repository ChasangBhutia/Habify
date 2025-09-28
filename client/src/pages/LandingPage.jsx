import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
        <Link to="/habit-tracker">
            <button className='bg-blue-400 h-10 px-3 text-white rounded hover:bg-blue-600'>Start Tracking Habit</button>
        </Link>
        <Link to='/login'>
          <button className='bg-blue-400 h-10 px-3 text-white rounded hover:bg-blue-600'>Login</button>
        </Link>
    </div>
  )
}

export default LandingPage