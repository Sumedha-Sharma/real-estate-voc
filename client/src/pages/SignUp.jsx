import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-4xl text-center font-semibold my-7 text-teal-800'>
        Sign Up
      </h1>
      <form className='flex flex-col gap-8 mt-10'>
        <input type="text" id='username' placeholder='username' className=' border-2 border-teal-700 p-3 rounded-lg' />
        <input type="email" id='email' placeholder='email' className=' border-2 border-teal-700 p-3 rounded-lg' />
        <input type="password" id='password' placeholder='password' className=' border-2 border-teal-700 p-3 rounded-lg' />
        <button className='bg-teal-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-70'>Sign Up</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p> Have an account?</p>
        <Link to='/sign-in'>
          <span className='text-blue-900'>Sign In</span>
        </Link>
      </div>
      
    </div>
  )
}
