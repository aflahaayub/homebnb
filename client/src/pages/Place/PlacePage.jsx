import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { BookingWidget } from '../../components/Booking/BookingWidget'
import { PlaceGallery } from '../../components/Place/PlaceGallery'
import { AddressLink } from '../../components/AddressLink'

export const PlacePage = () => {
  const {id} = useParams()
  const [place, setPlace] = useState(null)
  const [showAllPhotos, setShowAllPhotos] = useState(false)
  useEffect(()=>{
    if(!id){
      return ;
    }
    axios.get(`/places/${id}`).then(res=>{
      setPlace(res.data)
    })
  },[id])

  if(!place) return '';

  if(showAllPhotos){
    return(
      <div className="absolute inset-0 bg-black text-white min-h-screen">
        <div className="bg-black p-8 grid gap-4">
          <div>
            <h2 className="text-2xl mr-48">Photos of {place.title}</h2>
            <button onClick={()=> setShowAllPhotos(false)} className="text-sm right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl fixed shadow shadow-black bg-white text-black  ">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
              </svg>
              Close Photos
              </button>
          </div>
          {place?.photos?.length > 0 && place.photos.map(photo=>{
          return <div>
            <img src={"http://localhost:4000/uploads/" + photo} alt="" />
            </div>
          })}
        </div>
        
      </div>
    )
  }

  return (
    <div className="mt-4 bg-gray-100 -mx-5 px-8 py-8">
      <h1 className="text-2xl">{place.title}</h1>
      <AddressLink children={place.address} />
      {/* Photos */}
      <PlaceGallery place={place} />
      {/* Description */}
      <div className="mt-8 mb-8 gap-6 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-xl">Description</h2>
            {place.description}
          </div>
          Check-in: {place.checkIn}<br />
          Check-out: {place.checkOut}<br />
          Max number of guests: {place.maxGuests}
        </div>
        <div>
          <BookingWidget place={place}/>
        </div>
      </div>
      {/* Extra Info */}
      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div>
          <h2 className="font-semibold text-xl">Extra Info</h2>
        </div>
        <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">{place.extraInfo}</div>
        </div>
      
      
    </div>
  )
}
