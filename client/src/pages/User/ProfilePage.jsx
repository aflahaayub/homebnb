import {useContext, useState} from 'react'
import axios from 'axios'
import { UserContext } from '../../Context/UserContext'
import { Navigate, Link, useParams} from 'react-router-dom'
import { PlacesPage } from '../Place/PlacesPage'
import { AccountNav } from '../../Layout/AccountNav'

export const ProfilePage = () => {
  const [redirect, setRedirect] = useState(null)
  const {ready, user, setUser} = useContext(UserContext)
  let {subpage} = useParams()

  if(subpage === undefined){
    subpage = 'profile'
  }

  if(!ready){
    return 'Loading...'
  }

  if(ready && !user && !redirect){
    return <Navigate to={'/login'} />
  }
  
  const logout = async()=>{
    await axios.post('/logout')
    setRedirect('/')
    setUser(null)
  }

  if(redirect){
    return <Navigate to={redirect} />
  }

  return (
    <div>
      <AccountNav />
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto"> 
          Logged in as {user.name} ({user.email}) <br/>
          <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
        </div>
      )}
      {subpage === 'places' && (
        <PlacesPage />
      )}
    </div>
  )
}