import React, { useEffect, useState } from 'react'
import {FaSearch} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const navigate= useNavigate();
  const{currentUser}=useSelector(state=>state.user);
  const[searchTerm,setSearchTerm]=useState('');
  
const handleSubmit=(e)=>{
  e.preventDefault();
  const urlParams= new URLSearchParams(window.location.search);
  urlParams.set('searchTerm',searchTerm);
  const searchQuery=urlParams.toString();
  navigate(`/search?${searchQuery}`);

}
useEffect(()=>{
  const urlParams= new URLSearchParams(window.location.search);
  const searchTermFromUrl= urlParams.get('searchTerm');
  if(searchTermFromUrl){
    setSearchTerm(searchTermFromUrl)
  }
  
},[location.search])

  return (
    <header className='shadow-md bg-white' >
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
      <form  onSubmit={handleSubmit} className='border-2 border-teal-700 p-3 rounded-lg  flex items-center '>
        <input  value={searchTerm}  onChange={(e)=>setSearchTerm(e.target.value)} type="text" placeholder='Search...'  className='bg-transparent focus:outline-none w-24 sm:w-64' />
        <button>
        <FaSearch className='text-teal-700'/>
        </button>
        
      </form>
      <ul className='flex gap-5 text-sm sm:text-xl'>
      <Link to='/'>
        <li  className='hidden sm:inline text-teal-700 hover:text-teal-900 hover:font-semibold' >Home</li>
       </Link>
       <Link to='/about'>
        <li className='hidden sm:inline text-teal-700 hover:text-teal-900 hover:font-semibold'> About</li>
        </Link>
        <Link to='/profile'>
        {currentUser?
        (<img  className='rounded-full h-7 w-7 object-cover'  src={currentUser.avatar} alt='profile'/>)
        :
        (<li className=' sm:inline text-teal-700 hover:text-teal-900 hover:font-semibold'> Sign In</li>)}
        
        
        </Link>
      </ul>
      </div>
    </header>
  )
}
