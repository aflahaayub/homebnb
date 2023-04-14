import {useState, useEffect} from 'react'
import { useParams } from "react-router-dom"
import axios from 'axios'
import { AddressLink } from '../../components/AddressLink'
import { PlaceGallery } from '../../components/Place/PlaceGallery'
import { BookingDate } from '../../components/Booking/BookingDate'

export const BookingPage = () => {
  const {id} = useParams()
  const [booking, setBooking] = useState(null)
  useEffect(()=>{
    if(id){
      axios.get('/bookings').then(res=>{
      const foundBooking = res.data.find(({_id})=> _id === id)

      if(foundBooking){
          setBooking(foundBooking)
        }
    })

      
    }
  },[id])

  if(!booking){
    return ''
  }

  return (
    <div className="my-8">
      <h1 className="text-2xl">{booking.place.title}</h1>
      <AddressLink className="my-2 block"> {booking.place.address} </AddressLink>
      <div className="bg-gray-200 p-4 my-4 rounded-2xl items-center flex justify-between">
        <div>
          <h2 className="text-xl mb-4">Your booking information: </h2>
          <BookingDate booking={booking} />
        </div>
        <div className="bg-primary p-3 text-white rounded-2xl ">
          <div>Total Price</div>
          <div className="text-2xl">${booking.price}</div>
        </div>
      </div>
      <PlaceGallery place={booking.place}/>
    </div>
  )
}
