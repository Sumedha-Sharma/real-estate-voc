import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


export default function Search() {
    const[sidebardata,setSidebardata]= useState({
        searchTerm:'',
        type:'all',
        parking:false,
        furnished:false,
        offer:false,
        sort:'created_at',
        order:'desc',


    });

   
    const navigate=useNavigate();
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    const [showMore, setShowMore] = useState(false);

    useEffect(()=>{
        const urlParams= new URLSearchParams(location.search);
        const searchTermFromUrl=urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const parkingFromUrl = urlParams.get('parking');
        const furnishedFromUrl = urlParams.get('furnished');
        const offerFromUrl = urlParams.get('offer');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');
        if (
            searchTermFromUrl ||
            typeFromUrl ||
            parkingFromUrl ||
            furnishedFromUrl ||
            offerFromUrl ||
            sortFromUrl ||
            orderFromUrl
          ) {

            setSidebardata({
                searchTerm: searchTermFromUrl || '',
                type: typeFromUrl || 'all',
                parking: parkingFromUrl === 'true' ? true : false,
                furnished: furnishedFromUrl === 'true' ? true : false,
                offer: offerFromUrl === 'true' ? true : false,
                sort: sortFromUrl || 'created_at',
                order: orderFromUrl || 'desc',
              });

          }

          const fetchListings = async () => {
            setLoading(true);
            setShowMore(false);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/listing/get?${searchQuery}`);
            const data = await res.json();
            if (data.length > 8) {
              setShowMore(true);
            } else {
              setShowMore(false);
            }
            setListings(data);
            setLoading(false);
          };
      
          fetchListings();

          

    },[location.search])
    const handleChange=(e)=>{
        if (e.target.id === 'all' ||e.target.id === 'rent' ||e.target.id === 'sale'
          ) {
            setSidebardata({ ...sidebardata, type: e.target.id });
          }
      
          if (e.target.id === 'searchTerm') {
            setSidebardata({ ...sidebardata, searchTerm: e.target.value });
          }
          if (
            e.target.id === 'parking' ||e.target.id === 'furnished' ||e.target.id === 'offer'
          ) {
            setSidebardata({
              ...sidebardata,
              [e.target.id]:
                e.target.checked || e.target.checked === 'true' ? true : false,
            });
          }

          if (e.target.id === 'sort_order') {
            const sort = e.target.value.split('_')[0] || 'created_at';
      
            const order = e.target.value.split('_')[1] || 'desc';
      
            setSidebardata({ ...sidebardata, sort, order });
          }
      
    }
    

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sidebardata.searchTerm);
        urlParams.set('type', sidebardata.type);
        urlParams.set('parking', sidebardata.parking);
        urlParams.set('furnished', sidebardata.furnished);
        urlParams.set('offer', sidebardata.offer);
        urlParams.set('sort', sidebardata.sort);
        urlParams.set('order', sidebardata.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }

  return (
    <div className='flex gap-4 flex-col md:flex-row'>
        <div className="flex gap-4 p-7 border-b-2 md:border-r-2 md:min-h-screen">
            <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                <div className="flex items-center gap-4">
                    <label  className=' bg-teal-600 text-white p-2 rounded-md whitespace-nowrap'> Search Term : </label>
                    <input className='border-2 border-teal-700 rounded-lg p-3 w-full' type="text" value={sidebardata.searchTerm} onChange={handleChange} id="searchTerm"  placeholder='Search...'/>
                </div>
                <div className="flex gap-4 flex-wrap items-center">
                    <label className=' bg-teal-600 text-white p-2 rounded-md '> Type :</label>
                    <div className="flex gap-2">
                        <input onChange={handleChange} checked={sidebardata.type==='all'} className='  accent-teal-600 w-5' type="checkbox"  id="all" />
                        <span>Rent & Sale </span>
                    </div>

                    <div className="flex gap-2">
                        <input  onChange={handleChange} checked={sidebardata.type==='rent'} className='  accent-teal-600 w-5' type="checkbox"  id="rent" />
                        <span> Rent </span>
                    </div>

                    <div className="flex gap-2">
                        <input  onChange={handleChange} checked={sidebardata.type==='sale'} className='  accent-teal-600 w-5' type="checkbox"  id="sale" />
                        <span>Sale</span>
                    </div>

                    
                    <div className="flex gap-2">
                        <input onChange={handleChange} checked={sidebardata.offer}  className='  accent-teal-600 w-5' type="checkbox"  id="offer" />
                        <span>Offer</span>
                    </div>
                    

                   
                </div>

                <div className="flex gap-4 flex-wrap items-center">
                    <label className=' bg-teal-600 text-white p-2 rounded-md '> Ameneties :</label>
                  

                    <div className="flex gap-2">
                        <input  onChange={handleChange} checked={sidebardata.parking} className=' accent-teal-600 w-5' type="checkbox"  id="parking" />
                        <span> Parking </span>
                    </div>

                    <div className="flex gap-2">
                        <input onChange={handleChange} checked={sidebardata.furnished}  className='  accent-teal-600 w-5' type="checkbox"  id="furnished" />
                        <span>Furnished</span>
                    </div>

                    
                  
                    

                   
                </div>
                <div className="flex gap-4  items-center">
                    <label className=' bg-teal-600 text-white p-2 rounded-md '> Sort :</label>
                    <select  onChange={handleChange} defaultValue={'createdAt_desc'} id="sort_order" className='p-3 border-2 border-teal-700 rounded-lg'>
                        <option  value={'regularPrice_desc'}  className='capitalize '>
                            Price High to low
                        </option>
                        <option  value={'regularPrice_asc'} className='capitalize'>
                            Price Low to high
                        </option>
                        <option value={'createdAt_desc'} className='capitalize'>
                            Latest
                        </option>
                        <option  value={'createdAt_desc'} className='capitalize'>
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
