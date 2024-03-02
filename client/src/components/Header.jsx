import React from 'react'
import {FaSearch} from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className='shadow-md' >
      <div className='flex justify-between items-center max-w-6xl mx-auto p-4'>
      <Link to='/'>
      <h1 className='font-semibold text-sm sm:text-4xl flex flex-wrap'>
        <span className='text-teal-500'>
          Nex
        </span>
        <span className='text-teal-700'>
          Vita
        </span>
      </h1>
      </Link>
      <form className='border-2 border-teal-700 p-3 rounded-lg  flex items-center '>
        <input type="text" placeholder='Search...'  className='bg-transparent focus:outline-none w-24 sm:w-64' />
        <FaSearch className='text-teal-700'/>
      </form>
      <ul className='flex gap-5 text-sm sm:text-xl'>
      <Link to='/'>
        <li  className='hidden sm:inline text-teal-700 hover:text-teal-900 hover:font-semibold' >Home</li>
       </Link>
       <Link to='/about'>
        <li className='hidden sm:inline text-teal-700 hover:text-teal-900 hover:font-semibold'> About</li>
        </Link>
        <Link to='/sign-in'>
        <li className=' sm:inline text-teal-700 hover:text-teal-900 hover:font-semibold'> Sign In</li>
        </Link>
      </ul>
      </div>
    </header>
  )
}
