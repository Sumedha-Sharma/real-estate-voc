import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Contact({listing}) {
    const[landlord,setLandlord]= useState(null);
    const[message,setMessage]=useState('')
    useEffect(()=>{
        const fetchLandlord= async ()=>{
            try {
                const res = await fetch(`/api/user/${listing.userRef}`);
                const data= await res.json();
                setLandlord(data);

            } catch (error) {
                console.log(error);

            }
        }
        fetchLandlord();

    },[listing.userRef]);
    const onChange=(e)=>{
        setMessage(e.target.value);
    }
  return (
   <>
   {landlord && (
    <div className="flex flex-col gap-6">
        <p>
            Contact <span className='font-semibold text-teal-600 '>{landlord.username}</span> for
              <span className='font-semibold'>
              {''}  { listing.name.toLowerCase()}
            </span>
        </p>
        <textarea className='w-full p-3 border-2 border-teal-600 rounded-lg ' onChange={onChange}   name="message" id="message" cols="30" rows="2" value={message} placeholder='Enter Your mesasage here......'></textarea>

        <Link
          to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
          className='bg-teal-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-90'
          >
            Send Message          
          </Link>
    </div>
   )}
   
   </>
  )
}
