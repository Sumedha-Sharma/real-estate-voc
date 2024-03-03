import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth';

export default function SignUp() {
  const[formData,setFormData]=useState({});
  const[error,setError]=useState(null);
  const[loading,setLoading]=useState(false);
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
    setLoading(true);
    const res=await fetch('/api/auth/signup',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),
    });
    const data= await res.json();
    if(data.success===false){
      setError(data.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    setError(null);
    navigate('/sign-in');
  } catch (error) {
    setError(error.message);
    setLoading(false);
  }
 
  console.log(data);


};



  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-4xl text-center font-semibold my-7 text-teal-800'>
        Sign Up
      </h1>
     {error && <p className='rounded-md text-red-500  bg-red-300 my-3 p-2'>{error}</p>}
      <form onSubmit={handleSubmit} className='flex flex-col gap-8 mt-10'>
        <input type="text" id='username' placeholder='username' className=' border-2 border-teal-700 p-3 rounded-lg'onChange={handleChange} />
        <input type="email" id='email' placeholder='email' className=' border-2 border-teal-700 p-3 rounded-lg'onChange={handleChange}/>
        <input type="password" id='password' placeholder='password' className=' border-2 border-teal-700 p-3 rounded-lg'onChange={handleChange} />
        <button  disabled={loading} className='bg-teal-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-70'>
          {loading?'Loading...':'Sign Up'}
        </button>
        <OAuth/>
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
