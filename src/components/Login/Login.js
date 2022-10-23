import React from 'react'
import { useAccount } from 'wagmi'



export function Login() {

  const data = useAccount()
  console.log(data)
  
  return (
    data.isConnected && 
    <div className='Login-content'>
      <p>connected address is </p>
      <p>{data.address} </p>
    </div>
  )
}

export default Login
