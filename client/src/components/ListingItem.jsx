import { MdLocationOn } from 'react-icons/md';
import React from 'react'
import { Link } from 'react-router-dom'

export default function ListingItem({listing}) {
    console.log(listing.imageUrls[0])
  return (

    
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden w-full sm:w-[270px]'>
        <Link to={`/listing/${listing._id}`}> 
            <img  className='h-[320px] sm:h-[220px] w-full object-cover transition-scale duration-300 border-2 hover:scale-105'
             src={listing.imageUrls[0]||'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'} alt="listing cover"  />
            <div className="p-3 flex flex-col gap-2 w-full mt-4">
                <p className='  capitalize text-lg font-semibold text-teal-800 truncate'>{listing.name}</p>
            
            <div className='flex items-center gap-2'>
                <MdLocationOn className='h-4 w-4 text-teal-700'/>
                <p className='  capitalize w-full text-grey-600 text-sm truncate'>{listing.address}</p>
            </div>
                <p className='text-sm text-grey-600 line-clamp-2'>
                    {listing.description}
                </p>
                <p className='text-teal-600  flex items-center mt-2 font-semibold'>
                    {listing.offer?listing.discountPrice.toLocaleString('hi-IN',{style:"currency", currency:"INR"}).replace(/\.?0+$/, ''): listing.regularPrice.toLocaleString('hi-IN',{style:"currency", currency:"INR"}).replace(/\.?0+$/, '')}
                    {listing.type==='rent'&&' / month'}
                </p>
                <div className='text-teal-800 flex items-center gap-4'>
                    <div className='font-bold text-xs'>
                        {listing.bedrooms>1? `${listing.bedrooms} beds` :`${listing.bedrooms} bed`}
                    </div>
                    <div className='font-bold text-xs'>
                        {listing.bathrooms>1? `${listing.bathrooms} baths` :`${listing.bathrooms} bath`}
                    </div>
           
                </div>
            </div> 

        </Link></div>
  )
}
