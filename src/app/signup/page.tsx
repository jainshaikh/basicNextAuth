'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const Signup = () => {
  const router = useRouter()
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  })

  const [buttonDisable, setButtonDisable] = useState(false);

  const [loading, setLoading] = useState(false);

  const onSignUp = async () =>{
    try {
      setLoading(true);
      const responce = await axios.post("/api/users/signup", user)
      console.log("Signup Success", responce.data);
      router.push("/login");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Signup Field")
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
      setButtonDisable(false);
    } else{
      setButtonDisable(true);
    }
  }, [user])

  return (
    <div className='flex flex-col item-center justify-center min-h-screen py-2'>
      <h1>{loading ? "Processing" : "Signup"}</h1>
      <hr />
      <label htmlFor='username'>Username</label>
      
      <input
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
      id='username'
      value={user.username}
      onChange={(e) => setUser({...user, username: e.target.value})}
      placeholder='username'
      type='text' />

<label htmlFor='email'>Email</label>
<input
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
      id='email'
      value={user.email}
      onChange={(e) => setUser({...user, email: e.target.value})}
      placeholder='email'
      type='text' />

<label htmlFor='password'>Password</label>
<input
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
      id='password'
      value={user.password}
      onChange={(e) => setUser({...user, password: e.target.value})}
      placeholder='password'
      type='text' />

      <button
      onClick={onSignUp}
      className='p-2 border border-gray-300 rounded-lg mb-4, focus:outline-none focus:border-gray-600'>
        {buttonDisable ? "all fields required" : "Signup"}
      </button>
      <Link href={'/login'}>Visit Login Page</Link>
    </div>
  )
}

export default Signup