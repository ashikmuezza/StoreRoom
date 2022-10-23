import React, { useState } from 'react'
import './Navbar.css'
import {FiMenu} from 'react-icons/fi'
import { RiCloseLine } from 'react-icons/ri';

// BEM - BLOCK ELEMENT MODIFIER

const Navbar = () => {

  const [toggleMenu,setToggleMenu] = useState(false)  

  return (
    <div className='navbar'>
        <div className='navbar-links'>
            <div className='navbar-links-logo'>
                {/* <img  src={logo} alt = "logo"/> */}
              <p>Dashboard </p>  
            </div>
            <div className='navbar-links-container'>
                    {/* <p> <a href="#home">   Menu1 </a></p>
                    <p> <a href="#home">   Menu2 </a></p>
                    <p> <a href="#home">   Menu3 </a></p>
                    <p> <a href="#home">   Menu4 </a></p>
                    <p> <a href="#home">   Menu5 </a></p>
                    <p> <a href="#home">   Menu6 </a></p> */}
            </div>

            <div className='navbar-sign'>
                {/* <p>Sign in</p> */}
                {/* <button type="button"> Sign up  </button>  */}
            </div>

            <div className='navbar-menu'>
            {toggleMenu
                ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
                : <FiMenu color="#fff" size={27} onClick={() => setToggleMenu(true)} />
            }
            {toggleMenu && (
                <div className="navbar-menu-container scale-up-center">
                <div className="navbar-menu-container-links">
                    {/* <p> <a href="#home">   Menu1 </a></p>
                    <p> <a href="#home">   Menu2 </a></p>
                    <p> <a href="#home">   Menu3 </a></p>
                    <p> <a href="#home">   Menu4 </a></p>
                    <p> <a href="#home">   Menu5 </a></p>
                    <p> <a href="#home">   Menu6 </a></p> */}
                </div>
                <div className="navbar-menu-container-links-sign">
                     {/* <p>Sign in</p> */}
                    {/* <button type="button">Sign up</button> */}
                </div>
                </div>
                )
            }
            </div>
        </div>
    </div>
  )
}

export default Navbar
