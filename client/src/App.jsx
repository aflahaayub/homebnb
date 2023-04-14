import { Route, Routes } from 'react-router-dom'
import { UserContextProvider } from './Context/UserContext'
import { Layout } from './Layout/Layout'
import {Container} from './Layout/Container'

import {Home} from './pages/HomePage'
import { Login } from './pages/User/LoginPage'
import { RegisterPage } from './pages/User/RegisterPage'
import {ProfilePage}  from './pages/User/ProfilePage'
import { PlacesPage } from './pages/Place/PlacesPage'
import { PlacesForm } from './components/Place/PlacesForm'

import { PlacePage } from './pages/Place/PlacePage'
import { BookingsPage } from './pages/Booking/BookingsPage'
import { BookingPage } from './pages/Booking/BookingPage'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true

function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout/>} >
          <Route index element={<Home/>}/>
          <Route path="/login" element={<Login />}/>
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/account' element={<ProfilePage />} />
          <Route path='/account/places' element={<PlacesPage />} />
          <Route path='/account/places/new' element={<PlacesForm />} />
          <Route path='/account/places/:id' element={<PlacesForm />} />
          <Route path='/place/:id' element={<PlacePage />} />
          <Route path='/account/bookings' element={<BookingsPage />} />
          <Route path='/account/bookings/:id' element={<BookingPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
