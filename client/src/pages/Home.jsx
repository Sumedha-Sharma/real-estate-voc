import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

export default function Home() {

  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(offerListings);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div>

      {/*top*/}


    <div className=' flex flex-col gap-6 py-28 px-3 max-w-6xl mx-auto '>
      <h1 className=' capitalize text-teal-900 font-bold text-3xl lg:text-6xl '>
      Uncover your next <span className='text-teal-600'>perfect</span>
      <br/> haven with effortless exploration
      </h1>
      <div className=' text-gray-400 text-xs sm:text-sm'>
      NexVita provides seamless browsing, linking you to personalized real estate options.
      <br/>
      Explore a curated selection of properties and find your ideal home or investment opportunity with ease.
      </div>
      <Link className='text-xs sm:text-sm text-teal-500 hover:text-teal-700 font-bold' to={"/search"}>
        Start Here....
      </Link>
    </div>


      {/* swiper*/}

      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px]'
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>



      {/* listing for rent , offer , sale*/}

    <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10 ">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-4">
                <h2 className='capitalize text-3xl font-semibold text-teal-800'>Recent Offers</h2>
                <Link  className='capitalize text-sm text-teal-600  hover:text-teal-900' to={'/search?offer=true'}>
                  Show more offers
                </Link>
            </div>
            <div className=" flex flex-wrap gap-4">
            {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

{rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-4">
                <h2 className='capitalize text-3xl font-semibold text-teal-800'> Recent Places For Rent</h2>
                <Link  className='capitalize text-sm text-teal-600  hover:text-teal-900' to={'/search?type=rent'}>
                  Show more places for rent
                </Link>
            </div>
            <div className=" flex flex-wrap gap-4">
            {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        
       {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-4">
                <h2 className='capitalize text-3xl font-semibold text-teal-800'> Recent Places For sale</h2>
                <Link  className='capitalize text-sm text-teal-600  hover:text-teal-900' to={'/search?type=sale'}>
                  Show more places for sale
                </Link>
            </div>
            <div className=" flex flex-wrap gap-4">
            {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
    </div>
    </div>
  )
}
