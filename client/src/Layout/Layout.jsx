import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'
import {Container} from './Container'

export const Layout = () => {
  return (
    <div className="lg:py-4 lg:px-8 py-2 px-4 flex flex-col min-h-screen">
      <Header/> 
      <Container>
        <Outlet />
      </Container>
      
    </div>
  )
}
