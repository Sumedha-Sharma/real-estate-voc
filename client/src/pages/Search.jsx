import React from 'react'

export default function Search() {
  return (
    <div className='flex gap-4 flex-col md:flex-row'>
        <div className="flex gap-4 p-7 border-b-2 md:border-r-2 md:min-h-screen">
            <form className='flex flex-col gap-8'>
                <div className="flex items-center gap-4">
                    <label  className=' bg-teal-600 text-white p-2 rounded-md whitespace-nowrap'> Search Term : </label>
                    <input className='border-2 border-teal-700 rounded-lg p-3 w-full' type="text"  id="searchTerm"  placeholder='Search...'/>
                </div>
                <div className="flex gap-4 flex-wrap items-center">
                    <label className=' bg-teal-600 text-white p-2 rounded-md '> Type :</label>
                    <div className="flex gap-2">
                        <input className='  accent-teal-600 w-5' type="checkbox"  id="all" />
                        <span>Rent & Sale </span>
                    </div>

                    <div className="flex gap-2">
                        <input className='  accent-teal-600 w-5' type="checkbox"  id="rent" />
                        <span> Rent </span>
                    </div>

                    <div className="flex gap-2">
                        <input className='  accent-teal-600 w-5' type="checkbox"  id="sale" />
                        <span>Sale</span>
                    </div>

                    
                    <div className="flex gap-2">
                        <input className='  accent-teal-600 w-5' type="checkbox"  id="offer" />
                        <span>Offer</span>
                    </div>
                    

                   
                </div>

                <div className="flex gap-4 flex-wrap items-center">
                    <label className=' bg-teal-600 text-white p-2 rounded-md '> Ameneties :</label>
                  

                    <div className="flex gap-2">
                        <input className=' accent-teal-600 w-5' type="checkbox"  id="parking" />
                        <span> Parking </span>
                    </div>

                    <div className="flex gap-2">
                        <input className='  accent-teal-600 w-5' type="checkbox"  id="furnished" />
                        <span>Furnished</span>
                    </div>

                    
                  
                    

                   
                </div>
                <div className="flex gap-4  items-center">
                    <label className=' bg-teal-600 text-white p-2 rounded-md '> Sort :</label>
                    <select  id="sort_order" className='p-3 border-2 border-teal-700 rounded-lg'>
                        <option className='capitalize '>
                            Price High to low
                        </option>
                        <option className='capitalize'>
                            Price Low to high
                        </option>
                        <option className='capitalize'>
                            Latest
                        </option>
                        <option className='capitalize'>
                            Oldest
                        </option>
                    </select>
                </div>
                <button className='p-3 bg-teal-700 rounded-lg  text-white uppercase hover:opacity-90'> Search</button>
            </form>
        </div>
        <div className="">
           <h1 className='mt-5 p-3 text-4xl font-semibold border-b-2  text-teal-900'> Listing Results</h1>
        </div>
    </div>
  )
}
