import React from 'react'
import './Header.css'
import {useAccount,useContract } from 'wagmi'
//import ai from '../../assets/ai.png'
import { Brand, Login, RainbowKit } from '../../components'


const Header = () => {

  //const account = useContract()

  return (
 
    <div className='header' id="home">
      <div className='header-content'>
        <h1 className='gradient__text' > We make it easy for you to plug into web3 </h1>
        <p> Just with one tap of your finger to connect to your wallet</p>
        {/*<div className='button-container'>
           <button>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Connect
          </button>
        </div> */}
          <div className='header-wallet'>
            <RainbowKit/>
          </div>  
          <Login/>
      </div>
      <div className='header-image'>
          <Brand/>
      </div>
     
    </div>

  )
}

export default Header
