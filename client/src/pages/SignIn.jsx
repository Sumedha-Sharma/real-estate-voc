import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signInSuccess,signInStart,signInFaliure } from '../redux/user/userSlice';
export default function SignIn() {
  const[formData,setFormData]=useState({});
 const{loading,error}=useSelector((state)=>state.user);
  const dispatch=useDispatch();
  const navigate=useNavigate();
const handleChange=(e)=>{
  setFormData({
    ...formData,
    [e.target.id]:e.target.value,

  })

};

const handleSubmit= async(e)=>{
  e.preventDefault();
  try {
    dispatch(signInStart());
    const res=await fetch('/api/auth/signin',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),
    });
    const data= await res.json();
    if(data.success===false){
      dispatch
   dispatch(signInFaliure(data.message));
    
      return;
    }
    dispatch(signInSuccess(data));
    navigate('/');
  } catch (error) {
    dispatch(signInFaliure(error.message));
  }
 
  


};



  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-4xl text-center font-semibold my-7 text-teal-800'>
        Sign In
      </h1>
     {error && <p className='rounded-md text-red-500  bg-red-300 my-3 p-2'>{error}</p>}
      <form onSubmit={handleSubmit} className='flex flex-col gap-8 mt-10'>
     
        <input type="email" id='email' placeholder='email' className=' border-2 border-teal-700 p-3 rounded-lg'onChange={handleChange}/>
        <input type="password" id='password' placeholder='password' className=' border-2 border-teal-700 p-3 rounded-lg'onChange={handleChange} />
        <button  disabled={loading} className='bg-teal-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-70'>
          {loading?'Loading...':'Sign In'}
        </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p> Missing an account?</p>
        <Link to='/sign-up'>
          <span className='text-blue-900'>Sign Up</span>
        </Link>
      </div>
      
      
    </div>
  )
}
