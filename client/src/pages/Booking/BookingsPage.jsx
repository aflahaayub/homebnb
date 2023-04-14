import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { differenceInCalendarDays } from 'date-fns'
import { AccountNav } from '../../Layout/AccountNav'
import { PlaceImg } from '../../components/Place/PlaceImg'
import { BookingDate } from '../../components/Booking/BookingDate'

export const BookingsPage = () => {
  const [bookings, setBookings]= useState([])
  useEffect(()=>{
    axios.get('/bookings').then(res=>{
      setBookings(res.data)
    })
  }, [])
  return (
    <div>
      <AccountNav />
      <div>
        {bookings?.length === 0 &&(
          <div className="text-center font-bold text-2xl p-4 mt-9"> You haven't booked anything yet!</div>
        )}
        {bookings?.length > 0 && bookings.map(booking=>{
          return <Link to = {`/account/bookings/${booking._id}`} key={booking._id} className="flex bg-gray-200 rounded-2xl overflow-hidden">
            <div className="w-48">
              <PlaceImg place={booking.place} />
            </div>
            <div className="p-3 pr-2 grow">
              <h2 className="text-xl">{booking.place.title}</h2>
            
              <BookingDate booking={booking } />
              <div>
                <div className="flex gap-2 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                  </svg>
                  {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} Nights | Total Price: ${booking.price}
              </div>
              
              </div>
            </div>
          </Link>
        })}
      </div>
    </div>
  )
}
