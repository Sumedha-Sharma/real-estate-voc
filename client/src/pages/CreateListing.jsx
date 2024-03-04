import React from 'react'

export default function CreateListing() {
  return (
    <main className='p-3 max-w-4xl mx-auto  '> 
        <h1 className='text-4xl font-semibold text-teal-800 text-center my-7'>
            Create Listing
        </h1>
        <form className='flex flex-col sm:flex-row gap-6'>
            <div className='flex flex-col gap-5 flex-1'>
                <input type="text" placeholder='Name'  className='border-2 border-teal-700 rounded-lg p-3'id="name" maxLength={62} minLength={10} required  />
                <textarea type="text" placeholder='Description'  className='border-2 border-teal-700 rounded-lg p-3'id="description"  required  />
                <input type="text" placeholder='Address'  className='border-2 border-teal-700 rounded-lg p-3'id="address" maxLength={62} minLength={10} required  />
                <div className='flex gap-6 flex-wrap'>
                    <div className=' flex gap-2 items-center '>
                        <input  className='w-5 h-5 bg-teal-100 text-teal-700  rounded focus:ring-2 focus:ring-teal-700 outline-none  border-2  border-teal-700' type="checkbox"  id="sale" />
                        <span className='text-teal-900'>Sell</span>
                    </div>
                    <div className=' flex gap-2 items-center'>
                        <input  className='w-5 h-5 bg-teal-100 text-teal-700  rounded focus:ring-2 focus:ring-teal-700 outline-none  border-2  border-teal-700' type="checkbox"  id="rent" />
                        <span className='text-teal-900'>Rent</span>
                    </div>
                    <div className=' flex gap-2 items-center '>
                        <input  className='w-5 h-5 bg-teal-100 text-teal-700  rounded focus:ring-2 focus:ring-teal-700 outline-none  border-2  border-teal-700' type="checkbox"  id="parking" />
                        <span className='text-teal-900'>Parking Spot</span>
                    </div>
                    <div className=' flex gap-2  items-center'>
                        <input  className='w-5 h-5 bg-teal-100 text-teal-700  rounded focus:ring-2 focus:ring-teal-700 outline-none  border-2  border-teal-700' type="checkbox"  id="furnished" />
                        <span className='text-teal-900'>Furnished</span>
                    </div>
                    <div className=' flex gap-2  items-center'>
                        <input  className='w-5 h-5 bg-teal-100 text-teal-700  rounded focus:ring-2 focus:ring-teal-700 outline-none  border-2  border-teal-700' type="checkbox"  id="offer" />
                        <span className='text-teal-900'>Offer</span>
                    </div>
                </div>
                <div className='flex flex-wrap gap-6'>
                    <div className=' flex gap-3 items-center'>
                        <input className='border-2 border-teal-700 rounded-lg p-3 focus:border-teal-100 focus:border-2' type="number"  id="bedrooms" min={1} max={10} required />
                        <p className='text-teal-900'> Beds</p>
                    </div>
                    <div className=' flex gap-3 items-center'>
                        <input className='border-2 border-teal-700 rounded-lg p-3 focus:border-teal-100 focus:border-2' type="number"  id="bathrooms" min={1} max={10} required />
                        <p className='text-teal-900'> Baths</p>
                    </div>
                    <div className=' flex gap-3 items-center '>
                        <input className='border-2 border-teal-700 rounded-lg p-3 pl-5 pr-5 focus:border-teal-100 focus:border-2' type="number"  id="regularPrice" min={1} max={20000} required />
                        <div className='flex flex-col items-center'>
                            <p className='text-teal-900'> Regular Price</p>
                            <span className='text-xs'>(₹/month)</span>
                        </div>
                        
                    </div>
                    <div className=' flex gap-3 items-center'>
                        <input className='border-2 border-teal-700 rounded-lg p-3 pl-5 pr-5 focus:border-teal-100 focus:border-2' type="number"  id="discountPrice" min={1} max={20000} required />
                        <div className='flex flex-col items-center'>
                            <p className='text-teal-900'> Discounted Price</p>
                            <span className='text-xs'>(₹/month)</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-5 flex-1'>
                <p className='text-teal-900 font-semibold'>
                    Images:
                    <span className='font-normal text-teal-700 ml-2'>
                    The first image will be the cover(max 6)
                </span>
                </p>
               
                <div className='flex gap-4'>
                    <input className='p-4 border-2 w-full rounded border-teal-600' type="file"  id="images" accept='image/*' multiple />
                    <button className='p-3 border-2 rounded-lg border-teal-500 uppercase text-teal-700 hover:shadow-lg hover:bg-teal-500 hover:text-white disabled:opacity-90 '>Upload</button>
                </div>
                <button className='bg-teal-900 p-3  uppercase rounded-lg text-white hover:opacity-90 disabled:opacity-60'>Create Listing </button>
            </div>
           
        </form>
    </main>
  )
}
