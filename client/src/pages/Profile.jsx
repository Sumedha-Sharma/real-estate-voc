import React from 'react'
import { useSelector } from 'react-redux'
export default function Profile() {
  const {currentUser}= useSelector((state)=>state.user)
  return (
    <div className='p-4 max-w-lg mx-auto'>
      <h1 className='text-5xl font-semibold text-teal-800 text-center my-7'>
        Profile
      </h1>
      <form className='flex flex-col gap-6'>
        <img  className=' self-center my-2 rounded-full h-24 w-24 object-cover cursor-pointer' src={currentUser.avatar} alt="Profile" />
        <input  id='username' type="text" placeholder='username' className='border-2 border-teal-700 rounded-lg p-3' />
        <input  id='email' type="text" placeholder='email' className='border-2 border-teal-700 rounded-lg p-3' />
        <input  id='password' type="text" placeholder='password' className='border-2 border-teal-700 rounded-lg p-3' />
        <button className='bg-teal-700 p-3 rounded-lg text-white hover:opacity-90 uppercase disabled:opacity-70'>Update</button>

      </form>
      <div className='mt-5 flex justify-between'>
        <span className='text-red-700 cursor-pointer'>
          Delete account
        </span>
        <span className='text-red-700 cursor-pointer'>
          Sign out
        </span>
      </div>
    </div>
  )
}
