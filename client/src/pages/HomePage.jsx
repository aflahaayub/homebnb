import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { AccountNav } from "../Layout/AccountNav"

export const Home = () => {
  const [places, setPlaces] = useState([])
  useEffect(()=>{
    axios.get('/places').then(res=>{
      setPlaces([...res.data, ...res.data])
    })
  }, [])
  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 gap-grow grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length>0 && places.map(place=>{
       return <Link className="cursor-pointer" to={'/place/' + place._id}>
          <div className="mb-2 bg-gray-500 rounded-2xl flex">
            {place.photos?.[0] &&(
            <img className="rounded-2xl object-cover aspect-square" src={ 'http://localhost:4000/uploads/'+ place.photos?.[0]} />
          )}
          </div>
          <h3 className="font-bold">{place.address}</h3>
          <h2 className="text-gray-500 text-sm ">{place.title}</h2>
          <div className="mt-2">
            <span className="font-bold">${place.price}</span> / night
          </div>
        </Link>
      })}
    </div>
  )
}