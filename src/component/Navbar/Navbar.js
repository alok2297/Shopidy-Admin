import React from 'react'
import "./Navbar.css";
import navlogo from "../../Asset/nav-logo.svg";
import navProfile from "../../Asset/nav-profile.svg";
const Navbar = () => {
  return (
    <div  className='navbar'>
      <img src={navlogo} className='nav-logo' alt=''/>
      <img src={navProfile} className='nav-profile' alt=''/>
    </div>
  )
}

export default Navbar
