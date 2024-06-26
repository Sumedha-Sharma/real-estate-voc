import React, { useState,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useRef} from 'react'
import {getDownloadURL, getStorage,ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase';
import { updateUserStart,updateUserSuccess,updateUserFaliure, deleteUserFaliure, deleteUserStart, deleteUserSuccess, signOutUserStart, signOutUserFaliure, signOutUserSuccess } from '../redux/user/userSlice';
import {Link} from 'react-router-dom'
export default function Profile() {
  const {currentUser,loading,error}= useSelector((state)=>state.user);
  const fileRef= useRef(null);
  const[file,setFile]=useState(undefined);
  const[filePerc,setFilePerc]=useState(0);
  const[fileUploadError,setFileUploadError]=useState(false);
  const[formData,setFormData]=useState({});
  const[updateSucess,setUpdateSuccess]=useState(false);
  const[showListingsError,setShowListingsError]=useState(false);
  const[userListings,setUserListings]=useState([])
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

  const handleDeleteUser= async()=>{
    try {
      dispatch(deleteUserStart());
      const res= await fetch(`/api/user/delete/${currentUser._id}`,{
        method:'DELETE',
      });
      const data= await res.json();
      if(data.success===false){
        dispatch(deleteUserFaliure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFaliure(error.message))
    }
  }
  const handleSignOut = async()=>{
    try {
      dispatch(signOutUserStart());
      const res= await fetch('api/auth/signout');
      const data= await res.json();
      if(data.success===false){
        dispatch(signOutUserFaliure(data.message))
        return;
      }
      dispatch(signOutUserSuccess(data));

    } catch (error) {
      dispatch(signOutUserFaliure(error.message))
      
    }
  }
  const handleShowListings= async()=>{
    try {
      setShowListingsError(false);
      const res= await fetch(`/api/User/listings/${currentUser._id}`);
      const data= await res.json();
      if(data.success==false){
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  }
  
  const handleListingDelete= async (listingId)=>{
    try {
      const res= await fetch(`/api/listing/delete/${listingId}`,{
        method: 'DELETE',
      });
      const data= await res.json();
      if(data.success===false){
        console.log(data.message);
        return;
      }
      setUserListings((prev)=>prev.filter((listing)=>listing._id !==listingId));

    } catch (error) {
      console.log(error.message)
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
        <Link  className=' rounded-lg p-3 text-center text-white bg-teal-900 uppercase my-2 hover:opacity-90' to={"/create-listing"}>  create listing</Link>

      </form>
      <div className='mt-5 flex justify-between'>
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>
          Delete account
        </span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>
          Sign out
        </span>
      </div>
      <button onClick={handleShowListings} className=' my-4  p-3 hover:bg-teal-600 hover:text-white  w-full text-center capitalize text-teal-600 border-2 border-teal-600 rounded-lg'>Show Listings</button>
      {showListingsError&&(<p className='p-3 text-center rounded-lg bg-red-500 text-white self-center my-4'>
      {showListingsError ? 'Error showing listings' : ''}
        </p>)}
        {
          
          userListings && userListings.length>0&&
          <div className='flex  flex-col gap-4'>
            <h1 className='text-center mt-7 text-2xl text-teal-900 font-semibold'>
              Your Listings
            </h1>
            { userListings.map((listing)=>(
            
            <div key={listing._id} className="flex gap-4 items-center justify-between border rounded-lg shadow-sm p-6">
                <Link to={`/listing/${listing._id}`}>
                  <img  className="h-16 w-16 object-contain "src={listing.imageUrls[0]} alt=" listing cover" />
                </Link>

                <Link className=' truncate text-teal-900 capitalize font-semibold flex-1 text-lg hover:text-teal-600 ' to={`/listing/${listing._id}`}>
                 <p  >
                  {listing.name}
                 </p>
                </Link>
                <div className="flex flex-col gap-1 items-center">
                    <button onClick={()=>handleListingDelete(listing._id)} className= ' uppercase text-red-900'>
                        Delete
                    </button>
                    <Link  className=' flex justify-center'to={`/update-listing/${listing._id}`}>
                    <button className=' uppercase text-teal-600'>
                        edit
                    </button>
                    </Link>
                   
                </div>

            </div>
           )) }
          </div>
          
          
        }


    </div>
  )
}
