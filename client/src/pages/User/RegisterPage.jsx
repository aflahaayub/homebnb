import {useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
export const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const registerUser = async(e)=>{
    e.preventDefault()
    try{
      console.log(name, email, password)
      await axios.post('/register',{
        name, email, password
      })
      alert('Registration is successful! Now you can log in.')
    }catch(e){
      alert('Registration failed. Please try again!')
    }
    
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32">
        <h1 className='text-4xl text-center mb-4'>Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input 
            type="text" 
            placeholder="Full Name"
            value={name}
            onChange={e=>setName(e.target.value)}
          />
          <input 
            type="email" 
            placeholder="your@email.com"
            value={email}
            onChange={e=>setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="password" 
            value={password}
            onChange={e=>setPassword(e.target.value)}
          />
          <button className="primary">Register</button>
          <div className="text-center py-2 text-gray-500">Already have an account? <Link to={'/login'} className="underline text-blue-400" >Login Now</Link>
          </div>
        </form>
      </div>
      
    </div>
  )
}
