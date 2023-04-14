import {useState, useContext, useEffect} from 'react'
import {differenceInCalendarDays} from 'date-fns'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../../Context/UserContext'

export const BookingWidget = ({place}) => {
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [numberOfGuests, setNumberOfGuests] = useState(1)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [redirect, setRedirect] = useState('')
  const {user} = useContext(UserContext)

  useEffect(()=>{
    if(user){
      setName(user.name)
    }
  },[user])
  let numberOfNights = 0
  if(checkIn && checkOut){
    numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
  }

  const bookThisPlace = async() =>{
    const data = {
      checkIn, checkOut, numberOfGuests, name, phone, 
      place: place._id, 
      price: numberOfNights*place.price
    }
    const res = await axios.post('/bookings', data)
    const bookingId = res.data._id
    setRedirect(`/account/bookings/${bookingId}`)

  }

  if(redirect){
    return <Navigate to={redirect} />
  }


  return (
    <div className=" bg-white shadow p-4 pl-2  rounded-2xl">
      <div className="text-xl text-center">
        Price: ${place.price} / night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex justify-around">
          <div className="py-3 px-4 text-sm">
            <label >Check In:</label>
            <input
             type="date" 
             value={checkIn} 
             onChange={e=>setCheckIn(e.target.value)} />
          </div>
          <div className="py-3 px-4 border-l text-sm">
            <label >Check Out:</label>
            <input
             type="date"
             value={checkOut} 
             onChange={e=>setCheckOut(e.target.value)}
              />
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label >Number of guests:</label>
          <input
            type="number" 
            value={numberOfGuests} 
            onChange={e=>setNumberOfGuests(e.target.value)}
            />
        </div>
          {numberOfNights > 0 && (
            <div className="py-3 px-4 border-t">
              <label>Your Full Name:</label>
              <input
                type="text" 
                placeholder='Abra Cadabra'
                value={name} 
                onChange={e=>setName(e.target.value)}
                />
              <label>Phone Number:</label>
              <input
                type="tel" 
                placeholder='+62812345789'
                value={phone} 
                onChange={e=>setPhone(e.target.value)}
                />
          </div>
          )}
      </div>
      <button onClick={bookThisPlace} className="primary mt-4">
        Book this place
        {numberOfNights > 0 && (
          <span> for ${numberOfNights * place.price}</span>
        )}
      </button>
    </div>
  )
}
