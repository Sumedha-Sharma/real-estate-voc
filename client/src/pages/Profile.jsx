import React, { useState,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useRef} from 'react'
import {getDownloadURL, getStorage,ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase';
import { updateUserStart,updateUserSuccess,updateUserFaliure } from '../redux/user/userSlice';

export default function Profile() {
  const {currentUser,loading,error}= useSelector((state)=>state.user);
  const fileRef= useRef(null);
  const[file,setFile]=useState(undefined);
  const[filePerc,setFilePerc]=useState(0);
  const[fileUploadError,setFileUploadError]=useState(false);
  const[formData,setFormData]=useState({});
  const[updateSucess,setUpdateSuccess]=useState(false);
  const dispatch= useDispatch();


  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  },[file]);
  const handleFileUpload=(file)=>{
    const storage=getStorage(app);
    const  fileName=new Date().getTime()+file.name;
    const storageRef= ref(storage,fileName);
    const uploadTask= uploadBytesResumable(storageRef,file);
    uploadTask.on('state_changed',
    (snapshot)=>{
      const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
      setFilePerc(Math.round(progress));
      console.log('Upload is'+progress+'%done');
    },
    (error)=>{
      setFileUploadError(true);
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then(
        (downloadURl)=>{
          setFormData({...formData,avatar:downloadURl});
        })
    }

    )

  }

  const handleChange=(e)=>{
    setFormData({...FormData,[e.target.id]:e.target.value})
  }
  const handleSubmit= async(e)=>{
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res=await fetch(`/api/user/update/${currentUser._id}`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',

        },
        body:JSON.stringify(formData),

      });
      const data= await res.json();
      if(data.success==false){
        dispatch(updateUserFaliure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFaliure(error.message));
    }
  }
  return (
    <div className='p-4 max-w-lg mx-auto'>
      <h1 className='text-5xl font-semibold text-teal-800 text-center my-7'>
        Profile
      </h1>
      {error?(<p className='p-3 text-center rounded-lg bg-red-500 text-white self-center my-4'>
        {error}
        </p>):''}

        {updateSucess?(<p className='p-3 text-center rounded-lg bg-green-500 text-white self-center my-4'>
        Information Updated Successfully!!
        </p>):''}
      
      
      <form  onSubmit={handleSubmit} className='flex flex-col gap-6'>
        <input onChange={(e)=>{setFile(e.target.files[0])}} hidden accept='image/*' type="file" ref={fileRef} />
        <img onClick={()=>fileRef.current.click()} className=' self-center my-2 rounded-full h-24 w-24 object-cover cursor-pointer' src={formData?.avatar||currentUser.avatar} alt="Profile" />
        <p className='text-sm self-center capitalize my-3 rounded-lg'>
          {fileUploadError?
            (<span className='p-3 my-3 rounded-lg bg-red-400 text-white'>Error Uploading Image(Ensure image is less than 2mb)</span>):
          filePerc>0 &&filePerc<100?
           ( <span className='p-3 my-3 rounded-lg bg-blue-400 text-white'>Image Uploading {filePerc}%</span>):
           filePerc===100?
           ( <span className='p-3 my-3 rounded-lg bg-green-400 text-white'>Image Uploaded SuccessFuly!!</span>):(
            ``)
          }
        </p>
        <input onChange={handleChange}  id='username' type="text"  defaultValue={currentUser.username} placeholder='username' className='border-2 border-teal-700 rounded-lg p-3' />
        <input onChange={handleChange}    id='email' type="text"  defaultValue={currentUser.email} placeholder='email' className='border-2 border-teal-700 rounded-lg p-3' />
        <input  id='password' type="password" placeholder='password' className='border-2 border-teal-700 rounded-lg p-3' />
        <button  disabled={loading}className='bg-teal-700 p-3 rounded-lg text-white hover:opacity-90 uppercase disabled:opacity-70'>
          {loading?'Loading...':'Update'}
        </button>

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
