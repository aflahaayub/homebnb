import { Outlet } from 'react-router-dom'

export const Container = ({children}) => {
  return (
    <div className="py-4 px-8">
      {children}
    </div>
  )
}
