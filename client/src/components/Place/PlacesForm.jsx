import { useState, useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Perks } from '../Perks'
import { PhotosUploader } from '../PhotosUploader/PhotosUploader'
import { AccountNav } from '../../Layout/AccountNav'
import axios from 'axios'

export const PlacesForm = () => {
  const {id} = useParams()

  const [title, setTitle] = useState('')
  const [address, setAddress] = useState('')
  const [addedPhotos, setAddedPhotos] = useState([])
  const [description, setDescription] =useState('')
  const [perks, setPerks] =useState([])
  const [extraInfo, setExtraInfo] =useState('')
  const [checkIn, setCheckIn] =useState('')
  const [checkOut, setCheckOut] =useState('')
  const [maxGuests, setMaxGuests] =useState(1)
  const [price, setPrice] = useState(100)
  const [redirect, setRedirect] = useState(null)

  useEffect(()=>{
    if(!id){
      return
    }
    axios.get('/places/' + id).then(res=>{
      const {data} = res
      setTitle(data.title)
      setAddress(data.address)
      setAddedPhotos(data.photos)
      setDescription(data.description)
      setPerks(data.perks)
      setExtraInfo(data.extraInfo)
      setCheckIn(data.checkIn)
      setCheckOut(data.checkOut)
      setMaxGuests(data.maxGuests)
      setPrice(data.price)
    })
  }, [id])

  const inputHeading = (text)=>{
    return <h2 className="text-2xl mt-4">{text}</h2>
  }

  const inputDescription = (text)=>{
    return <p className="text-gray-500 text-sm">{text}</p>
  }

  const preInput = (header, desc)=>{
    return <>
      {inputHeading(header)}
      {inputDescription(desc)}
      
    </>
  }

  const savePlace = async(e)=>{
    e.preventDefault()
    const placeData = {title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price}

    if(id){
      //update
      await axios.put('/places', {id, ...placeData})
    }else{
      //new place
      await axios.post('/places', placeData)
    }
    
    setRedirect(true)
  }

  if(redirect){
    return <Navigate to={'/account/places'} />
  }

  return (
    <>
      <AccountNav />
      <form onSubmit={savePlace}>
      {preInput('Title', 'Title for your accomodation. Should be short and catchy!' )}
      <input 
        type="text" 
        value={title} 
        onChange={e=> setTitle(e.target.value)} placeholder="Title Accomodation" />
      {preInput('Address', 'Your Accomodation Address.')}

      <input 
        type="text" 
        value={address} 
        onChange={e=> setAddress(e.target.value)}placeholder="Address" />
      {preInput('Photos', 'Share the best look of your lovely accomodation!')}

      <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

      {preInput('Description', 'Description of the accomodation.')}
      <textarea
       value={description} 
       onChange={ e=> setDescription(e.target.value)}/>
      
      {preInput('Perks', 'Select all the perks of the accomodation.')}
      <Perks selected={perks} onChange={setPerks} />

      {preInput('Extra Info', 'State your house rules!')}
      <textarea 
        value={extraInfo} 
        onChange={e=> setExtraInfo(e.target.value)}/>

      {preInput('Check In/Out Times, Max Guests', 'Add check in and out times, remember to have some time to clear the room!')}
      <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <h3 className="mt-2 -mb-1 ">Check In Time</h3>
          <input 
            type="text" 
            value={checkIn} 
            onChange={e=> setCheckIn(e.target.value)} 
            placeholder="10"/>
        </div>
        <div>
          <h3 className="mt-2 -mb-1 ">Check Out Time</h3>
          <input 
            type="text"
            value={checkOut}
            onChange={e=> setCheckOut(e.target.value)}
            placeholder="12"
          />
        </div>
        <div>
        <h3 className="mt-2 -mb-1 ">Max Number of Guests</h3>
          <input 
            type="number"
            value={maxGuests}
            onChange={e=>setMaxGuests(e.target.value)}/>
        </div>
        <div>
        <h3 className="mt-2 -mb-1 ">Price Per Night</h3>
          <input 
            type="number"
            value={price}
            onChange={e=>setPrice(e.target.value)}/>
        </div>
      </div>
    
    <div>
      <button className="primary my-4">Save</button>
    </div>
      </form>
    </>
  )
}
